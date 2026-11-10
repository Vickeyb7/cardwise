import json
from typing import Dict, Any, Optional
from groq import Groq
from .config import GROQ_API_KEY, GROQ_MODEL

def get_groq_client() -> Optional[Groq]:
    if not GROQ_API_KEY:
        return None
    return Groq(api_key=GROQ_API_KEY)

EXTRACTION_SYSTEM_PROMPT = """You are CardWise AI Rule Extractor, an expert in Indian credit card policies.
Extract structured reward rules, monthly caps, spend exclusions, and points-to-rupee valuation from the provided bank document text.
You MUST output ONLY valid JSON following this schema:
{
  "cardName": "string",
  "bankName": "string",
  "effectiveDate": "YYYY-MM-DD or string",
  "rewardRules": [
    {
      "ruleType": "base | accelerated | merchant | exclusion",
      "category": "string",
      "channel": "online | offline | any",
      "earnRate": "string",
      "sourceQuote": "exact quote from text"
    }
  ],
  "monthlyCaps": [
    {
      "scope": "card | category | partner",
      "maxPointsOrCashback": "string",
      "sourceQuote": "exact quote from text"
    }
  ],
  "exclusions": [
    "Fuel spends",
    "Rent payments",
    "Wallet reloads"
  ],
  "redemptionRate": "string (e.g. 1 RP = ₹1.00 for flights)",
  "devaluationDetected": false,
  "confidence": 0.95,
  "summary": "Brief 1-sentence explanation of policy"
}
"""

def extract_rules_from_text(text: str, bank_hint: Optional[str] = None) -> Dict[str, Any]:
    """
    Calls Groq (llama-3.3-70b-versatile) with temperature 0 to extract structured rules.
    """
    client = get_groq_client()
    if not client:
        return {
            "error": "GROQ_API_KEY not configured in environment.",
            "cardName": "Offline Fallback",
            "confidence": 0.0,
            "rewardRules": [],
            "exclusions": ["Fuel", "Rent", "Wallet"],
            "devaluationDetected": False,
            "summary": "Offline parser: please set GROQ_API_KEY."
        }

    user_prompt = f"Bank Issuer Hint: {bank_hint or 'Unknown'}\n\nDOCUMENT PASSAGE:\n{text}\n\nExtract structured JSON."

    try:
        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": EXTRACTION_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.0
        )
        content = response.choices[0].message.content or "{}"
        return json.loads(content)
    except Exception as e:
        return {
            "error": str(e),
            "confidence": 0.0,
            "summary": f"Extraction failed: {str(e)}"
        }

def generate_grounded_explanation(
    winning_card: str,
    spend_amount: float,
    merchant: str,
    calculated_benefit: float,
    retrieved_citations: list,
    all_card_results: list
) -> str:
    """
    Generates an explanation of the winning recommendation strictly grounded
    in the deterministic calculation output and retrieved citations.
    """
    client = get_groq_client()
    if not client:
        return (
            f"CardWise Recommendation: {winning_card} earns ₹{calculated_benefit:,.2f} on your ₹{spend_amount:,.2f} "
            f"purchase at {merchant}. Verification based on official bank rules."
        )

    prompt = (
        f"CALCULATED DETERMINISTIC RESULTS:\n"
        f"Winning Card: {winning_card}\n"
        f"Purchase: ₹{spend_amount:,.2f} at {merchant}\n"
        f"Net Rupee Benefit: ₹{calculated_benefit:,.2f}\n"
        f"Other Cards Evaluated: {json.dumps(all_card_results)}\n\n"
        f"VERIFIED SOURCE CITATIONS:\n"
        f"{json.dumps(retrieved_citations, indent=2)}\n\n"
        f"Explain why {winning_card} is the winning choice. Trust the numbers above. "
        f"Do not invent any rates not present in the payload. Cite the rules using [Source X]."
    )

    try:
        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are CardWise AI financial assistant. Provide concise, transparent explanations in Indian Rupees (₹). "
                        "Never hallucinate numbers that contradict the provided deterministic payload."
                    )
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.1
        )
        return response.choices[0].message.content or ""
    except Exception as e:
        return f"Explanation fallback: {winning_card} yields ₹{calculated_benefit:,.2f} for this purchase."
