export type BankId = 
  | 'hdfc' 
  | 'axis' 
  | 'icici' 
  | 'sbi' 
  | 'amex' 
  | 'standard_chartered' 
  | 'idfc' 
  | 'indusind' 
  | 'kotak'
  | 'hsbc'
  | 'au'
  | 'rbl'
  | 'federal'
  | 'yes';

export type CardCategory = 
  | 'cashback' 
  | 'travel_miles' 
  | 'lifestyle_rewards' 
  | 'super_premium' 
  | 'fuel' 
  | 'shopping';

export type SpendCategory = 
  | 'online_shopping' 
  | 'travel_flights' 
  | 'travel_hotels' 
  | 'dining_food' 
  | 'grocery_supermarket' 
  | 'utilities_bills' 
  | 'entertainment_movies' 
  | 'electronics' 
  | 'fuel' 
  | 'international_forex' 
  | 'rent_wallet';

export type TransactionType = 'online' | 'offline';

export interface CardVisual {
  gradient: string;
  textColor: string;
  accentColor: string;
  borderStroke: string;
  finish: 'titanium' | 'obsidian' | 'champagne' | 'emerald' | 'sapphire' | 'matte';
  chipColor: 'gold' | 'silver';
  network: 'visa' | 'mastercard' | 'amex' | 'rupay';
  cardArtUrl?: string; // High-resolution photographic card face
}

export interface AcceleratedRule {
  merchants?: string[];
  categories?: SpendCategory[];
  transactionType?: TransactionType;
  multiplierOrRate: number; // e.g. 5 for 5% cashback or 5X points
  rateType: 'cashback_percent' | 'point_multiplier' | 'points_per_amount';
  pointsPerAmount?: { points: number; amount: number }; // e.g. 5 points per 150
  capPerMonth?: number; // monetary INR or points
  minSpend?: number;
  description: string;
  channel?: 'portal_only' | 'direct_or_portal' | 'smartbuy' | 'reward_multiplier';
}

export interface CardExclusion {
  category: SpendCategory;
  reason: string;
}

export interface CreditCard {
  id: string;
  name: string;
  bankId: BankId;
  bankName: string;
  category: CardCategory;
  annualFee: number;
  annualFeeWaiverSpend?: number;
  forexMarkupPercent: number;
  loungeAccess: string;
  rewardType: 'cashback' | 'reward_points' | 'edge_miles' | 'membership_rewards';
  pointValueInInr: number; // e.g. 1.0 for Infinia on SmartBuy, 0.25 for SBI SimplyClick, 0.50 for Regalia Gold, 1.0 for cashpoint
  pointCurrencyName: string; // e.g. 'Reward Points', 'CashPoints', 'EDGE Miles', 'Membership Rewards Points'
  baseRateDescription: string;
  baseRewardCalculation: {
    pointsPerAmount?: { points: number; amount: number };
    cashbackPercent?: number;
  };
  acceleratedRules: AcceleratedRule[];
  exclusions: CardExclusion[];
  monthlyCapInr?: number;
  annualCapInr?: number;
  milestones?: {
    spendRequirement: number;
    bonusPointsOrVoucher: string;
    monetaryValue: number;
  }[];
  sourceDoc: {
    title: string;
    url: string;
    effectiveDate: string;
    lastVerifiedDate: string;
    confidence: number;
    verificationStatus: 'VERIFIED' | 'NEEDS_REVIEW';
  };
  visual: CardVisual;
  imageUrl?: string;
}

export interface UserSavedCard {
  cardId: string;
  customNickname?: string;
  monthlySpendsRecorded?: number;
  capUsedThisMonth?: number; // tracked cap
  dateAdded: string;
}

export interface Merchant {
  id: string;
  name: string;
  defaultCategory: SpendCategory;
  logoIcon: string;
  popular: boolean;
  aliases: string[];
}

export interface RecommendationRequest {
  amount: number;
  merchantName?: string;
  category: SpendCategory;
  transactionType: TransactionType;
  includeUnownedCards?: boolean;
}

export interface CardCalculationDetail {
  card: CreditCard;
  isOwned: boolean;
  rank: number;
  isOptimal: boolean;
  nominalRewardPointsEarned: number;
  nominalCashbackEarned: number;
  netBenefitInr: number;
  effectiveReturnPercent: number;
  applicableRuleDescription: string;
  isAccelerated: boolean;
  capHit: boolean;
  capRemainingInr?: number;
  exclusionApplies: boolean;
  exclusionReason?: string;
  pointToInrConversionRate: number;
  calculationSteps: string[];
  whyLessBeneficialReason?: string;
  sourceDocCitation: string;
}

export interface RecommendationResponse {
  query: RecommendationRequest;
  timestamp: string;
  recommendedCard?: CardCalculationDetail | null;
  rankedCards: CardCalculationDetail[];
  unownedOpportunities: CardCalculationDetail[];
  summaryNote: string;
}

export interface PolicyDocument {
  id: string;
  bankId: BankId;
  cardName: string;
  documentTitle: string;
  documentType: 'terms_and_conditions' | 'reward_catalog' | 'fee_schedule' | 'devaluation_notice';
  url: string;
  retrievedDate: string;
  lastVerifiedDate: string;
  effectiveDate: string;
  verificationStatus: 'VERIFIED' | 'FLAGGED';
  keyRulesSummary: string[];
  recentChanges?: string;
}
