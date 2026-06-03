export type Category = "signal" | "uncovered" | "emerging" | "global";

export interface Sentiment {
  score: number;
  label: string;
  drivers: string[];
  risks: string[];
}

export interface Country {
  id: string;
  slug: string;
  name: string;
  flag: string;
  language: string;
  languageName: string;
  currency: string;
  region: string;
  trendingScore: number;
  policyRate: string;
  inflation: string;
  gdpGrowth: string;
  fxYtd: string;
  summary: string;
  economicDevelopments: string[];
  regulatoryDevelopments: string[];
  infrastructure: string[];
  sectorTrends: string[];
}

export interface Exposure {
  country: string;
  note: string;
}

export interface Company {
  id: string;
  name: string;
  ticker: string;
  exchange: string;
  country: string;
  countryName: string;
  sector: string;
  industry: string;
  marketCap: string;
  priceChange: string;
  overview: string;
  exposures: Exposure[];
  supplyChain: string[];
  sentiment: Sentiment;
  mentions: { count: number; trend: string; window: string };
  investmentImplications: string[];
  relatedIndustries: string[];
}

export interface Article {
  id: string;
  category: Category;
  country: string;
  source: string;
  sourceType: string;
  originalLanguage: string;
  originalHeadline: string;
  translatedHeadline: string;
  originalSnippet: string;
  translatedSnippet: string;
  publishedAt: string;
  coveredByMajorMedia: boolean;
  coverageGrowth: string;
  impactScore: number;
  confidenceScore: number;
  noveltyScore: number;
  companies: string[];
  industries: string[];
  aiSummary: string;
  whyCare: string;
  bullCase: string;
  bearCase: string;
  marketImplications: string;
}

export interface Alert {
  id: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  time: string;
  country: string;
  articleId: string;
  companies: string[];
  industries: string[];
}
