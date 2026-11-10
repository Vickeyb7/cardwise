import React, { useState } from "react";
import { Sparkles, CreditCard, TrendingUp, Layers, Radar } from "lucide-react";
import { LiquidMetalButton } from "./liquid-metal-button";
import { LiquidNavbar, type LiquidNavItem } from "./liquid-glass-navbar";

const ELIGIBLE_NAV_ITEMS: LiquidNavItem[] = [
  { label: "Optimizer", icon: <Sparkles size={18} strokeWidth={2.2} />, fx: "pop" },
  { label: "My Vault", icon: <CreditCard size={18} strokeWidth={2.2} />, fx: "pop" },
  { label: "Insights", icon: <TrendingUp size={18} strokeWidth={2.2} />, fx: "pop" },
  { label: "Card Catalog", icon: <Layers size={18} strokeWidth={2.2} />, fx: "pop" },
  { label: "Policy Radar", icon: <Radar size={18} strokeWidth={2.2} />, fx: "wave" },
];

export function LiquidNavbarDemo() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-900 rounded-2xl">
      <LiquidNavbar
        items={ELIGIBLE_NAV_ITEMS}
        active={active}
        onChange={(idx) => setActive(idx)}
        tone="dark"
        sound={true}
      />
    </div>
  );
}

export function LiquidMetalButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-wrap items-center gap-8">
        <LiquidMetalButton label="Get Started" />
        <LiquidMetalButton label="Optimize ₹ Spend" />
        <LiquidMetalButton label="Add More Cards" />
        <LiquidMetalButton viewMode="icon" />
      </div>
    </div>
  );
}

export default LiquidMetalButtonDemo;
