export interface DatabasePlanPrices {
  INR: number
  USD: number
  EUR: number
}

export interface DatabasePlan {
  id: string
  name: string
  badge?: string
  cpu: string
  cpuDetail: string
  ram: string
  ramDetail: string
  storage: string
  storageDetail: string
  bandwidth: string
  bandwidthDetail: string
  uptime: string
  price: string
  prices?: DatabasePlanPrices
  period: string
  orderLink: string
}

export interface PlanType {
  id: string
  name: string
  displayName: string
  image: string
}

export interface DatabaseConfig {
  heroBanner?: string
  databaseLogo?: string
  planTypes: PlanType[]
  supportedDatabases?: string[]
  plans: {
    [key: string]: DatabasePlan[]
  }
}
