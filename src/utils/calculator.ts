import {
  CreditCard,
  RecommendationRequest,
  CardCalculationDetail,
  RecommendationResponse,
} from '../types.ts';
import { INDIAN_CREDIT_CARDS } from '../data/cardsData.ts';

/**
 * Deterministic Credit Card Reward Calculator
 * Implements Layer 5 of the CardWise architecture:
 * Evaluates base and accelerated rates, exclusions, monthly caps,
 * point-to-INR conversions, and produces an auditable breakdown.
 */
export function calculateCardBenefit(
  card: CreditCard,
  query: RecommendationRequest,
  isOwned: boolean,
  alreadyUsedMonthlyCapInr: number = 0
): CardCalculationDetail {
  const { amount, merchantName, category, transactionType } = query;
  const merchantLower = (merchantName || '').toLowerCase().trim();
  const steps: string[] = [];

  // Check 1: Exclusions
  const matchingExclusion = card.exclusions.find((ex) => ex.category === category);
  if (matchingExclusion) {
    steps.push(`Exclusion applied: ${matchingExclusion.reason}`);
    return {
      card,
      isOwned,
      rank: 999,
      isOptimal: false,
      nominalRewardPointsEarned: 0,
      nominalCashbackEarned: 0,
      netBenefitInr: 0,
      effectiveReturnPercent: 0,
      applicableRuleDescription: `Excluded: ${matchingExclusion.reason}`,
      isAccelerated: false,
      capHit: false,
      exclusionApplies: true,
      exclusionReason: matchingExclusion.reason,
      pointToInrConversionRate: card.pointValueInInr,
      calculationSteps: steps,
      whyLessBeneficialReason: `Transaction category (${category}) is excluded under official ${card.bankName} terms.`,
      sourceDocCitation: card.sourceDoc.title,
    };
  }

  // Check 2: Accelerated Rules
  let acceleratedMatch = card.acceleratedRules.find((rule) => {
    // Check transaction type if specified
    if (rule.transactionType && rule.transactionType !== transactionType) {
      return false;
    }

    // Check merchant exact/substring match
    if (merchantLower && rule.merchants && rule.merchants.length > 0) {
      const hasMerchant = rule.merchants.some(
        (m) => merchantLower.includes(m) || m.includes(merchantLower)
      );
      if (hasMerchant) return true;
    }

    // Check category match
    if (rule.categories && rule.categories.includes(category)) {
      return true;
    }

    return false;
  });

  let nominalPoints = 0;
  let nominalCashback = 0;
  let calculatedGrossInr = 0;
  let ruleDesc = '';
  let isAccelerated = false;

  if (acceleratedMatch) {
    isAccelerated = true;
    ruleDesc = acceleratedMatch.description;

    if (acceleratedMatch.rateType === 'cashback_percent') {
      const percent = acceleratedMatch.multiplierOrRate;
      nominalCashback = (amount * percent) / 100;
      calculatedGrossInr = nominalCashback;
      steps.push(`Applied accelerated ${percent}% cashback on ₹${amount.toLocaleString('en-IN')}: ₹${nominalCashback.toFixed(2)}.`);
    } else if (acceleratedMatch.rateType === 'points_per_amount' && acceleratedMatch.pointsPerAmount) {
      const { points, amount: unitAmount } = acceleratedMatch.pointsPerAmount;
      const units = Math.floor(amount / unitAmount);
      nominalPoints = units * points;
      calculatedGrossInr = nominalPoints * card.pointValueInInr;
      steps.push(
        `Applied accelerated ${points} ${card.pointCurrencyName} per ₹${unitAmount}. ` +
        `(${units} units × ${points} = ${nominalPoints} points). Valued at ₹${card.pointValueInInr}/point = ₹${calculatedGrossInr.toFixed(2)}.`
      );
    } else if (acceleratedMatch.rateType === 'point_multiplier') {
      // Base points multiplied by multiplier
      const basePointsUnit = card.baseRewardCalculation.pointsPerAmount?.points || 0;
      const baseAmountUnit = card.baseRewardCalculation.pointsPerAmount?.amount || 100;
      const units = Math.floor(amount / baseAmountUnit);
      nominalPoints = units * basePointsUnit * acceleratedMatch.multiplierOrRate;
      calculatedGrossInr = nominalPoints * card.pointValueInInr;
      steps.push(
        `Applied ${acceleratedMatch.multiplierOrRate}X multiplier on base rate (${basePointsUnit} points per ₹${baseAmountUnit}). ` +
        `Earned ${nominalPoints} ${card.pointCurrencyName}. Valued at ₹${card.pointValueInInr}/point = ₹${calculatedGrossInr.toFixed(2)}.`
      );
    }
  } else {
    // Check 3: Base Reward Rate
    if (card.baseRewardCalculation.cashbackPercent) {
      const pct = card.baseRewardCalculation.cashbackPercent;
      nominalCashback = (amount * pct) / 100;
      calculatedGrossInr = nominalCashback;
      ruleDesc = `Base ${pct}% cashback on eligible transactions`;
      steps.push(`Applied base cashback rate of ${pct}% on ₹${amount.toLocaleString('en-IN')} = ₹${nominalCashback.toFixed(2)}.`);
    } else if (card.baseRewardCalculation.pointsPerAmount) {
      const { points, amount: unitAmount } = card.baseRewardCalculation.pointsPerAmount;
      const units = Math.floor(amount / unitAmount);
      nominalPoints = units * points;
      calculatedGrossInr = nominalPoints * card.pointValueInInr;
      ruleDesc = `Base ${points} points per ₹${unitAmount} spent`;
      steps.push(
        `Applied base reward rate: ${points} points per ₹${unitAmount}. ` +
        `(${units} units = ${nominalPoints} ${card.pointCurrencyName} at ₹${card.pointValueInInr}/pt = ₹${calculatedGrossInr.toFixed(2)}).`
      );
    }
  }

  // Check 4: Monthly Cap
  let capHit = false;
  let finalNetBenefit = calculatedGrossInr;
  let capRemainingInr: number | undefined = undefined;

  const activeCap = acceleratedMatch?.capPerMonth || card.monthlyCapInr;
  if (activeCap !== undefined) {
    const remainingCap = Math.max(0, activeCap - alreadyUsedMonthlyCapInr);
    capRemainingInr = remainingCap;

    if (calculatedGrossInr > remainingCap) {
      capHit = true;
      finalNetBenefit = remainingCap;
      steps.push(
        `Monthly benefit cap reached! Calculated ₹${calculatedGrossInr.toFixed(2)}, capped at remaining available limit: ₹${remainingCap.toFixed(2)} (Monthly Cap: ₹${activeCap.toLocaleString('en-IN')}).`
      );
    } else {
      steps.push(`Within monthly cap (Limit: ₹${activeCap.toLocaleString('en-IN')}, Remaining: ₹${(remainingCap - calculatedGrossInr).toFixed(2)}).`);
    }
  }

  const effectiveReturnPercent = amount > 0 ? (finalNetBenefit / amount) * 100 : 0;

  return {
    card,
    isOwned,
    rank: 0,
    isOptimal: false,
    nominalRewardPointsEarned: Math.round(nominalPoints),
    nominalCashbackEarned: Math.round(nominalCashback * 100) / 100,
    netBenefitInr: Math.round(finalNetBenefit * 100) / 100,
    effectiveReturnPercent: Math.round(effectiveReturnPercent * 100) / 100,
    applicableRuleDescription: ruleDesc,
    isAccelerated,
    capHit,
    capRemainingInr,
    exclusionApplies: false,
    pointToInrConversionRate: card.pointValueInInr,
    calculationSteps: steps,
    sourceDocCitation: card.sourceDoc.title,
  };
}

/**
 * Runs the full ranking comparison across owned and catalog cards
 */
export function evaluateCardsForPurchase(
  query: RecommendationRequest,
  ownedCardIds: string[],
  capsUsedMap: Record<string, number> = {}
): RecommendationResponse {
  // Only evaluate cards the user actually owns; do not inject random cards
  const allEvaluations: CardCalculationDetail[] = INDIAN_CREDIT_CARDS.map((card) => {
    const isOwned = ownedCardIds.includes(card.id);
    const capUsed = capsUsedMap[card.id] || 0;
    return calculateCardBenefit(card, query, isOwned, capUsed);
  });

  // Split into owned vs unowned
  const ownedEvaluations = allEvaluations.filter((c) => c.isOwned);
  const unownedEvaluations = allEvaluations.filter((c) => !c.isOwned);

  // Sort owned evaluations by netBenefitInr descending, then effectiveReturnPercent
  ownedEvaluations.sort((a, b) => {
    if (b.netBenefitInr !== a.netBenefitInr) {
      return b.netBenefitInr - a.netBenefitInr;
    }
    return b.effectiveReturnPercent - a.effectiveReturnPercent;
  });

  // Assign ranks for owned cards
  ownedEvaluations.forEach((item, index) => {
    item.rank = index + 1;
    item.isOptimal = index === 0;
  });

  // Sort unowned evaluations as well for opportunity insights
  unownedEvaluations.sort((a, b) => {
    if (b.netBenefitInr !== a.netBenefitInr) {
      return b.netBenefitInr - a.netBenefitInr;
    }
    return b.effectiveReturnPercent - a.effectiveReturnPercent;
  });
  unownedEvaluations.forEach((item, idx) => {
    item.rank = idx + 1;
    item.isOptimal = idx === 0;
  });

  const winner = ownedEvaluations[0] || null;

  // Generate comparative rationale ("Why other cards were less beneficial") if winner exists
  if (winner) {
    ownedEvaluations.forEach((item) => {
      if (!item.isOptimal) {
        const diff = winner.netBenefitInr - item.netBenefitInr;
        if (item.exclusionApplies) {
          item.whyLessBeneficialReason = `Yields ₹0 due to bank category exclusion (${item.exclusionReason}).`;
        } else if (item.capHit) {
          item.whyLessBeneficialReason = `Exhausted monthly accelerated reward cap; yields ₹${diff.toFixed(2)} less than ${winner.card.name}.`;
        } else if (winner.isAccelerated && !item.isAccelerated) {
          item.whyLessBeneficialReason = `Does not have a partner promotion on this merchant/category, earning only base rate (₹${diff.toFixed(2)} lower yield).`;
        } else {
          item.whyLessBeneficialReason = `Lower effective return rate (${item.effectiveReturnPercent}% vs ${winner.effectiveReturnPercent}% on ${winner.card.name}), yielding ₹${diff.toFixed(2)} less.`;
        }
      }
    });
  }

  let summaryNote = winner
    ? `Recommended card: ${winner.card.name} yielding ₹${winner.netBenefitInr.toLocaleString('en-IN')} (${winner.effectiveReturnPercent}% net return).`
    : `No credit cards added to your vault yet. Add your cards in My Vault to see personalized recommendations.`;

  if (winner && winner.isAccelerated) {
    summaryNote += ` Benefited from accelerated partner rate: "${winner.applicableRuleDescription}".`;
  }

  return {
    query,
    timestamp: new Date().toISOString(),
    recommendedCard: winner,
    rankedCards: ownedEvaluations,
    unownedOpportunities: unownedEvaluations,
    summaryNote,
  };
}
