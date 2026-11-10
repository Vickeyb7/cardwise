import { CreditCard } from '../types.ts';

export const INDIAN_CREDIT_CARDS: CreditCard[] = [
  // --- HDFC BANK ---
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
        capPerMonth: 10000, // 10,000 bonus points cap/month
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
    visual: {
      gradient: 'from-[#0B0F19] via-[#1E293B] to-[#0A0D14]',
      textColor: 'text-white',
      accentColor: '#D4AF37', // Gold trim
      borderStroke: 'border-amber-400/30',
      finish: 'titanium',
      chipColor: 'gold',
      network: 'visa',
    },
  },

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
    pointValueInInr: 1.0, // Direct statement credit
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
      { category: 'rent_wallet', reason: 'Rent, wallet uploads, school/education fees, and jewelry excluded from 5% cashback.' },
    ],
    monthlyCapInr: 5000,
    sourceDoc: {
      title: 'SBI Cashback Card Official Schedule of Benefits & Exclusions',
      url: 'https://www.sbicard.com/en/personal/credit-cards/rewards/cashback-sbi-card.page',
      effectiveDate: '2026-07-01',
      lastVerifiedDate: '2026-11-06',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#002B49] via-[#005A9C] to-[#0088CC]',
      textColor: 'text-white',
      accentColor: '#4EDE23', // Vibrant green
      borderStroke: 'border-cyan-400/40',
      finish: 'sapphire',
      chipColor: 'silver',
      network: 'visa',
    },
  },

  {
    id: 'axis_atlas',
    name: 'Axis Bank Atlas',
    bankId: 'axis',
    bankName: 'Axis Bank',
    category: 'travel_miles',
    annualFee: 5000,
    annualFeeWaiverSpend: 1500000,
    forexMarkupPercent: 3.5,
    loungeAccess: 'Up to 18 Domestic Lounge Visits + 12 International Visits/year (Tier-based)',
    rewardType: 'edge_miles',
    pointValueInInr: 1.8, // 1 EDGE Mile = 2 Partner Miles/Accor Points (approx ₹1.80-₹2.00 value)
    pointCurrencyName: 'EDGE Miles',
    baseRateDescription: '2 EDGE Miles per ₹100 spent (effective ~3.6% travel yield)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 2, amount: 100 },
    },
    acceleratedRules: [
      {
        merchants: ['indigo', 'makemytrip', 'cleartrip', 'taj_hotels'],
        categories: ['travel_flights', 'travel_hotels'],
        multiplierOrRate: 5, // 5 EDGE Miles per ₹100 = 10 Partner Points = ~9.0% value!
        rateType: 'points_per_amount',
        pointsPerAmount: { points: 5, amount: 100 },
        capPerMonth: 10000,
        description: '5 EDGE Miles per ₹100 (effective 9.0% return) on direct airline & hotel spends',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel transactions excluded from miles accrual.' },
      { category: 'rent_wallet', reason: 'Rent, wallet load, insurance, and government payments do not earn EDGE Miles.' },
    ],
    milestones: [
      { spendRequirement: 300000, bonusPointsOrVoucher: 'Gold Tier Upgrade + 2,500 Bonus EDGE Miles', monetaryValue: 4500 },
      { spendRequirement: 750000, bonusPointsOrVoucher: 'Platinum Tier Upgrade + 5,000 Bonus EDGE Miles', monetaryValue: 9000 },
      { spendRequirement: 1500000, bonusPointsOrVoucher: '10,000 Bonus EDGE Miles + Renewal Fee Waiver', monetaryValue: 18000 },
    ],
    sourceDoc: {
      title: 'Axis Atlas Credit Card Program Guide & Partner Transfer Ratio 1:2',
      url: 'https://www.axisbank.com/retail/cards/credit-card/atlas-credit-card',
      effectiveDate: '2026-08-15',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#1A1A1A] via-[#2D2D2D] to-[#121212]',
      textColor: 'text-amber-100',
      accentColor: '#C5A059', // Champagne Gold
      borderStroke: 'border-amber-400/30',
      finish: 'champagne',
      chipColor: 'gold',
      network: 'mastercard',
    },
  },

  {
    id: 'amazon_pay_icici',
    name: 'Amazon Pay ICICI Card',
    bankId: 'icici',
    bankName: 'ICICI Bank',
    category: 'cashback',
    annualFee: 0, // Lifetime Free!
    forexMarkupPercent: 3.5,
    loungeAccess: 'None (Lifetime Free utility card)',
    rewardType: 'cashback',
    pointValueInInr: 1.0, // 1 Cashback point = ₹1 directly credited to Amazon Pay balance
    pointCurrencyName: 'Amazon Pay Cashback ₹',
    baseRateDescription: '1% flat unlimited cashback on all retail & utility spends',
    baseRewardCalculation: {
      cashbackPercent: 1.0,
    },
    acceleratedRules: [
      {
        merchants: ['amazon'],
        categories: ['online_shopping', 'grocery_supermarket'],
        multiplierOrRate: 5.0, // 5% for Prime members
        rateType: 'cashback_percent',
        description: '5% Unlimited Cashback on Amazon India for Prime members (3% for non-Prime)',
      },
      {
        merchants: ['swiggy', 'zomato', 'uber', 'bookmyshow', 'cleartrip'],
        categories: ['dining_food', 'entertainment_movies'],
        multiplierOrRate: 2.0,
        rateType: 'cashback_percent',
        description: '2% Unlimited Cashback on 100+ Amazon Pay partner merchants',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel surcharge waiver 1%; fuel transactions earn no cashback.' },
      { category: 'rent_wallet', reason: 'Rent payments and wallet loading are excluded from cashback.' },
    ],
    sourceDoc: {
      title: 'Amazon Pay ICICI Bank Credit Card Terms of Benefit',
      url: 'https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay-credit-card',
      effectiveDate: '2026-06-01',
      lastVerifiedDate: '2026-11-03',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#131921] via-[#232F3E] to-[#141A22]',
      textColor: 'text-white',
      accentColor: '#FF9900', // Amazon Orange
      borderStroke: 'border-orange-400/40',
      finish: 'obsidian',
      chipColor: 'gold',
      network: 'visa',
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
    loungeAccess: '12 Domestic Airport Lounge Visits + 6 International Priority Pass Visits',
    rewardType: 'reward_points',
    pointValueInInr: 0.5, // 1 RP = ₹0.50 on SmartBuy flights
    pointCurrencyName: 'Reward Points',
    baseRateDescription: '4 Reward Points per ₹150 (approx 1.33% base return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 4, amount: 150 },
    },
    acceleratedRules: [
      {
        merchants: ['myntra', 'nykaa', 'croma'],
        categories: ['online_shopping', 'electronics'],
        multiplierOrRate: 5, // 5X = 20 points per 150 = ~6.67% return
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 20, amount: 150 },
        capPerMonth: 5000,
        description: '5X Reward Points (~6.67% return) on Myntra, Nykaa, Marks & Spencer, and Reliance Digital',
      },
      {
        merchants: ['makemytrip', 'cleartrip', 'indigo'],
        categories: ['travel_flights'],
        multiplierOrRate: 5,
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 20, amount: 150 },
        capPerMonth: 4000,
        description: '5X Reward Points on Flight Bookings via SmartBuy',
        channel: 'smartbuy',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel transactions excluded from rewards.' },
      { category: 'rent_wallet', reason: 'Rent, property management, and wallet reloads excluded.' },
    ],
    milestones: [
      { spendRequirement: 150000, bonusPointsOrVoucher: '₹1,500 Brand Voucher (Marks & Spencer / Myntra / Marriott) every quarter', monetaryValue: 6000 },
      { spendRequirement: 500000, bonusPointsOrVoucher: '₹5,000 Flight Voucher on annual spend of ₹5 Lakh', monetaryValue: 5000 },
    ],
    sourceDoc: {
      title: 'HDFC Regalia Gold Comprehensive Benefit Schedule',
      url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-gold-credit-card',
      effectiveDate: '2026-09-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#2A2315] via-[#4A3B1F] to-[#1E170C]',
      textColor: 'text-amber-100',
      accentColor: '#D97706',
      borderStroke: 'border-amber-400/40',
      finish: 'champagne',
      chipColor: 'gold',
      network: 'visa',
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
    loungeAccess: '1 Domestic Lounge Visit per calendar quarter on spending ₹1 Lakh in preceding quarter',
    rewardType: 'cashback',
    pointValueInInr: 1.0, // 1 CashPoint = ₹1 statement cash
    pointCurrencyName: 'CashPoints',
    baseRateDescription: '1% flat CashPoint on all retail transactions and EMI',
    baseRewardCalculation: {
      cashbackPercent: 1.0,
    },
    acceleratedRules: [
      {
        merchants: ['amazon', 'flipkart', 'swiggy', 'zomato', 'bookmyshow', 'myntra', 'tatacliq', 'uber', 'cultfit'],
        categories: ['online_shopping', 'dining_food', 'entertainment_movies'],
        multiplierOrRate: 5.0,
        rateType: 'cashback_percent',
        capPerMonth: 1000, // ₹1,000 monthly cap
        description: '5% CashPoints on Amazon, Flipkart, Swiggy, Zomato, BookMyShow, Cult.fit, Myntra, Tata CLiQ, Uber',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel transactions excluded.' },
      { category: 'rent_wallet', reason: 'Rent, wallet loads, and government utility payments excluded.' },
    ],
    monthlyCapInr: 1000,
    sourceDoc: {
      title: 'HDFC Millennia Credit Card CashPoints Program Rules',
      url: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/millennia-credit-card',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#0F172A] via-[#1E293B] to-[#334155]',
      textColor: 'text-white',
      accentColor: '#38BDF8',
      borderStroke: 'border-sky-400/30',
      finish: 'matte',
      chipColor: 'silver',
      network: 'mastercard',
    },
  },

  {
    id: 'amex_plat_travel',
    name: 'American Express Platinum Travel',
    bankId: 'amex',
    bankName: 'American Express',
    category: 'travel_miles',
    annualFee: 5000,
    annualFeeWaiverSpend: 0,
    forexMarkupPercent: 3.5,
    loungeAccess: '8 Complimentary Domestic Lounge Visits per year (2 per quarter)',
    rewardType: 'membership_rewards',
    pointValueInInr: 0.5, // 1 MR Point = approx ₹0.50 via Taj/Marriott transfer
    pointCurrencyName: 'Membership Rewards Points',
    baseRateDescription: '1 MR point per ₹50 spent (~1.0% return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 1, amount: 50 },
    },
    acceleratedRules: [
      {
        merchants: ['amazon', 'flipkart', 'makemytrip', 'myntra', 'nykaa', 'apple'],
        categories: ['online_shopping', 'travel_flights', 'electronics'],
        multiplierOrRate: 3, // 3X on Amex Reward Multiplier portal
        rateType: 'point_multiplier',
        pointsPerAmount: { points: 3, amount: 50 },
        capPerMonth: 25000,
        description: '3X MR Points on online brands via Amex Reward Multiplier Portal',
        channel: 'reward_multiplier',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel spends earn no points (0% surcharge at HPCL).' },
      { category: 'utilities_bills', reason: 'Insurance and utility payments capped at base rate.' },
      { category: 'rent_wallet', reason: 'Rent transactions and wallet loading excluded from milestone tracking.' },
    ],
    milestones: [
      { spendRequirement: 190000, bonusPointsOrVoucher: '15,000 Bonus MR Points + ₹4,000 Taj Stay Voucher', monetaryValue: 11500 },
      { spendRequirement: 400000, bonusPointsOrVoucher: '25,000 Bonus MR Points + ₹10,000 Taj Stay Voucher (Total ₹32,000+ Net Benefit)', monetaryValue: 22500 },
    ],
    sourceDoc: {
      title: 'American Express Platinum Travel Card Milestone & Rewards Charter',
      url: 'https://www.americanexpress.com/in/credit-cards/platinum-travel-credit-card/',
      effectiveDate: '2026-07-01',
      lastVerifiedDate: '2026-11-06',
      confidence: 0.99,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#475569] via-[#94A3B8] to-[#CBD5E1]',
      textColor: 'text-slate-900',
      accentColor: '#0284C7',
      borderStroke: 'border-slate-300',
      finish: 'titanium',
      chipColor: 'gold',
      network: 'amex',
    },
  },

  {
    id: 'tata_neu_infinity',
    name: 'Tata Neu Infinity HDFC',
    bankId: 'hdfc',
    bankName: 'HDFC Bank',
    category: 'cashback',
    annualFee: 1499,
    annualFeeWaiverSpend: 300000,
    forexMarkupPercent: 2.0,
    loungeAccess: '8 Domestic Lounge Visits per year (2 per quarter) + 4 International Visits',
    rewardType: 'cashback',
    pointValueInInr: 1.0, // 1 NeuCoin = ₹1 across Tata brands
    pointCurrencyName: 'NeuCoins',
    baseRateDescription: '1.5% NeuCoins on non-Tata retail spends & UPI transactions via RuPay',
    baseRewardCalculation: {
      cashbackPercent: 1.5,
    },
    acceleratedRules: [
      {
        merchants: ['tatacliq', 'bigbasket', 'croma', 'taj_hotels', 'apollo'],
        categories: ['online_shopping', 'grocery_supermarket', 'electronics', 'travel_hotels'],
        multiplierOrRate: 10.0, // 5% NeuCoins on card + 5% with NeuPass = 10%
        rateType: 'cashback_percent',
        description: '10% NeuCoins (5% on Card + 5% NeuPass) across Tata Neu brands: BigBasket, Croma, 1mg, Air India, Taj, Tata CLiQ',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel surcharge waiver 1%; fuel excluded from NeuCoins.' },
      { category: 'rent_wallet', reason: 'Rent payments and wallet loads excluded.' },
    ],
    sourceDoc: {
      title: 'Tata Neu Infinity Credit Card Terms and NeuPass Loyalty Charter',
      url: 'https://www.tataneu.com/credit-card',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-05',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#2D1B69] via-[#432087] to-[#160B36]',
      textColor: 'text-purple-100',
      accentColor: '#A855F7',
      borderStroke: 'border-purple-400/40',
      finish: 'emerald',
      chipColor: 'silver',
      network: 'rupay',
    },
  },

  {
    id: 'sc_ultimate',
    name: 'Standard Chartered Ultimate',
    bankId: 'standard_chartered',
    bankName: 'Standard Chartered',
    category: 'super_premium',
    annualFee: 5000,
    annualFeeWaiverSpend: 0,
    forexMarkupPercent: 2.0, // Lower 2% forex markup
    loungeAccess: '4 Domestic Lounge Visits per quarter + Unlimited International Priority Pass with spend criteria',
    rewardType: 'reward_points',
    pointValueInInr: 1.0, // 1 RP = ₹1 on select vouchers/rewards catalogue
    pointCurrencyName: 'Ultimate Reward Points',
    baseRateDescription: '5 Reward Points per ₹150 spent (flat 3.33% reward rate)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 5, amount: 150 },
    },
    acceleratedRules: [
      {
        categories: ['travel_flights', 'travel_hotels', 'dining_food', 'electronics', 'online_shopping'],
        multiplierOrRate: 3.33,
        rateType: 'cashback_percent',
        description: 'Flat 3.33% return (5 points/₹150) on virtually ALL retail, travel, and international transactions',
      },
    ],
    exclusions: [
      { category: 'fuel', reason: 'Fuel transactions earn no reward points.' },
      { category: 'utilities_bills', reason: 'Utility and insurance spends capped at base rates.' },
      { category: 'rent_wallet', reason: 'Rent and wallet payments excluded.' },
    ],
    sourceDoc: {
      title: 'Standard Chartered Ultimate Credit Card Terms of Service',
      url: 'https://www.sc.com/in/credit-cards/ultimate-card/',
      effectiveDate: '2026-06-15',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.97,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#052E16] via-[#14532D] to-[#022C22]',
      textColor: 'text-emerald-100',
      accentColor: '#10B981',
      borderStroke: 'border-emerald-500/30',
      finish: 'emerald',
      chipColor: 'gold',
      network: 'visa',
    },
  },

  {
    id: 'airtel_axis',
    name: 'Airtel Axis Bank Card',
    bankId: 'axis',
    bankName: 'Axis Bank',
    category: 'cashback',
    annualFee: 500,
    annualFeeWaiverSpend: 100000,
    forexMarkupPercent: 3.5,
    loungeAccess: '4 Complimentary Domestic Lounge Visits per year',
    rewardType: 'cashback',
    pointValueInInr: 1.0,
    pointCurrencyName: 'Statement Cashback ₹',
    baseRateDescription: '1% unlimited cashback on other eligible retail spends',
    baseRewardCalculation: {
      cashbackPercent: 1.0,
    },
    acceleratedRules: [
      {
        merchants: ['airtel'],
        categories: ['utilities_bills'],
        multiplierOrRate: 25.0, // 25% on Airtel Thanks
        rateType: 'cashback_percent',
        capPerMonth: 300, // ₹300 monthly cap
        description: '25% Cashback on Airtel Mobile, Broadband, WiFi & DTH bill payments via Airtel Thanks App',
      },
      {
        categories: ['utilities_bills'],
        multiplierOrRate: 10.0,
        rateType: 'cashback_percent',
        capPerMonth: 300,
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
    visual: {
      gradient: 'from-[#881337] via-[#9F1239] to-[#4C0519]',
      textColor: 'text-rose-100',
      accentColor: '#F43F5E',
      borderStroke: 'border-rose-400/40',
      finish: 'matte',
      chipColor: 'gold',
      network: 'mastercard',
    },
  },

  {
    id: 'idfc_wealth',
    name: 'IDFC FIRST Wealth',
    bankId: 'idfc',
    bankName: 'IDFC FIRST Bank',
    category: 'super_premium',
    annualFee: 0, // Lifetime Free!
    forexMarkupPercent: 1.5, // Best-in-class low forex markup
    loungeAccess: '4 Complimentary Domestic Airport Lounge Visits + 4 Railway Lounge Visits per quarter (subject to spend criteria)',
    rewardType: 'reward_points',
    pointValueInInr: 0.25, // 1 RP = ₹0.25, points NEVER expire
    pointCurrencyName: 'FIRST Reward Points',
    baseRateDescription: '3X points on offline spends up to ₹30,000/mo (0.75% return)',
    baseRewardCalculation: {
      pointsPerAmount: { points: 3, amount: 100 },
    },
    acceleratedRules: [
      {
        transactionType: 'online',
        multiplierOrRate: 6.0, // 6X points on online spends = 1.5% return
        rateType: 'points_per_amount',
        pointsPerAmount: { points: 6, amount: 100 },
        description: '6X Reward Points (1.5% return) on all online spends up to ₹30,000/month',
      },
      {
        multiplierOrRate: 10.0, // 10X points on spends above ₹30,000/month = 2.5% return
        rateType: 'points_per_amount',
        pointsPerAmount: { points: 10, amount: 100 },
        description: '10X Reward Points (2.5% return) on incremental monthly spends exceeding ₹30,000 and on your Birthday',
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
      { category: 'rent_wallet', reason: 'Rent and wallet payments earn 3X points, subject to 1% transaction fee.' },
    ],
    sourceDoc: {
      title: 'IDFC FIRST Wealth Credit Card Reward Policy & Forever Points Handbook',
      url: 'https://www.idfcfirstbank.com/credit-card/wealth',
      effectiveDate: '2026-08-01',
      lastVerifiedDate: '2026-11-04',
      confidence: 0.98,
      verificationStatus: 'VERIFIED',
    },
    visual: {
      gradient: 'from-[#0F172A] via-[#1E293B] to-[#0A0E17]',
      textColor: 'text-slate-100',
      accentColor: '#94A3B8',
      borderStroke: 'border-slate-400/30',
      finish: 'titanium',
      chipColor: 'silver',
      network: 'visa',
    },
  },
];
