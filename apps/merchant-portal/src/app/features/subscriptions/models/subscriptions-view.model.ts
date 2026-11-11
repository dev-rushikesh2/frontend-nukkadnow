export type SaaSTier = 'STARTER' | 'PRO' | 'MULTI_OUTLET';

export interface QuotaUsage {
  outletsUsed: number;
  outletsLimit: number; // e.g. 1
  staffUsed: number;
  staffLimit: number;   // e.g. 5
  productsUsed: number;
  productsLimit: number; // e.g. 50 (or 9999 for unlimited)
  ordersThisMonth: number;
  ordersLimit: number;
}

export interface SubscriptionDetails {
  currentTier: SaaSTier;
  billingCycle: 'MONTHLY' | 'ANNUAL';
  pricePaise: number;
  nextRenewalDate: string;
  isInGracePeriod: boolean;
  gracePeriodDaysRemaining: number;
  quotas: QuotaUsage;
}

export interface PlanFeature {
  name: string;
  includedInStarter: boolean;
  includedInPro: boolean;
  includedInMulti: boolean;
}

export type SubscriptionsViewModel = SubscriptionDetails;
