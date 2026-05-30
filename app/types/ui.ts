export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface UIConfig {
  loading: {
    enableLoadingScreen: boolean;
    loadingDuration: number;
  };
  currency: {
    baseCurrency: string;
    defaultCurrency: string;
    fixedRates: Record<string, number>;
    supportedCurrencies: Currency[];
  };
  christmasTheme?: {
    enabled: boolean;
  };
}
