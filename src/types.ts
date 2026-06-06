export interface Category {
  id: string;
  name: string;
  icon: string;
  accentColor: string;
  borderColor: string;
  accentHex: string;
  description: string;
}

export interface DecisionCard {
  id: string;
  title: string;
  khiNaoDung: string[];
  stack: string[];
  ctaText: string;
  categoryAccent: string;
  patternId: string;
  patternCountLabel: string;
}

export type TemplateVariant = 'minimal' | 'production' | 'test' | 'config';

export interface CodeTemplate {
  filename: string;
  language: string;
  code: string;
  description: string;
  variant?: TemplateVariant;
}

export interface CommonError {
  error: string;
  cause: string;
  fix: string;
}

export interface ChecklistItem {
  task: string;
  detail: string;
  checked?: boolean;
}

export interface Pattern {
  id: string;
  title: string;
  vietnameseTitle: string;
  shortDescription: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  difficultyVi: 'Dễ' | 'Trung bình' | 'Nâng cao';
  productionLevel: string;
  libraries: string[];
  updatedAt: string;
  whyUse: string[];
  whyNotUse: string[];
  quickDecision: {
    bestFor: string[];
    avoidWhen: string[];
    productionLevel: string;
  };
  installCommand: string;
  requestFlow: string[];
  folderStructure: string;
  codeTemplates: CodeTemplate[];
  commonErrors: CommonError[];
  productionChecklist: ChecklistItem[];
  relatedPatterns: string[];
  searchKeywords?: string[];
}

export interface LibraryGuide {
  name: string;
  slug: string;
  description: string;
  whenToUse: string;
  category: string;
  relatedPatternCount: number;
  installCommand: string;
  websiteUrl: string;
}

export interface SearchResult {
  pattern: Pattern;
  score: number;
  matchedFields: string[];
  matchedTerms: string[];
}

export type PatternSummary = Pattern;
