export interface LegalSection {
  title: string
  content: string
}

export interface LegalPageConfig {
  title: string
  lastUpdated: string
  companyName: string
  websiteUrl: string
  contactEmail: string
  sections: LegalSection[]
}

export interface PrivacyDataRow {
  dataType: string
  purpose: string
  required: string
}

export interface PrivacyQuickSummary {
  icon: string
  title: string
  description: string
}

export interface PrivacyProvider {
  icon: string
  name: string
}

export interface PrivacyRight {
  icon: string
  label: string
}

export interface PrivacyPolicyConfig {
  title: string
  badge: string
  intro: string
  lastUpdated: string
  pdfUrl?: string
  companyName: string
  websiteUrl: string
  contactEmail: string
  quickSummary: PrivacyQuickSummary[]
  whatWeCollect: {
    tldr: string
    rows: PrivacyDataRow[]
  }
  howWeUse: {
    tldr: string
    items: string[]
  }
  security: {
    tldr: string
    items: string[]
  }
  dataSharing: {
    tldr: string
    providers: PrivacyProvider[]
  }
  cookies: {
    tldr: string
    description: string
  }
  yourRights: {
    rights: PrivacyRight[]
  }
}

export interface TermsNavItem {
  id: string
  label: string
  icon: string
}

export interface TermsNavGroup {
  label: string
  items: TermsNavItem[]
}

export interface TermsStat {
  value: string
  label: string
}

export interface TermsFaq {
  question: string
  answer: string
}

export interface TermsHighlight {
  title: string
  content: string
}

export interface TermsSection {
  id: string
  icon: string
  title: string
  tldr: string
  stats?: TermsStat[]
  listTitle?: string
  listItems?: string[]
  allowedTitle?: string
  allowedItems?: string[]
  prohibitedTitle?: string
  prohibitedItems?: string[]
  subsections?: {
    title: string
    items: string[]
  }[]
  faqs?: TermsFaq[]
  highlight?: TermsHighlight
  callout?: TermsHighlight
}

export interface TermsOfServiceConfig {
  badge: string
  title: string
  intro: string
  lastUpdated: string
  contactEmail: string
  discordUrl: string
  navGroups: TermsNavGroup[]
  sections: TermsSection[]
}

export interface RefundServiceTerm {
  icon: string
  title: string
  period: string
  description: string
}

export interface RefundPolicyConfig {
  badge: string
  title: string
  intro: string
  guarantee: {
    badge: string
    title: string
    description: string
    ctaLabel: string
    ctaLink: string
  }
  serviceTermsTitle: string
  serviceTerms: RefundServiceTerm[]
  development: {
    title: string
    note: string
    items: string[]
  }
  nonRefundableTitle: string
  nonRefundable: string[]
  processing: {
    title: string
    description: string
  }
  support: {
    title: string
    description: string
    discordLabel: string
    discordUrl: string
    ticketLabel: string
    ticketUrl: string
  }
}

export interface LegalConfig {
  termsOfService: TermsOfServiceConfig
  privacyPolicy: PrivacyPolicyConfig
  refundPolicy: RefundPolicyConfig
}
