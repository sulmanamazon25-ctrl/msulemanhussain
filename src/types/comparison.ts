export type FeatureValue = boolean | string;

export type Competitor = {
  id: string;
  name: string;
  logo?: string;
  isOurs: boolean;
  audience: string;
  pricingModel: string;
  pros: string[];
  cons: string[];
  liveUrl?: string;
};

export type FeatureRow = {
  id: string;
  name: string;
  ourValue: FeatureValue;
  competitorValue: FeatureValue;
  highlight?: boolean;
  note?: string;
};

export type FeatureCategory = {
  id: string;
  name: string;
  rows: FeatureRow[];
};

export type ComparisonCta = {
  heading: string;
  buttonLabel: string;
  href: string;
  badge?: string;
};

export type ComparisonFaq = {
  q: string;
  a: string;
};

export type RoiConfig = {
  /** Label for the slider input */
  inputLabel: string;
  inputUnit: string;
  min: number;
  max: number;
  defaultValue: number;
  step: number;
  /** Competitor estimated cost per unit (e.g. per contact / per hour) */
  competitorCostPerUnit: number;
  /** Our product estimated cost per unit */
  ourCostPerUnit: number;
  currency: string;
  resultLabel: string;
  note: string;
};

export type ComparisonLocaleCopy = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  heroBadges: string[];
  whySwitch: string;
  categories: FeatureCategory[];
  faq: ComparisonFaq[];
  cta: ComparisonCta;
  roi: RoiConfig;
};

export type ComparisonDoc = {
  slug: string;
  ourProductSlug: string;
  accent: string;
  our: Competitor;
  competitor: Competitor;
  en: ComparisonLocaleCopy;
  es: ComparisonLocaleCopy;
};
