export interface PolicyTable {
  headers: string[]
  rows: string[][]
}

export interface PolicySection {
  id: string
  num: number
  title: string
  content: string[]
  table?: PolicyTable
}

export interface PolicyPart {
  id: string
  badge: string
  title: string
  intro: string
  sections: PolicySection[]
}

export interface LegalPoliciesConfig {
  lastUpdated: string
  version: string
  entity: string
  address: string
  contacts: {
    support: string
    legal: string
    billing: string
    privacy: string
    abuse: string
    security: string
  }
  termsOfService: PolicyPart
  acceptableUsePolicy: PolicyPart
  serviceLevelAgreement: PolicyPart
  refundPolicy: PolicyPart
  privacyPolicy: PolicyPart
}

// Backward-compatibility aliases
export type TermsOfServiceConfig = PolicyPart
export type RefundPolicyConfig = PolicyPart
export type PrivacyPolicyConfig = PolicyPart
