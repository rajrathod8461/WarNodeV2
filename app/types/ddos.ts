export interface DDoSLocation {
  id: string
  name: string
  flag: string
}

export interface DDoSPlanPrices {
  INR: number
  USD: number
  EUR: number
}

export interface DDoSPlan {
  id: string
  name: string
  badge?: string
  popular?: boolean
  price: number
  prices?: DDoSPlanPrices
  /** Shown as bullet list when set; else legacy grid from ram/cpu/… */
  detailLines?: string[]
  ram: string
  cpu: string
  ports: string
  protection: string
  support: string
  orderLink: string
}

export interface DDoSComparisonRow {
  feature: string
  ispShield: string
  warShield: string
}

export interface DDoSAddon {
  id: string
  name: string
  unit: string
  price: number
  oneTime?: boolean
}

export interface DDoSConfig {
  heroImage: string
  /** @deprecated optional; theme uses site CSS variables */
  primaryColor?: string
  orderLink?: string
  locations: DDoSLocation[]
  plans: DDoSPlan[]
  comparison: DDoSComparisonRow[]
  addons: DDoSAddon[]
}
