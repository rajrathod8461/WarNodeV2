export interface DiscordPlanPrices {
  INR: number
  USD: number
  EUR: number
}

export interface DiscordPlan {
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
  prices?: DiscordPlanPrices
  period: string
  orderLink: string
}

export interface PlanType {
  id: string
  name: string
  displayName: string
  image: string
}

export interface DiscordConfig {
  heroBanner?: string
  discordLogo?: string
  wumpusHi?: string
  wumpusDance?: string
  planTypes: PlanType[]
  supportedLanguages?: string[]
  plans: {
    [key: string]: DiscordPlan[]
  }
}

// ed81a6ecacfe792662b9f3bd82bfa5fe