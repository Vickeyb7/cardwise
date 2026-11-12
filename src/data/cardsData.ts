import { CreditCard } from '../types.ts';

export const INDIAN_CREDIT_CARDS: CreditCard[] = [
  // ==========================================
  // --- HDFC BANK ---
  // ==========================================
  {
    id: 'hdfc_infinia',
    name: 'HDFC Infinia Metal Edition',
    bankId: 'hdfc',
    bankName: 'HDFC Bank',
    category: 'super_premium',
    annualFee: 12500,
    annualFeeWaiverSpend: 1000000,
    forexMarkupPercent: 2.0,
    loungeAccess: 'Unlimited Domestic & International (Priority Pass with +1 Guest)',
    rewardType: 'reward_points',
    pointValueInInr: 1.0, // 1 RP = ₹1 on SmartBuy for flights & hotels
    pointCurrencyName: 'Reward Points',
    baseRateDescription: '5 Reward Points per ₹150 (3.33% base return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 5, amount: 150 },
    },
    acceleratedRules: [
      {
        merchants: ['makemytrip', 'cleartrip', 'indigo'],
        categories: ['travel_flights'],
        multiplierOrRate: 5, // 5X SmartBuy Flights = 16.6% return
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 25, amount: 150 },
        capPerMonth: 10000,
        description: '5X Reward Points (16.6% return) on Flights via SmartBuy',
        channel: 'smartbuy',
      },
      {
        merchants: ['taj_hotels'],
        categories: ['travel_hotels'],
        multiplierOrRate: 10, // 10X SmartBuy Hotels = 33.3% return
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 50, amount: 150 },
        capPerMonth: 10000,
        description: '10X Reward Points (33.3% return) on Hotels via SmartBuy',
        channel: 'smartbuy',
      },
      {
        merchants: ['amazon', 'flipkart', 'myntra', 'nykaa', 'croma'],
        categories: ['online_shopping', 'electronics'],
        multiplierOrRate: 3, // 3X on SmartBuy Instant Vouchers / Gyftr = ~10% return
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 15, amount: 150 },
        capPerMonth: 10000,
        description: '3X Reward Points (~10% return) on Shopping Vouchers via SmartBuy Gyftr',
        channel: 'smartbuy',
      },
      {
        merchants: ['apple'],
        categories: ['electronics'],
        multiplierOrRate: 5,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 25, amount: 150 },
        capPerMonth: 10000,
        description: '5X Reward Points on Apple products via SmartBuy portal',
        channel: 'smartbuy',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel transactions excluded from reward points (1% surcharge waiver up to ₹1,000/cycle).' },
      { category: 'rent_wallet', reason: 'Rent payments and wallet loads strictly excluded from reward calculation.' },
      { category: 'utilities_bills', reason: 'Government and tax payments excluded; utility points capped at 2,000 RP/month.' },
    ],
    monthlyCapInr: 10000,
    milestones: [
      { spendRequirement: 1000000, bonusPointsOrVoucher: 'Annual Fee Waiver + 12,500 renewal points', monetaryValue: 12500 },
    ],
    sourceDoc: {
      title: 'HDFC Infinia Credit Card Terms & Conditions v4.3',
      url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card',
      effectiveDate: '2026-09-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/hdfc_infinia.jpg',
    visual: {
      gradient: 'from-[#0B0F19] via-[#1E293B] to-[#0A0D14]',
      textColor: 'text-white',
      accentColor: '#D4AF37',
      borderStroke: 'border-amber-400/30',
      finish: 'titanium',
      chipColor: 'gold',
      network: 'visa',
      cardArtUrl: '/assets/cards/hdfc_infinia.jpg',
    },
  },

  {
    id: 'hdfc_diners_black',
    name: 'HDFC Diners Club Black Metal Edition',
    bankId: 'hdfc',
    bankName: 'HDFC Bank',
    category: 'super_premium',
    annualFee: 10000,
    annualFeeWaiverSpend: 800000,
    forexMarkupPercent: 2.0,
    loungeAccess: 'Unlimited Domestic & Global Airport Lounges for primary and add-on members',
    rewardType: 'reward_points',
    pointValueInInr: 1.0,
    pointCurrencyName: 'Diners Reward Points',
    baseRateDescription: '5 Reward Points per ₹150 (3.33% base return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 5, amount: 150 },
    },
    acceleratedRules: [
      {
        categories: ['travel_flights'],
        multiplierOrRate: 5,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 25, amount: 150 },
        capPerMonth: 7500,
        description: '5X Reward Points (16.6% return) on Flights via SmartBuy',
        channel: 'smartbuy',
      },
      {
        categories: ['travel_hotels'],
        multiplierOrRate: 10,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 50, amount: 150 },
        capPerMonth: 7500,
        description: '10X Reward Points (33.3% return) on Hotels via SmartBuy',
        channel: 'smartbuy',
      },
      {
        categories: ['dining_food'],
        multiplierOrRate: 2,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 10, amount: 150 },
        description: '2X Reward Points on Weekend Dining at standalone restaurants',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded from reward points.' },
      { category: 'rent_wallet', reason: 'Rent & wallet loads excluded.' },
    ],
    milestones: [
      { spendRequirement: 800000, bonusPointsOrVoucher: 'Annual fee waiver + 10,000 points', monetaryValue: 10000 },
      { spendRequirement: 400000, bonusPointsOrVoucher: 'Complimentary annual memberships (Club Marriott, Forbes, Amazon Prime)', monetaryValue: 6500 },
    ],
    sourceDoc: {
      title: 'HDFC Diners Club Black Reward Features',
      url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/diners-black',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/hdfc_diners_black.jpg',
    visual: {
      gradient: 'from-[#0A0E17] via-[#1E293B] to-[#0F172A]',
      textColor: 'text-white',
      accentColor: '#38BDF8',
      borderStroke: 'border-cyan-400/30',
      finish: 'titanium',
      chipColor: 'silver',
      network: 'mastercard',
      cardArtUrl: '/assets/cards/hdfc_diners_black.jpg',
    },
  },

  {
    id: 'hdfc_regalia_gold',
    name: 'HDFC Regalia Gold',
    bankId: 'hdfc',
    bankName: 'HDFC Bank',
    category: 'lifestyle_rewards',
    annualFee: 2500,
    annualFeeWaiverSpend: 400000,
    forexMarkupPercent: 2.0,
    loungeAccess: '12 Domestic Airport Lounge Visits/year + 6 International via Priority Pass',
    rewardType: 'reward_points',
    pointValueInInr: 0.50, // 1 RP = ₹0.50 on SmartBuy flights & hotels / gold voucher
    pointCurrencyName: 'Gold Reward Points',
    baseRateDescription: '4 Reward Points per ₹150 (1.33% base return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 4, amount: 150 },
    },
    acceleratedRules: [
      {
        merchants: ['myntra', 'nykaa', 'marks_and_spencer', 'reliance_digital'],
        categories: ['online_shopping', 'electronics'],
        multiplierOrRate: 5, // 5X points = ~6.6% return
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 20, amount: 150 },
        capPerMonth: 5000,
        description: '5X Reward Points (6.6% value) at Nykaa, Myntra, M&S, Reliance Digital',
      },
      {
        categories: ['travel_flights', 'travel_hotels'],
        multiplierOrRate: 3,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 12, amount: 150 },
        capPerMonth: 4000,
        description: '3X Reward Points on SmartBuy Flights & Hotels',
        channel: 'smartbuy',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded; 1% surcharge waiver applicable.' },
      { category: 'rent_wallet', reason: 'Rent & wallet loads excluded.' },
    ],
    milestones: [
      { spendRequirement: 150000, bonusPointsOrVoucher: '₹1,500 Marriott/Myntra/Marks & Spencer voucher every quarter', monetaryValue: 1500 },
      { spendRequirement: 500000, bonusPointsOrVoucher: '₹5,000 flight voucher at ₹5 Lakhs annual spend', monetaryValue: 5000 },
      { spendRequirement: 750000, bonusPointsOrVoucher: 'Additional ₹5,000 flight voucher at ₹7.5 Lakhs spend', monetaryValue: 5000 },
    ],
    sourceDoc: {
      title: 'HDFC Regalia Gold Product Brochure',
      url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-gold-credit-card',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/hdfc_regalia_gold.jpg',
    visual: {
      gradient: 'from-[#422006] via-[#713F12] to-[#291403]',
      textColor: 'text-amber-100',
      accentColor: '#FBBF24',
      borderStroke: 'border-amber-400/40',
      finish: 'champagne',
      chipColor: 'gold',
      network: 'visa',
      cardArtUrl: '/assets/cards/hdfc_regalia_gold.jpg',
    },
  },

  {
    id: 'hdfc_millennia',
    name: 'HDFC Millennia',
    bankId: 'hdfc',
    bankName: 'HDFC Bank',
    category: 'cashback',
    annualFee: 1000,
    annualFeeWaiverSpend: 100000,
    forexMarkupPercent: 3.5,
    loungeAccess: '1 Domestic Lounge Visit per calendar quarter (spend ₹100,000 in previous quarter)',
    rewardType: 'cashback',
    pointValueInInr: 1.0, // 1 CashPoint = ₹1 statement credit
    pointCurrencyName: 'CashPoints',
    baseRateDescription: '1% CashPoints on all offline & non-partner online spends',
    baseRewardCalculation: {
      cashbackPercent: 1.0,
    },
    acceleratedRules: [
      {
        merchants: ['amazon', 'flipkart', 'myntra', 'swiggy', 'zomato', 'uber', 'tata_cliq', 'cultfit'],
        categories: ['online_shopping', 'dining_food', 'grocery_supermarket'],
        multiplierOrRate: 5.0,
        rateType: 'cashback_percent',
        capPerMonth: 1000, // ₹1,000 cap per calendar month
        description: '5% Cashback on Amazon, Flipkart, Myntra, Swiggy, Zomato, Uber, Tata CLiQ (Max ₹1,000/month)',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded; 1% surcharge waiver.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    milestones: [
      { spendRequirement: 100000, bonusPointsOrVoucher: '₹1,000 gift voucher on ₹1 Lakh spend per quarter', monetaryValue: 1000 },
    ],
    sourceDoc: {
      title: 'HDFC Millennia Credit Card CashPoint Program',
      url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/millennia-cards',
      effectiveDate: '2026-07-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/hdfc_millennia.jpg',
    visual: {
      gradient: 'from-[#0284C7] via-[#0369A1] to-[#082F49]',
      textColor: 'text-sky-100',
      accentColor: '#38BDF8',
      borderStroke: 'border-sky-400/40',
      finish: 'matte',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/hdfc_millennia.jpg',
    },
  },

  {
    id: 'swiggy_hdfc',
    name: 'Swiggy HDFC Bank Card',
    bankId: 'hdfc',
    bankName: 'HDFC Bank',
    category: 'cashback',
    annualFee: 500,
    annualFeeWaiverSpend: 200000,
    forexMarkupPercent: 3.5,
    loungeAccess: 'None (Dining & Delivery champion)',
    rewardType: 'cashback',
    pointValueInInr: 1.0,
    pointCurrencyName: 'Swiggy Money Cashback ₹',
    baseRateDescription: '1% flat cashback on everyday spends & offline retail',
    baseRewardCalculation: {
      cashbackPercent: 1.0,
    },
    acceleratedRules: [
      {
        merchants: ['swiggy', 'instamart', 'dineout'],
        categories: ['dining_food', 'grocery_supermarket'],
        multiplierOrRate: 10.0,
        rateType: 'cashback_percent',
        capPerMonth: 1500, // ₹1,500/month
        description: '10% Cashback on Swiggy Food, Instamart, Dineout & Genie (Up to ₹1,500/month)',
      },
      {
        merchants: ['amazon', 'flipkart', 'myntra', 'nykaa', 'zara', 'h&m', 'uber', 'ola', 'bookmyshow'],
        categories: ['online_shopping', 'electronics', 'entertainment_movies'],
        multiplierOrRate: 5.0,
        rateType: 'cashback_percent',
        capPerMonth: 1500,
        description: '5% Cashback on leading online shopping apps (Up to ₹1,500/month)',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel transactions excluded.' },
      { category: 'rent_wallet', reason: 'Rent payments, wallet loading & government payments excluded.' },
    ],
    sourceDoc: {
      title: 'Swiggy HDFC Credit Card Features & CashBack Schedule',
      url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/swiggy-hdfc-bank-credit-card',
      effectiveDate: '2026-06-01',
      lastVerifiedDate: '2026-11-06',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/swiggy_hdfc.jpg',
    visual: {
      gradient: 'from-[#1E293B] via-[#0F172A] to-[#EA580C]',
      textColor: 'text-white',
      accentColor: '#F97316',
      borderStroke: 'border-orange-500/40',
      finish: 'matte',
      chipColor: 'silver',
      network: 'mastercard',
      cardArtUrl: '/assets/cards/swiggy_hdfc.jpg',
    },
  },

  {
    id: 'tata_neu_infinity',
    name: 'Tata Neu Infinity HDFC',
    bankId: 'hdfc',
    bankName: 'HDFC Bank',
    category: 'shopping',
    annualFee: 1499,
    annualFeeWaiverSpend: 300000,
    forexMarkupPercent: 2.0,
    loungeAccess: '8 Domestic Lounge Visits/year + 4 International via Priority Pass',
    rewardType: 'reward_points',
    pointValueInInr: 1.0, // 1 NeuCoin = ₹1 across Tata brands
    pointCurrencyName: 'NeuCoins',
    baseRateDescription: '1.5% NeuCoins on all non-Tata spends & UPI spends (via RuPay)',
    baseRewardCalculation: {
      cashbackPercent: 1.5,
    },
    acceleratedRules: [
      {
        merchants: ['bigbasket', 'croma', 'tata_1mg', 'air_india', 'taj_hotels', 'tata_cliq', 'westside', 'titan', 'tanishq'],
        categories: ['online_shopping', 'grocery_supermarket', 'electronics', 'travel_flights', 'travel_hotels'],
        multiplierOrRate: 10.0, // 5% card + 5% NeuPass = 10%
        rateType: 'cashback_percent',
        description: '10% Total Value (5% NeuCoins on Card + 5% via NeuPass) on Tata Brands',
      },
      {
        categories: ['utilities_bills'],
        multiplierOrRate: 5.0,
        rateType: 'cashback_percent',
        description: '5% NeuCoins on bill payments via Tata Neu app',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded; 1% surcharge waiver.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    milestones: [
      { spendRequirement: 300000, bonusPointsOrVoucher: 'Annual fee waiver on ₹3 Lakhs spend', monetaryValue: 1499 },
    ],
    sourceDoc: {
      title: 'Tata Neu Infinity Credit Card Terms and NeuCoin Accrual Rules',
      url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/tata-neu-infinity-hdfc-bank-credit-card',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/tata_neu_infinity.jpg',
    visual: {
      gradient: 'from-[#3B0764] via-[#581C87] to-[#1E1B4B]',
      textColor: 'text-purple-100',
      accentColor: '#A855F7',
      borderStroke: 'border-purple-400/40',
      finish: 'titanium',
      chipColor: 'gold',
      network: 'rupay',
      cardArtUrl: '/assets/cards/tata_neu_infinity.jpg',
    },
  },

  // ==========================================
  // --- ICICI BANK ---
  // ==========================================
  {
    id: 'amazon_pay_icici',
    name: 'Amazon Pay ICICI Card',
    bankId: 'icici',
    bankName: 'ICICI Bank',
    category: 'cashback',
    annualFee: 0, // Lifetime Free!
    forexMarkupPercent: 3.5,
    loungeAccess: 'None (Lifetime Free pure rewards card)',
    rewardType: 'cashback',
    pointValueInInr: 1.0, // 1 Amazon Pay ₹ = ₹1
    pointCurrencyName: 'Amazon Pay Balance ₹',
    baseRateDescription: '1% unlimited cashback on all retail spends without cap',
    baseRewardCalculation: {
      cashbackPercent: 1.0,
    },
    acceleratedRules: [
      {
        merchants: ['amazon'],
        categories: ['online_shopping', 'electronics'],
        multiplierOrRate: 5.0,
        rateType: 'cashback_percent',
        description: '5% Unlimited Cashback on Amazon India for Prime members (3% for non-Prime)',
      },
      {
        merchants: ['amazon_pay_recharges', 'electricity_bill', 'swiggy', 'zomato', 'uber', 'bookmyshow', 'cleartrip'],
        categories: ['utilities_bills', 'dining_food', 'entertainment_movies'],
        multiplierOrRate: 2.0,
        rateType: 'cashback_percent',
        description: '2% Unlimited Cashback on 100+ Amazon Pay partner merchants and utility bill recharges',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel surcharge waiver 1% on all petrol pumps; fuel excluded from cashback.' },
      { category: 'rent_wallet', reason: 'Gold purchases, EMI, wallet load and rent payments excluded.' },
    ],
    sourceDoc: {
      title: 'Amazon Pay ICICI Bank Credit Card Agreement & Benefits',
      url: 'https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay-credit-card',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 1.0,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/amazon_pay_icici.jpg',
    visual: {
      gradient: 'from-[#111827] via-[#1F2937] to-[#030712]',
      textColor: 'text-white',
      accentColor: '#FF9900', // Amazon Orange
      borderStroke: 'border-amber-500/30',
      finish: 'obsidian',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/amazon_pay_icici.jpg',
    },
  },

  {
    id: 'icici_emeralde_private',
    name: 'ICICI Emeralde Private Metal',
    bankId: 'icici',
    bankName: 'ICICI Bank',
    category: 'super_premium',
    annualFee: 12000,
    annualFeeWaiverSpend: 1000000,
    forexMarkupPercent: 1.5, // Ultra-low forex
    loungeAccess: 'Unlimited Domestic & International Lounges + Spa Access with guests',
    rewardType: 'reward_points',
    pointValueInInr: 1.0,
    pointCurrencyName: 'ICICI Reward Points',
    baseRateDescription: '6 Reward Points per ₹200 (3.0% base return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 6, amount: 200 },
    },
    acceleratedRules: [
      {
        categories: ['travel_flights', 'travel_hotels'],
        multiplierOrRate: 4, // 24 points per ₹200 = 12% return via travel portal
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 24, amount: 200 },
        description: '4X Points (12% value back) on Flight and Hotel bookings via concierge portal',
      },
      {
        merchants: ['bookmyshow'],
        categories: ['entertainment_movies'],
        multiplierOrRate: 100.0,
        rateType: 'cashback_percent',
        capPerMonth: 1500,
        description: 'Buy 1 Get 1 Free Movie/Event Tickets up to ₹750/ticket (twice monthly)',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded; 1% surcharge waiver up to ₹1,000/cycle.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    milestones: [
      { spendRequirement: 1000000, bonusPointsOrVoucher: 'Annual fee waiver on ₹10 Lakhs annual spend', monetaryValue: 12000 },
      { spendRequirement: 400000, bonusPointsOrVoucher: 'Taj Experiences luxury gift voucher worth ₹10,000', monetaryValue: 10000 },
    ],
    sourceDoc: {
      title: 'ICICI Bank Emeralde Private Metal Features',
      url: 'https://www.icicibank.com/personal-banking/cards/credit-card/emeralde-credit-card',
      effectiveDate: '2026-09-01',
      lastVerifiedDate: '2026-11-06',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/icici_emeralde.jpg',
    visual: {
      gradient: 'from-[#064E3B] via-[#047857] to-[#022C22]',
      textColor: 'text-emerald-100',
      accentColor: '#10B981',
      borderStroke: 'border-emerald-400/40',
      finish: 'titanium',
      chipColor: 'gold',
      network: 'mastercard',
      cardArtUrl: '/assets/cards/icici_emeralde.jpg',
    },
  },

  {
    id: 'icici_sapphiro',
    name: 'ICICI Sapphiro Credit Card',
    bankId: 'icici',
    bankName: 'ICICI Bank',
    category: 'lifestyle_rewards',
    annualFee: 3500,
    annualFeeWaiverSpend: 600000,
    forexMarkupPercent: 3.5,
    loungeAccess: '4 Domestic Airport Lounge visits/quarter + 2 International via Dreamfolks',
    rewardType: 'reward_points',
    pointValueInInr: 0.25,
    pointCurrencyName: 'ICICI Reward Points',
    baseRateDescription: '2 Reward Points per ₹100 on domestic retail spends (0.5% return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 2, amount: 100 },
    },
    acceleratedRules: [
      {
        categories: ['international_forex'],
        multiplierOrRate: 4, // 4 RP per 100 = 1.0% return
        rateType: 'points_per_amount',
        pointsPerAmount: { points: 4, amount: 100 },
        description: '4 Reward Points per ₹100 on international spends',
      },
      {
        merchants: ['bookmyshow'],
        categories: ['entertainment_movies'],
        multiplierOrRate: 50.0,
        rateType: 'cashback_percent',
        capPerMonth: 1000,
        description: 'Buy 1 Get 1 Free on BookMyShow up to ₹500 discount twice every month',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    sourceDoc: {
      title: 'ICICI Sapphiro Benefits Manual',
      url: 'https://www.icicibank.com/personal-banking/cards/credit-card/sapphiro-credit-card',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/icici_sapphiro.jpg',
    visual: {
      gradient: 'from-[#1E3A8A] via-[#1D4ED8] to-[#172554]',
      textColor: 'text-blue-100',
      accentColor: '#60A5FA',
      borderStroke: 'border-blue-400/40',
      finish: 'sapphire',
      chipColor: 'silver',
      network: 'mastercard',
      cardArtUrl: '/assets/cards/icici_sapphiro.jpg',
    },
  },

  // ==========================================
  // --- AXIS BANK ---
  // ==========================================
  {
    id: 'axis_atlas',
    name: 'Axis Bank Atlas',
    bankId: 'axis',
    bankName: 'Axis Bank',
    category: 'travel_miles',
    annualFee: 5000,
    annualFeeWaiverSpend: 1500000,
    forexMarkupPercent: 3.5,
    loungeAccess: 'Up to 18 Domestic Airport Lounges & 12 International via Partner Tiers',
    rewardType: 'edge_miles',
    pointValueInInr: 1.8, // 1 EDGE Mile = 2 Partner Points (Accor / Singapore / Turkish / Air France) = ~₹1.8 to ₹2.0
    pointCurrencyName: 'EDGE Miles',
    baseRateDescription: '2 EDGE Miles per ₹100 spend (3.6% - 4% return on travel)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 2, amount: 100 },
    },
    acceleratedRules: [
      {
        merchants: ['indigo', 'air_india', 'singapore_airlines', 'emirates', 'taj_hotels', 'marriott', 'itc_hotels'],
        categories: ['travel_flights', 'travel_hotels'],
        multiplierOrRate: 2.5, // 5 EDGE Miles per ₹100 = 9% - 10% return
        rateType: 'points_per_amount',
        pointsPerAmount: { points: 5, amount: 100 },
        capPerMonth: 10000,
        description: '5 EDGE Miles per ₹100 (9%-10% return) on direct airline and hotel transactions',
        channel: 'direct_or_portal',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded; 1% surcharge waiver.' },
      { category: 'rent_wallet', reason: 'Rent payments, wallet loading & government payments excluded.' },
      { category: 'utilities_bills', reason: 'Utility spends capped at 2,500 EDGE Miles per month.' },
    ],
    milestones: [
      { spendRequirement: 300000, bonusPointsOrVoucher: 'Silver Tier Upgrade + 2,500 Bonus EDGE Miles', monetaryValue: 4500 },
      { spendRequirement: 750000, bonusPointsOrVoucher: 'Gold Tier Upgrade + 5,000 Bonus EDGE Miles', monetaryValue: 9000 },
      { spendRequirement: 1500000, bonusPointsOrVoucher: 'Platinum Tier Upgrade + 10,000 Bonus EDGE Miles', monetaryValue: 18000 },
    ],
    sourceDoc: {
      title: 'Axis Atlas Credit Card Travel Mileage Schedule 2026',
      url: 'https://www.axisbank.com/retail/cards/credit-card/axis-bank-atlas-credit-card',
      effectiveDate: '2026-09-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/axis_atlas.jpg',
    visual: {
      gradient: 'from-[#4C0519] via-[#881337] to-[#1E293B]',
      textColor: 'text-rose-100',
      accentColor: '#FB7185',
      borderStroke: 'border-rose-400/40',
      finish: 'titanium',
      chipColor: 'silver',
      network: 'mastercard',
      cardArtUrl: '/assets/cards/axis_atlas.jpg',
    },
  },

  {
    id: 'airtel_axis',
    name: 'Airtel Axis Bank Card',
    bankId: 'axis',
    bankName: 'Axis Bank',
    category: 'cashback',
    annualFee: 500,
    annualFeeWaiverSpend: 200000,
    forexMarkupPercent: 3.5,
    loungeAccess: 'None',
    rewardType: 'cashback',
    pointValueInInr: 1.0,
    pointCurrencyName: 'Direct Cashback ₹',
    baseRateDescription: '1% flat cashback on all offline and other retail purchases',
    baseRewardCalculation: {
      cashbackPercent: 1.0,
    },
    acceleratedRules: [
      {
        merchants: ['airtel'],
        categories: ['utilities_bills'],
        multiplierOrRate: 25.0,
        rateType: 'cashback_percent',
        capPerMonth: 250,
        description: '25% Cashback on Airtel Mobile, Broadband & DTH bill payments via Airtel Thanks App',
      },
      {
        categories: ['utilities_bills'],
        multiplierOrRate: 10.0,
        rateType: 'cashback_percent',
        capPerMonth: 250,
        description: '10% Cashback on Electricity, Water & Gas utility bill payments via Airtel Thanks App',
      },
      {
        merchants: ['swiggy', 'zomato', 'bigbasket'],
        categories: ['dining_food', 'grocery_supermarket'],
        multiplierOrRate: 10.0,
        rateType: 'cashback_percent',
        capPerMonth: 500,
        description: '10% Cashback on Swiggy, Zomato, and BigBasket (up to ₹500/month)',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel surcharge waiver 1%; fuel excluded from cashback.' },
      { category: 'rent_wallet', reason: 'Rent payments and wallet loading excluded.' },
    ],
    sourceDoc: {
      title: 'Airtel Axis Bank Credit Card Official Cashback T&C',
      url: 'https://www.axisbank.com/retail/cards/credit-card/airtel-axis-bank-credit-card',
      effectiveDate: '2026-07-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/airtel_axis.jpg',
    visual: {
      gradient: 'from-[#881337] via-[#9F1239] to-[#4C0519]',
      textColor: 'text-rose-100',
      accentColor: '#F43F5E',
      borderStroke: 'border-rose-400/40',
      finish: 'matte',
      chipColor: 'gold',
      network: 'mastercard',
      cardArtUrl: '/assets/cards/airtel_axis.jpg',
    },
  },

  {
    id: 'flipkart_axis',
    name: 'Flipkart Axis Bank Card',
    bankId: 'axis',
    bankName: 'Axis Bank',
    category: 'cashback',
    annualFee: 500,
    annualFeeWaiverSpend: 350000,
    forexMarkupPercent: 3.5,
    loungeAccess: '4 Domestic Lounge visits per calendar year (subject to spend criteria)',
    rewardType: 'cashback',
    pointValueInInr: 1.0,
    pointCurrencyName: 'Direct Cashback ₹',
    baseRateDescription: '1.5% flat unlimited cashback on other online and offline spends',
    baseRewardCalculation: {
      cashbackPercent: 1.5,
    },
    acceleratedRules: [
      {
        merchants: ['flipkart', 'cleartrip'],
        categories: ['online_shopping', 'travel_flights', 'travel_hotels'],
        multiplierOrRate: 5.0,
        rateType: 'cashback_percent',
        description: '5% Unlimited Flat Cashback on Flipkart & Cleartrip without any upper cap',
      },
      {
        merchants: ['swiggy', 'uber', 'pvr'],
        categories: ['dining_food', 'entertainment_movies'],
        multiplierOrRate: 4.0,
        rateType: 'cashback_percent',
        description: '4% Unlimited Cashback on Swiggy, Uber, and PVR',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded.' },
      { category: 'rent_wallet', reason: 'Rent & wallet loads excluded.' },
    ],
    sourceDoc: {
      title: 'Flipkart Axis Bank Credit Card Policy Guide',
      url: 'https://www.axisbank.com/retail/cards/credit-card/flipkart-axis-bank-credit-card',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/flipkart_axis.jpg',
    visual: {
      gradient: 'from-[#1E3A8A] via-[#1E40AF] to-[#172554]',
      textColor: 'text-white',
      accentColor: '#FBBF24',
      borderStroke: 'border-blue-400/40',
      finish: 'matte',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/flipkart_axis.jpg',
    },
  },

  // ==========================================
  // --- SBI CARD ---
  // ==========================================
  {
    id: 'sbi_cashback',
    name: 'SBI Cashback Card',
    bankId: 'sbi',
    bankName: 'SBI Card',
    category: 'cashback',
    annualFee: 999,
    annualFeeWaiverSpend: 200000,
    forexMarkupPercent: 3.5,
    loungeAccess: 'None (pure cashback focus)',
    rewardType: 'cashback',
    pointValueInInr: 1.0,
    pointCurrencyName: 'Direct Cashback ₹',
    baseRateDescription: '1% flat cashback on all offline spends & utility transactions',
    baseRewardCalculation: {
      cashbackPercent: 1.0,
    },
    acceleratedRules: [
      {
        categories: ['online_shopping', 'travel_flights', 'travel_hotels', 'dining_food', 'grocery_supermarket', 'electronics', 'entertainment_movies'],
        transactionType: 'online',
        multiplierOrRate: 5.0,
        rateType: 'cashback_percent',
        capPerMonth: 5000, // ₹5,000 monthly cap
        description: '5% Flat Cashback on virtually ALL online shopping transactions',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel surcharge waiver 1% (₹500-₹3000 spend); no cashback awarded.' },
      { category: 'rent_wallet', reason: 'Rent, wallet loading, educational fees, and jewelry transactions excluded from 5% rate.' },
    ],
    monthlyCapInr: 5000,
    milestones: [
      { spendRequirement: 200000, bonusPointsOrVoucher: 'Annual fee waiver on ₹2 Lakhs annual spend', monetaryValue: 999 },
    ],
    sourceDoc: {
      title: 'Cashback SBI Card Cardholder Agreement & Exclusions',
      url: 'https://www.sbicard.com/en/personal/credit-cards/rewards/cashback-sbi-card.page',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 1.0,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/sbi_cashback.jpg',
    visual: {
      gradient: 'from-[#0C4A6E] via-[#0284C7] to-[#075985]',
      textColor: 'text-white',
      accentColor: '#38BDF8',
      borderStroke: 'border-sky-400/40',
      finish: 'sapphire',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/sbi_cashback.jpg',
    },
  },

  {
    id: 'sbi_simplyclick',
    name: 'SBI SimplyCLICK Card',
    bankId: 'sbi',
    bankName: 'SBI Card',
    category: 'shopping',
    annualFee: 499,
    annualFeeWaiverSpend: 100000,
    forexMarkupPercent: 3.5,
    loungeAccess: 'None',
    rewardType: 'reward_points',
    pointValueInInr: 0.25,
    pointCurrencyName: 'SBI Reward Points',
    baseRateDescription: '1 Reward Point per ₹100 offline (0.25% return), 5X on other online (1.25%)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 1, amount: 100 },
    },
    acceleratedRules: [
      {
        merchants: ['amazon', 'bookmyshow', 'cleartrip', 'lenskart', 'netmeds'],
        categories: ['online_shopping', 'travel_flights', 'entertainment_movies'],
        multiplierOrRate: 10, // 10X points = 2.5% return
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 10, amount: 100 },
        description: '10X Reward Points (2.5% return) on Amazon, BookMyShow, Cleartrip, Lenskart, Netmeds',
      },
      {
        transactionType: 'online',
        multiplierOrRate: 5, // 5X points = 1.25% return
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 5, amount: 100 },
        description: '5X Reward Points (1.25% return) on all other online spends',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded.' },
      { category: 'rent_wallet', reason: 'Rent & wallet loads excluded.' },
    ],
    milestones: [
      { spendRequirement: 100000, bonusPointsOrVoucher: '₹2,000 Cleartrip e-voucher at ₹1L annual spend', monetaryValue: 2000 },
      { spendRequirement: 200000, bonusPointsOrVoucher: 'Additional ₹2,000 Cleartrip e-voucher at ₹2L spend', monetaryValue: 2000 },
    ],
    sourceDoc: {
      title: 'SBI SimplyCLICK Feature Sheet',
      url: 'https://www.sbicard.com/en/personal/credit-cards/shopping/simplyclick-sbi-card.page',
      effectiveDate: '2026-07-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/sbi_simplyclick.jpg',
    visual: {
      gradient: 'from-[#0369A1] via-[#0284C7] to-[#0C4A6E]',
      textColor: 'text-white',
      accentColor: '#38BDF8',
      borderStroke: 'border-sky-400/30',
      finish: 'matte',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/sbi_simplyclick.jpg',
    },
  },

  // ==========================================
  // --- AMERICAN EXPRESS ---
  // ==========================================
  {
    id: 'amex_plat_travel',
    name: 'American Express Platinum Travel',
    bankId: 'amex',
    bankName: 'American Express',
    category: 'travel_miles',
    annualFee: 5000,
    annualFeeWaiverSpend: 400000,
    forexMarkupPercent: 3.5,
    loungeAccess: '8 Complimentary Domestic Airport Lounge Visits/year',
    rewardType: 'membership_rewards',
    pointValueInInr: 0.50, // 1 MR Point = ₹0.50 Taj voucher / Marriott transfer
    pointCurrencyName: 'Membership Rewards Points',
    baseRateDescription: '1 MR Point per ₹50 spend (1.0% return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 1, amount: 50 },
    },
    acceleratedRules: [
      {
        merchants: ['taj_hotels'],
        categories: ['travel_hotels'],
        multiplierOrRate: 3,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 3, amount: 50 },
        description: '3X MR Points on Taj, SeleQtions & Vivanta bookings',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel transactions excluded.' },
      { category: 'utilities_bills', reason: 'Utilities earn points, but excluded from milestone calculation.' },
      { category: 'rent_wallet', reason: 'Wallet loading strictly excluded.' },
    ],
    milestones: [
      { spendRequirement: 190000, bonusPointsOrVoucher: '15,000 Bonus MR Points (₹7,500 value)', monetaryValue: 7500 },
      { spendRequirement: 400000, bonusPointsOrVoucher: '25,000 Bonus MR Points + ₹10,000 Taj Voucher (Total ~₹22,500 value back)', monetaryValue: 22500 },
    ],
    sourceDoc: {
      title: 'American Express Platinum Travel Card Milestone Chart & Point Conversion',
      url: 'https://www.americanexpress.com/in/credit-cards/platinum-travel-credit-card/',
      effectiveDate: '2026-09-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/amex_plat_travel.jpg',
    visual: {
      gradient: 'from-[#334155] via-[#475569] to-[#1E293B]',
      textColor: 'text-slate-100',
      accentColor: '#CBD5E1',
      borderStroke: 'border-slate-300/40',
      finish: 'titanium',
      chipColor: 'silver',
      network: 'amex',
      cardArtUrl: '/assets/cards/amex_plat_travel.jpg',
    },
  },

  // ==========================================
  // --- HSBC INDIA ---
  // ==========================================
  {
    id: 'hsbc_live_plus',
    name: 'HSBC Live+ Credit Card',
    bankId: 'hsbc',
    bankName: 'HSBC India',
    category: 'cashback',
    annualFee: 999,
    annualFeeWaiverSpend: 200000,
    forexMarkupPercent: 3.5,
    loungeAccess: '4 Complimentary Domestic Airport Lounge Visits per year',
    rewardType: 'cashback',
    pointValueInInr: 1.0,
    pointCurrencyName: 'Direct Cashback ₹',
    baseRateDescription: '1.5% unlimited flat cashback on all retail transactions',
    baseRewardCalculation: {
      cashbackPercent: 1.5,
    },
    acceleratedRules: [
      {
        merchants: ['swiggy', 'zomato', 'blinkit', 'instamart', 'zepto', 'bigbasket'],
        categories: ['dining_food', 'grocery_supermarket'],
        multiplierOrRate: 10.0,
        rateType: 'cashback_percent',
        capPerMonth: 1000, // ₹1,000 cap per month
        description: '10% Accelerated Cashback on Dining, Food Delivery, and Groceries (up to ₹1,000/month)',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded; 1% surcharge waiver.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    milestones: [
      { spendRequirement: 200000, bonusPointsOrVoucher: 'Annual fee waiver on ₹2 Lakhs spend', monetaryValue: 999 },
    ],
    sourceDoc: {
      title: 'HSBC Live+ Credit Card Benefits & CashBack Schedule',
      url: 'https://www.hsbc.co.in/credit-cards/products/live-plus/',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-06',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/hsbc_live_plus.jpg',
    visual: {
      gradient: 'from-[#0F172A] via-[#1E293B] to-[#991B1B]',
      textColor: 'text-white',
      accentColor: '#EF4444',
      borderStroke: 'border-red-500/40',
      finish: 'matte',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/hsbc_live_plus.jpg',
    },
  },

  // ==========================================
  // --- FEDERAL BANK / SCAPIA ---
  // ==========================================
  {
    id: 'scapia_federal',
    name: 'Scapia Federal Credit Card',
    bankId: 'federal',
    bankName: 'Federal Bank',
    category: 'travel_miles',
    annualFee: 0, // Lifetime Free!
    forexMarkupPercent: 0.0, // ZERO FOREX MARKUP!
    loungeAccess: 'Unlimited Domestic Airport Lounge Visits on ₹5,000 monthly spend',
    rewardType: 'reward_points',
    pointValueInInr: 0.20, // 5 Scapia Coins = ₹1 on flight/hotel booking
    pointCurrencyName: 'Scapia Coins',
    baseRateDescription: '10% Scapia Coins on all retail spends (2.0% travel return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 10, amount: 100 },
    },
    acceleratedRules: [
      {
        categories: ['travel_flights', 'travel_hotels'],
        multiplierOrRate: 2, // 20% Scapia Coins = 4% travel return
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 20, amount: 100 },
        description: '20% Scapia Coins (4% return) on all Travel Bookings made via Scapia App',
      },
      {
        categories: ['international_forex'],
        multiplierOrRate: 1,
        rateType: 'cashback_percent',
        description: '0% Zero Forex Markup fee on all international payments worldwide',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    sourceDoc: {
      title: 'Scapia Federal Credit Card Zero Forex & Coin Redemption Rules',
      url: 'https://www.scapia.cards/',
      effectiveDate: '2026-09-01',
      lastVerifiedDate: '2026-11-06',
      confidence: 1.0,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/scapia_federal.jpg',
    visual: {
      gradient: 'from-[#064E3B] via-[#0D9488] to-[#115E59]',
      textColor: 'text-teal-100',
      accentColor: '#2DD4BF',
      borderStroke: 'border-teal-400/40',
      finish: 'matte',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/scapia_federal.jpg',
    },
  },

  // ==========================================
  // --- IDFC FIRST BANK ---
  // ==========================================
  {
    id: 'idfc_wealth',
    name: 'IDFC FIRST Wealth',
    bankId: 'idfc',
    bankName: 'IDFC FIRST Bank',
    category: 'super_premium',
    annualFee: 0, // Lifetime Free!
    forexMarkupPercent: 1.5,
    loungeAccess: '4 Complimentary Domestic Airport Lounge Visits + 4 Railway Lounge Visits/quarter',
    rewardType: 'reward_points',
    pointValueInInr: 0.25,
    pointCurrencyName: 'FIRST Reward Points',
    baseRateDescription: '3X points on offline spends up to ₹30,000/mo (0.75% return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 3, amount: 100 },
    },
    acceleratedRules: [
      {
        transactionType: 'online',
        multiplierOrRate: 6.0,
        rateType: 'points_per_amount',
        pointsPerAmount: { points: 6, amount: 100 },
        description: '6X Reward Points (1.5% return) on all online spends up to ₹30,000/month',
      },
      {
        multiplierOrRate: 10.0,
        rateType: 'points_per_amount',
        pointsPerAmount: { points: 10, amount: 100 },
        description: '10X Reward Points (2.5% return) on incremental monthly spends exceeding ₹30,000',
      },
      {
        merchants: ['bookmyshow'],
        categories: ['entertainment_movies'],
        multiplierOrRate: 50.0,
        rateType: 'cashback_percent',
        capPerMonth: 500,
        description: 'Buy 1 Get 1 Free Movie Ticket on Paytm/BookMyShow up to ₹500 discount twice a month',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel surcharge waiver 1%; fuel excluded from reward points.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded from 10X acceleration.' },
    ],
    sourceDoc: {
      title: 'IDFC FIRST Wealth Credit Card Reward Policy & Forever Points Handbook',
      url: 'https://www.idfcfirstbank.com/credit-card/wealth',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/idfc_wealth.jpg',
    visual: {
      gradient: 'from-[#0F172A] via-[#1E293B] to-[#0A0E17]',
      textColor: 'text-slate-100',
      accentColor: '#94A3B8',
      borderStroke: 'border-slate-400/30',
      finish: 'titanium',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/idfc_wealth.jpg',
    },
  },

  // ==========================================
  // --- STANDARD CHARTERED BANK ---
  // ==========================================
  {
    id: 'sc_ultimate',
    name: 'Standard Chartered Ultimate',
    bankId: 'standard_chartered',
    bankName: 'Standard Chartered',
    category: 'super_premium',
    annualFee: 5000,
    forexMarkupPercent: 2.0,
    loungeAccess: '4 Domestic Lounge Visits/quarter + Unlimited International via Priority Pass',
    rewardType: 'reward_points',
    pointValueInInr: 1.0,
    pointCurrencyName: 'Ultimate Reward Points',
    baseRateDescription: '5 Reward Points per ₹150 (3.33% return across all spends)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 5, amount: 150 },
    },
    acceleratedRules: [
      {
        categories: ['dining_food', 'utilities_bills', 'online_shopping', 'travel_flights', 'travel_hotels', 'grocery_supermarket'],
        multiplierOrRate: 3.33,
        rateType: 'cashback_percent',
        description: 'Flat 3.33% reward rate on virtually every retail category without standard merchant exclusions',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded; 1% surcharge waiver applicable.' },
      { category: 'rent_wallet', reason: 'Rent payments excluded.' },
    ],
    sourceDoc: {
      title: 'Standard Chartered Ultimate Credit Card Product Manual',
      url: 'https://www.sc.com/in/credit-cards/ultimate-card/',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/sc_ultimate.jpg',
    visual: {
      gradient: 'from-[#1E1B4B] via-[#0F172A] to-[#020617]',
      textColor: 'text-slate-100',
      accentColor: '#38BDF8',
      borderStroke: 'border-slate-500/40',
      finish: 'titanium',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/sc_ultimate.jpg',
    },
  },

  // ==========================================
  // --- INDUSIND BANK ---
  // ==========================================
  {
    id: 'indusind_eazydiner',
    name: 'EazyDiner IndusInd Card',
    bankId: 'indusind',
    bankName: 'IndusInd Bank',
    category: 'lifestyle_rewards',
    annualFee: 1999,
    forexMarkupPercent: 3.5,
    loungeAccess: '2 Domestic Lounge Visits per calendar quarter',
    rewardType: 'reward_points',
    pointValueInInr: 0.40,
    pointCurrencyName: 'EazyPoints',
    baseRateDescription: '3 Reward Points per ₹100 on general retail spends',
    baseRewardCalculation: {
      pointsPerAmount: { points: 3, amount: 100 },
    },
    acceleratedRules: [
      {
        merchants: ['eazydiner'],
        categories: ['dining_food'],
        multiplierOrRate: 25.0,
        rateType: 'cashback_percent',
        capPerMonth: 1000,
        description: 'Extra 25% instant discount up to ₹1,000 on dining via PayEazy on EazyDiner',
      },
      {
        categories: ['dining_food', 'entertainment_movies'],
        multiplierOrRate: 10,
        rateType: 'points_per_amount',
        pointsPerAmount: { points: 10, amount: 100 },
        description: '10 Reward Points per ₹100 on Dining & Entertainment',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    sourceDoc: {
      title: 'EazyDiner IndusInd Credit Card Guide',
      url: 'https://www.indusind.com/in/en/personal/cards/credit-cards/eazydiner-credit-card.html',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/indusind_eazydiner.jpg',
    visual: {
      gradient: 'from-[#431407] via-[#7C2D12] to-[#271005]',
      textColor: 'text-amber-100',
      accentColor: '#F59E0B',
      borderStroke: 'border-amber-500/40',
      finish: 'champagne',
      chipColor: 'gold',
      network: 'visa',
      cardArtUrl: '/assets/cards/indusind_eazydiner.jpg',
    },
  },

  // ==========================================
  // --- KOTAK MAHINDRA BANK ---
  // ==========================================
  {
    id: 'kotak_white_reserve',
    name: 'Kotak White Reserve Metal',
    bankId: 'kotak',
    bankName: 'Kotak Mahindra',
    category: 'super_premium',
    annualFee: 12500,
    annualFeeWaiverSpend: 1000000,
    forexMarkupPercent: 1.5,
    loungeAccess: 'Unlimited International & Domestic Airport Lounges with 2 guest passes',
    rewardType: 'reward_points',
    pointValueInInr: 1.0,
    pointCurrencyName: 'White Pass Value ₹',
    baseRateDescription: 'Milestone-based White Pass currency (up to 2.5% return on luxury)',
    baseRewardCalculation: {
      cashbackPercent: 1.5,
    },
    acceleratedRules: [
      {
        categories: ['international_forex', 'travel_flights', 'travel_hotels', 'online_shopping'],
        multiplierOrRate: 2.5,
        rateType: 'cashback_percent',
        description: 'Up to ₹2,50,000 White Pass redemption value on premium luxury brands and flights',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded.' },
      { category: 'rent_wallet', reason: 'Rent & wallet loads excluded.' },
    ],
    milestones: [
      { spendRequirement: 600000, bonusPointsOrVoucher: '₹18,000 White Pass voucher', monetaryValue: 18000 },
      { spendRequirement: 1200000, bonusPointsOrVoucher: 'Additional ₹36,000 White Pass voucher', monetaryValue: 36000 },
      { spendRequirement: 2500000, bonusPointsOrVoucher: 'Additional ₹75,000 White Pass voucher', monetaryValue: 75000 },
    ],
    sourceDoc: {
      title: 'Kotak White Reserve Metal Card Overview',
      url: 'https://www.kotak.com/en/personal-banking/cards/credit-cards/white-reserve-credit-card.html',
      effectiveDate: '2026-07-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/kotak_white_reserve.jpg',
    visual: {
      gradient: 'from-[#F8FAFC] via-[#E2E8F0] to-[#CBD5E1]',
      textColor: 'text-slate-900',
      accentColor: '#475569',
      borderStroke: 'border-slate-300',
      finish: 'titanium',
      chipColor: 'silver',
      network: 'visa',
      cardArtUrl: '/assets/cards/kotak_white_reserve.jpg',
    },
  },

  // ==========================================
  // --- AU SMALL FINANCE BANK ---
  // ==========================================
  {
    id: 'au_zenith_plus',
    name: 'AU Zenith+ Metal Card',
    bankId: 'au',
    bankName: 'AU Small Finance',
    category: 'super_premium',
    annualFee: 4999,
    annualFeeWaiverSpend: 800000,
    forexMarkupPercent: 0.99, // Super low forex!
    loungeAccess: '16 Complimentary Domestic & 16 International Airport Lounge Visits/year',
    rewardType: 'reward_points',
    pointValueInInr: 0.25,
    pointCurrencyName: 'AU Reward Points',
    baseRateDescription: '2 Reward Points per ₹100 retail spends (0.5% return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 2, amount: 100 },
    },
    acceleratedRules: [
      {
        categories: ['travel_flights', 'travel_hotels', 'dining_food'],
        multiplierOrRate: 5,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 10, amount: 100 },
        description: '10 Reward Points per ₹100 (2.5% return) on Dining, Flights & Hotels',
      },
      {
        merchants: ['bookmyshow'],
        categories: ['entertainment_movies'],
        multiplierOrRate: 50.0,
        rateType: 'cashback_percent',
        capPerMonth: 1000,
        description: 'Buy 1 Get 1 Free Movie Tickets on BookMyShow up to ₹500 discount (twice a month)',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    milestones: [
      { spendRequirement: 800000, bonusPointsOrVoucher: 'Annual fee waiver + 5,000 bonus reward points', monetaryValue: 6250 },
    ],
    sourceDoc: {
      title: 'AU Zenith+ Metal Credit Card Brochure',
      url: 'https://www.aubank.in/personal-banking/credit-cards/zenith-plus-credit-card',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/au_zenith_plus.jpg',
    visual: {
      gradient: 'from-[#18181B] via-[#27272A] to-[#09090B]',
      textColor: 'text-zinc-100',
      accentColor: '#A1A1AA',
      borderStroke: 'border-zinc-500/40',
      finish: 'titanium',
      chipColor: 'gold',
      network: 'visa',
      cardArtUrl: '/assets/cards/au_zenith_plus.jpg',
    },
  },

  // ==========================================
  // --- RBL BANK ---
  // ==========================================
  {
    id: 'rbl_world_safari',
    name: 'RBL World Safari (0% Forex)',
    bankId: 'rbl',
    bankName: 'RBL Bank',
    category: 'travel_miles',
    annualFee: 3000,
    forexMarkupPercent: 0.0, // ZERO FOREX!
    loungeAccess: '2 Domestic Lounge Visits/quarter + 2 International via Priority Pass',
    rewardType: 'reward_points',
    pointValueInInr: 0.25,
    pointCurrencyName: 'Travel Points',
    baseRateDescription: '2 Travel Points per ₹100 domestic spends (0.5% return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 2, amount: 100 },
    },
    acceleratedRules: [
      {
        categories: ['travel_flights', 'travel_hotels'],
        multiplierOrRate: 5,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 5, amount: 100 },
        description: '5 Travel Points per ₹100 (1.25% return) on Travel Spends',
      },
      {
        categories: ['international_forex'],
        multiplierOrRate: 1,
        rateType: 'cashback_percent',
        description: '0% Zero Foreign Currency Markup on all international transactions worldwide',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel excluded.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    milestones: [
      { spendRequirement: 250000, bonusPointsOrVoucher: '10,000 Bonus Travel Points (₹2,500 value)', monetaryValue: 2500 },
      { spendRequirement: 500000, bonusPointsOrVoucher: '15,000 Bonus Travel Points (₹3,750 value)', monetaryValue: 3750 },
    ],
    sourceDoc: {
      title: 'RBL World Safari Card Product Sheet',
      url: 'https://www.rblbank.com/product/credit-cards/world-safari-credit-card',
      effectiveDate: '2026-07-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/rbl_world_safari.jpg',
    visual: {
      gradient: 'from-[#0C4A6E] via-[#075985] to-[#082F49]',
      textColor: 'text-sky-100',
      accentColor: '#38BDF8',
      borderStroke: 'border-sky-400/40',
      finish: 'sapphire',
      chipColor: 'silver',
      network: 'mastercard',
      cardArtUrl: '/assets/cards/rbl_world_safari.jpg',
    },
  },

  // ==========================================
  // --- YES BANK ---
  // ==========================================
  {
    id: 'yes_marquee',
    name: 'YES Marquee Metal',
    bankId: 'yes',
    bankName: 'YES Bank',
    category: 'super_premium',
    annualFee: 9999,
    annualFeeWaiverSpend: 1000000,
    forexMarkupPercent: 1.0, // Low forex 1%
    loungeAccess: 'Unlimited International & Domestic Airport Lounges with guest access',
    rewardType: 'reward_points',
    pointValueInInr: 0.25,
    pointCurrencyName: 'YES Reward Points',
    baseRateDescription: '18 Reward Points per ₹200 online (2.25%), 9 RP offline (1.12%)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 9, amount: 200 },
    },
    acceleratedRules: [
      {
        transactionType: 'online',
        multiplierOrRate: 2,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 18, amount: 200 },
        description: '18 Reward Points per ₹200 (2.25% return) on all online shopping',
      },
      {
        merchants: ['bookmyshow'],
        categories: ['entertainment_movies'],
        multiplierOrRate: 100.0,
        rateType: 'cashback_percent',
        capPerMonth: 800,
        description: 'Buy 1 Get 1 Free on BookMyShow up to ₹800 discount per month',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel surcharge waiver 1%.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    milestones: [
      { spendRequirement: 1000000, bonusPointsOrVoucher: 'Annual fee waiver on ₹10 Lakhs annual spend', monetaryValue: 9999 },
    ],
    sourceDoc: {
      title: 'YES Marquee Credit Card Benefits Guide',
      url: 'https://www.yesbank.in/personal-banking/cards/credit-cards/yes-marquee',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    imageUrl: '/assets/cards/yes_marquee.jpg',
    visual: {
      gradient: 'from-[#09090B] via-[#18181B] to-[#27272A]',
      textColor: 'text-zinc-100',
      accentColor: '#D4AF37',
      borderStroke: 'border-amber-400/30',
      finish: 'titanium',
      chipColor: 'gold',
      network: 'mastercard',
      cardArtUrl: '/assets/cards/yes_marquee.jpg',
    },
  },
];
