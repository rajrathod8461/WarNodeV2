export interface PricingPlan {
  titleKey: string;
  image: string;
  descriptionKey: string;
  basePrice: number;
  displayPrices?: Partial<Record<"INR" | "USD" | "EUR", string>>;
  priceSuffix?: string;
  featuresKeys: string[];
  buttonTextKey: string;
  buttonStyle: "primary" | "secondary";
  popular: boolean;
  link: string;
  showStartingPrice?: boolean;
}

export interface PricingSection {
  title: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  description: string;
  plans: PricingPlan[];
  footer: {
    text: string;
    linkText: string;
  };
}

export interface PricingConfig {
  section: PricingSection;
}
