import { OFFICIAL_POLICY_DOCUMENTS } from '../data/policyDocumentsData.ts';

export interface PolicyChunk {
  id: string;
  documentId: string;
  bankId: string;
  cardName: string;
  sectionTitle: string;
  docType: 'terms_and_conditions' | 'reward_catalog' | 'exclusion_matrix' | 'milestone_schedule';
  text: string;
  tokenCount: number;
  keyTopics: string[];
  sourceUrl: string;
  effectiveDate: string;
  lastVerifiedDate: string;
  verificationStatus: 'VERIFIED' | 'NEEDS_REVIEW';
  recentDevaluationOrChange?: string;
}

export interface RAGRetrievalResult {
  chunk: PolicyChunk;
  score: number;
  denseScore: number;
  sparseScore: number;
  denseRank: number;
  sparseRank: number;
  matchedKeywords: string[];
}

export interface RAGAnswerResponse {
  answer: string;
  citations: Array<{
    chunkId: string;
    cardName: string;
    sectionTitle: string;
    sourceUrl: string;
    effectiveDate: string;
    relevanceScore: number;
    quoteExcerpt: string;
  }>;
  retrievedChunks: RAGRetrievalResult[];
  queryTimeMs: number;
  fusionStrategy: string;
}

// Pre-chunked, verified knowledge base partitions
export const POLICY_CHUNKS: PolicyChunk[] = [
  // --- HDFC Infinia Metal Edition ---
  {
    id: 'chunk_hdfc_infinia_base',
    documentId: 'doc_hdfc_infinia_2026',
    bankId: 'hdfc',
    cardName: 'HDFC Infinia Metal Edition',
    sectionTitle: 'Base Reward Program & Point Valuation',
    docType: 'terms_and_conditions',
    text: 'HDFC Infinia cardholders earn a base reward of 5 Reward Points for every ₹150 spent on all retail transactions. 1 Reward Point has a guaranteed monetary valuation of ₹1.00 when redeemed for flight bookings and hotel reservations via HDFC SmartBuy portal, yielding an industry-benchmark 3.33% base return.',
    tokenCount: 62,
    keyTopics: ['base rate', 'point value', 'smartbuy', 'valuation', 'flight', 'hotel', 'infinia'],
    sourceUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card',
    effectiveDate: '2026-09-01',
    lastVerifiedDate: '2026-11-05',
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'chunk_hdfc_infinia_accelerated',
    documentId: 'doc_hdfc_infinia_2026',
    bankId: 'hdfc',
    cardName: 'HDFC Infinia Metal Edition',
    sectionTitle: 'SmartBuy Accelerated Rewards (5X / 10X)',
    docType: 'reward_catalog',
    text: 'Accelerated earn multipliers on SmartBuy: 5X Reward Points on Flight bookings (net 16.6% return), 10X Reward Points on Hotel bookings (net 33.3% return), 5X on Apple Imagine product portal, and 3X on Instant Vouchers (Amazon, Flipkart, Swiggy, Zomato vouchers). Maximum accelerated reward points capped at 10,000 points per calendar month across all SmartBuy partners.',
    tokenCount: 78,
    keyTopics: ['accelerated', 'smartbuy', '5x flights', '10x hotels', 'apple', 'vouchers', 'cap'],
    sourceUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card',
    effectiveDate: '2026-09-01',
    lastVerifiedDate: '2026-11-05',
    verificationStatus: 'VERIFIED',
    recentDevaluationOrChange: 'Calendar monthly cap of 10,000 points strictly enforced.',
  },
  {
    id: 'chunk_hdfc_infinia_exclusions',
    documentId: 'doc_hdfc_infinia_2026',
    bankId: 'hdfc',
    cardName: 'HDFC Infinia Metal Edition',
    sectionTitle: 'Exclusions & Utility Sub-Limits',
    docType: 'exclusion_matrix',
    text: 'Reward point accrual exclusions: Fuel transactions, wallet load/cash reload transactions, and rental payments made through third-party platforms (CRED, Cheq, Paytm) are strictly excluded and earn 0 Reward Points. Utility bill payments earn base points but are strictly capped at a maximum of 2,000 Reward Points per calendar month.',
    tokenCount: 68,
    keyTopics: ['exclusions', 'fuel', 'wallet', 'rent', 'utility cap', 'cred', 'zero points'],
    sourceUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card',
    effectiveDate: '2026-09-01',
    lastVerifiedDate: '2026-11-05',
    verificationStatus: 'VERIFIED',
  },

  // --- SBI Cashback Card ---
  {
    id: 'chunk_sbi_cashback_online',
    documentId: 'doc_sbi_cashback_2026',
    bankId: 'sbi',
    cardName: 'SBI Cashback Card',
    sectionTitle: '5% Direct Statement Cashback on Online Spends',
    docType: 'reward_catalog',
    text: 'SBI Cashback Card earns a flat 5% cashback on all online retail transactions across virtually all merchant portals (Amazon, Flipkart, Myntra, Swiggy, Zomato, Uber, Cleartrip, MakeMyTrip). Cashback is not given as loyalty points; it is automatically credited directly to the card statement balance within 2 working days of monthly statement generation.',
    tokenCount: 72,
    keyTopics: ['5% cashback', 'online', 'statement credit', 'amazon', 'flipkart', 'swiggy', 'cleartrip'],
    sourceUrl: 'https://www.sbicard.com/en/personal/credit-cards/rewards/cashback-sbi-card.page',
    effectiveDate: '2026-07-01',
    lastVerifiedDate: '2026-11-06',
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'chunk_sbi_cashback_caps_exclusions',
    documentId: 'doc_sbi_cashback_2026',
    bankId: 'sbi',
    cardName: 'SBI Cashback Card',
    sectionTitle: 'Monthly Cashback Limit & Category Exclusions',
    docType: 'exclusion_matrix',
    text: 'The 5% online cashback is capped at a maximum of ₹5,000 per billing statement cycle (corresponding to an optimal monthly eligible spend of ₹1,00,000). Offline POS spends earn 1% cashback. Strict exclusions: No cashback is earned on Rent payments, Wallet reloads, Jewelry transactions, Education/School fees, and Fuel surcharge transactions.',
    tokenCount: 69,
    keyTopics: ['₹5000 cap', 'billing cycle', 'offline 1%', 'exclusions', 'rent', 'wallet', 'jewelry', 'school fees', 'fuel'],
    sourceUrl: 'https://www.sbicard.com/en/personal/credit-cards/rewards/cashback-sbi-card.page',
    effectiveDate: '2026-07-01',
    lastVerifiedDate: '2026-11-06',
    verificationStatus: 'VERIFIED',
    recentDevaluationOrChange: 'Confirmed: Online travel & airline direct bookings continue to earn 5% cashback.',
  },

  // --- Axis Bank Atlas ---
  {
    id: 'chunk_axis_atlas_base_travel',
    documentId: 'doc_axis_atlas_2026',
    bankId: 'axis',
    cardName: 'Axis Bank Atlas',
    sectionTitle: 'EDGE Miles Accrual & Travel Multiplier',
    docType: 'reward_catalog',
    text: 'Axis Atlas earns 2 EDGE Miles per ₹100 spent on general retail transactions. For direct flight bookings made on airline websites/apps and direct hotel reservations, the card earns an accelerated 5 EDGE Miles per ₹100 spent (equivalent to ~9.0% value in airline miles or Accor hotel points).',
    tokenCount: 65,
    keyTopics: ['edge miles', 'travel', 'airline', 'hotel', '5 edge miles', 'accor', 'partner transfer'],
    sourceUrl: 'https://www.axisbank.com/retail/cards/credit-card/atlas-credit-card',
    effectiveDate: '2026-08-15',
    lastVerifiedDate: '2026-11-04',
    verificationStatus: 'VERIFIED',
  },
  {
    id: 'chunk_axis_atlas_partner_ratios',
    documentId: 'doc_axis_atlas_2026',
    bankId: 'axis',
    cardName: 'Axis Bank Atlas',
    sectionTitle: 'Partner Transfer Ratios & Accor ALL',
    docType: 'terms_and_conditions',
    text: 'EDGE Miles transfer at a lucrative 1:2 ratio to international frequent flyer and hotel programs: 1 EDGE Mile = 2 Partner Miles/Points. Key transfer partners include Accor Live Limitless (ALL), Singapore Airlines KrisFlyer, Qatar Airways Privilege Club, and Marriott Bonvoy. In Accor ALL, 2,000 points = €40 (~₹3,600), delivering up to ₹1.80-₹2.00 per EDGE Mile.',
    tokenCount: 82,
    keyTopics: ['transfer ratio', '1:2 ratio', 'accor', 'krisflyer', 'marriott', 'qatar', 'valuation', 'miles'],
    sourceUrl: 'https://www.axisbank.com/retail/cards/credit-card/atlas-credit-card',
    effectiveDate: '2026-08-15',
    lastVerifiedDate: '2026-11-04',
    verificationStatus: 'VERIFIED',
    recentDevaluationOrChange: 'Annual Accor transfer limit maintained at 30,000 EDGE Miles per calendar year.',
  },
  {
    id: 'chunk_axis_atlas_milestones_exclusions',
    documentId: 'doc_axis_atlas_2026',
    bankId: 'axis',
    cardName: 'Axis Bank Atlas',
    sectionTitle: 'Tier Milestones & Spend Exclusions',
    docType: 'milestone_schedule',
    text: 'Atlas Tier Milestones: Silver tier on joining; Gold tier at ₹3 Lakh annual spend (2,500 bonus miles); Platinum tier at ₹7.5 Lakh spend (5,000 bonus miles); ₹15 Lakh milestone awards 10,000 bonus miles. Exclusions: Spends on Rent, Wallet reloads, Insurance, Government institutions, and Fuel do not earn EDGE Miles or count toward milestone thresholds.',
    tokenCount: 76,
    keyTopics: ['milestones', 'gold tier', 'platinum tier', 'bonus miles', 'exclusions', 'insurance', 'rent'],
    sourceUrl: 'https://www.axisbank.com/retail/cards/credit-card/atlas-credit-card',
    effectiveDate: '2026-08-15',
    lastVerifiedDate: '2026-11-04',
    verificationStatus: 'VERIFIED',
  },

  // --- Amazon Pay ICICI Bank ---
  {
    id: 'chunk_icici_amazon_benefits',
    documentId: 'doc_icici_amazon_2026',
    bankId: 'icici',
    cardName: 'Amazon Pay ICICI Card',
    sectionTitle: 'Amazon Ecosystem & Partner Merchant Cashback',
    docType: 'reward_catalog',
    text: 'Amazon Pay ICICI Card delivers 5% unlimited cashback on Amazon.in shopping for active Amazon Prime subscribers (3% for non-Prime cardholders). Cardholders earn 2% unlimited cashback across 100+ partner apps using Amazon Pay (Swiggy, Zomato, Uber, Cleartrip, BookMyShow, redBus) and 1% unlimited flat cashback on all other eligible retail spends. Zero joining fee and zero annual renewal fees for life.',
    tokenCount: 81,
    keyTopics: ['amazon pay', '5% prime', 'unlimited cashback', 'lifetime free', 'partner merchants', 'swiggy', 'uber', 'zomato'],
    sourceUrl: 'https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay-credit-card',
    effectiveDate: '2026-06-01',
    lastVerifiedDate: '2026-11-03',
    verificationStatus: 'VERIFIED',
    recentDevaluationOrChange: 'Gold and jewelry purchases on Amazon earn 1% cashback instead of 5%.',
  },

  // --- American Express Platinum Travel ---
  {
    id: 'chunk_amex_plat_travel_milestones',
    documentId: 'doc_amex_plat_travel_2026',
    bankId: 'amex',
    cardName: 'American Express Platinum Travel',
    sectionTitle: 'Milestone Threshold Loyalty Schedule & Taj Vouchers',
    docType: 'milestone_schedule',
    text: 'Amex Platinum Travel card is built on annual spend milestones: Spend ₹1.90 Lakh in a card membership year to earn 15,000 bonus Membership Rewards (MR) points plus a ₹4,000 Taj Hotels voucher. Reach ₹4.00 Lakh in annual spend to unlock an additional 25,000 bonus MR points plus a ₹10,000 Taj Hotels voucher. Base rate is 1 MR point per ₹50 spend. Total return at ₹4 Lakh spend exceeds ₹32,000 (~8.0% effective net return).',
    tokenCount: 94,
    keyTopics: ['amex', 'platinum travel', 'milestone', '₹4 lakh spend', 'taj vouchers', 'mr points', 'membership rewards'],
    sourceUrl: 'https://www.americanexpress.com/in/credit-cards/platinum-travel-credit-card/',
    effectiveDate: '2026-07-01',
    lastVerifiedDate: '2026-11-06',
    verificationStatus: 'VERIFIED',
  },

  // --- Tata Neu Infinity HDFC Bank ---
  {
    id: 'chunk_tata_neu_infinity',
    documentId: 'doc_hdfc_infinia_2026',
    bankId: 'hdfc',
    cardName: 'Tata Neu Infinity HDFC Bank',
    sectionTitle: 'Tata Neu Ecosystem 10% & RuPay UPI 1.5%',
    docType: 'reward_catalog',
    text: 'Tata Neu Infinity HDFC Credit Card yields 5% NeuCoins on Tata Neu app spends (elevated to 10% with active NeuPass membership) across BigBasket, Croma, Tata 1mg, Air India Express, and Titan. The RuPay variant earns 1.5% NeuCoins on eligible UPI QR merchant transactions. 1 NeuCoin = ₹1.00 redeemable seamlessly across the Tata brand ecosystem.',
    tokenCount: 78,
    keyTopics: ['tata neu', 'neucoins', '10% return', 'rupay upi', 'croma', 'bigbasket', '1mg', 'air india'],
    sourceUrl: 'https://www.tataneu.com/credit-card',
    effectiveDate: '2026-08-01',
    lastVerifiedDate: '2026-11-04',
    verificationStatus: 'VERIFIED',
  },

  // --- Airtel Axis Bank ---
  {
    id: 'chunk_airtel_axis',
    documentId: 'doc_axis_atlas_2026',
    bankId: 'axis',
    cardName: 'Airtel Axis Bank Credit Card',
    sectionTitle: 'Telecom 25%, Utility 10% & Food Delivery',
    docType: 'reward_catalog',
    text: 'Airtel Axis Bank Credit Card delivers 25% cashback on Airtel mobile recharges, broadband, and DTH payments via Airtel Thanks App (capped at ₹250/month). Cardholders earn 10% cashback on utility bill payments (electricity, gas, water) via Airtel Thanks (capped at ₹250/month) and 10% cashback on Swiggy, Zomato, and BigBasket (combined cap of ₹500/month).',
    tokenCount: 78,
    keyTopics: ['airtel axis', '25% cashback', 'utility 10%', 'swiggy', 'zomato', 'bigbasket', 'capped', 'telecom'],
    sourceUrl: 'https://www.axisbank.com/retail/cards/credit-card/airtel-axis-bank-credit-card',
    effectiveDate: '2026-07-15',
    lastVerifiedDate: '2026-11-02',
    verificationStatus: 'VERIFIED',
  },
];

// Simple stopword list for lexical/sparse retrieval
const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
  'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it',
  'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on',
  'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should',
  'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these',
  'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
  'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours'
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9₹\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

// Sparse / Lexical BM25 approximation
export function computeSparseScore(queryTokens: string[], chunk: PolicyChunk): { score: number; matched: string[] } {
  const chunkTextLower = (chunk.sectionTitle + ' ' + chunk.text + ' ' + chunk.keyTopics.join(' ')).toLowerCase();
  const chunkTokens = new Set(tokenize(chunkTextLower));
  
  let matchCount = 0;
  const matched: string[] = [];

  for (const token of queryTokens) {
    if (chunkTokens.has(token)) {
      matchCount += 1;
      matched.push(token);
    } else if (chunk.keyTopics.some((k) => k.toLowerCase().includes(token))) {
      matchCount += 1.5;
      matched.push(token);
    }
  }

  // Length-normalized score
  const score = matchCount / Math.sqrt(chunk.tokenCount + 10);
  return { score, matched };
}

// Semantic / Dense Relevance approximation
export function computeDenseScore(query: string, chunk: PolicyChunk): number {
  const queryLower = query.toLowerCase();
  let score = 0;

  // Exact card mention
  if (queryLower.includes(chunk.cardName.toLowerCase()) || queryLower.includes(chunk.bankId)) {
    score += 0.45;
  }

  // Topic overlap weighting
  for (const topic of chunk.keyTopics) {
    if (queryLower.includes(topic.toLowerCase())) {
      score += 0.25;
    }
  }

  // Intent patterns (e.g., flight, hotel, cashback, exclusions, cap, milestone, transfer)
  const intentKeywords = ['flight', 'hotel', 'cashback', 'exclusion', 'cap', 'milestone', 'transfer', 'rent', 'fuel', 'upi'];
  for (const kw of intentKeywords) {
    if (queryLower.includes(kw) && chunk.text.toLowerCase().includes(kw)) {
      score += 0.2;
    }
  }

  return Math.min(1.0, score);
}

// Reciprocal Rank Fusion (RRF) with constant k=60
export function performRRFRetrieval(
  query: string,
  options?: {
    cardFilter?: string;
    bankFilter?: string;
    topK?: number;
  }
): RAGRetrievalResult[] {
  const topK = options?.topK || 4;
  const queryTokens = tokenize(query);

  let candidates = POLICY_CHUNKS;
  if (options?.cardFilter) {
    candidates = candidates.filter((c) =>
      c.cardName.toLowerCase().includes(options.cardFilter!.toLowerCase())
    );
  }
  if (options?.bankFilter) {
    candidates = candidates.filter((c) => c.bankId === options.bankFilter);
  }

  // 1. Calculate Dense Scores & Ranks
  const denseScored = candidates.map((c) => ({
    chunk: c,
    denseScore: computeDenseScore(query, c),
  }));
  denseScored.sort((a, b) => b.denseScore - a.denseScore);
  const denseRankMap = new Map<string, number>();
  denseScored.forEach((item, idx) => denseRankMap.set(item.chunk.id, idx + 1));

  // 2. Calculate Sparse / BM25 Scores & Ranks
  const sparseScored = candidates.map((c) => {
    const res = computeSparseScore(queryTokens, c);
    return {
      chunk: c,
      sparseScore: res.score,
      matched: res.matched,
    };
  });
  sparseScored.sort((a, b) => b.sparseScore - a.sparseScore);
  const sparseRankMap = new Map<string, number>();
  const sparseMatchedMap = new Map<string, string[]>();
  sparseScored.forEach((item, idx) => {
    sparseRankMap.set(item.chunk.id, idx + 1);
    sparseMatchedMap.set(item.chunk.id, item.matched);
  });

  // 3. Reciprocal Rank Fusion
  const k = 60;
  const fusedResults: RAGRetrievalResult[] = candidates.map((chunk) => {
    const dRank = denseRankMap.get(chunk.id) || 100;
    const sRank = sparseRankMap.get(chunk.id) || 100;
    const rrfScore = 1 / (k + dRank) + 1 / (k + sRank);
    const dScore = denseScored.find((x) => x.chunk.id === chunk.id)?.denseScore || 0;
    const sScore = sparseScored.find((x) => x.chunk.id === chunk.id)?.sparseScore || 0;

    return {
      chunk,
      score: rrfScore,
      denseScore: dScore,
      sparseScore: sScore,
      denseRank: dRank,
      sparseRank: sRank,
      matchedKeywords: sparseMatchedMap.get(chunk.id) || [],
    };
  });

  fusedResults.sort((a, b) => b.score - a.score);
  return fusedResults.slice(0, topK);
}
