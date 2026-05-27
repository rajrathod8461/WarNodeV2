export interface HeroGame {
  id: string;
  name: string;
  displayName: string;
  banner: string;
  color: string;
  showSuffix: boolean;
  showInDropdown: boolean;
}

export interface HeroTitle {
  prefix: string;
  suffix: string;
  suffixColor: string;
  gameNameColor: string;
}

export interface HeroPartner {
  name: string;
  src: string;
  loading: "lazy" | "eager";
  /** PNG/color logos — skip dark-mode invert filter */
  colored?: boolean;
}

export interface HeroConfig {
  navbar: {
    logo: string;
    /** Bump when you replace public/meta/Logo.png to refresh navbar/footer. */
    logoVersion?: string;
    brandName: string;
    brandAccent: string;
  };
  hero: {
    title: HeroTitle;
    games: HeroGame[];
    description: string;
    cycleInterval: number;
    partners: HeroPartner[];
  };
}
