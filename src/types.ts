/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Category {
  id: string;
  name: string;
  icon: string; // Name of Lucide-react icon
  accentColor: string; // e.g. text-amber-500, bg-amber-500/10
  borderColor: string; // border-amber-500/30
  accentHex: string; // #f59e0b
  description: string;
}

export interface DecisionCard {
  id: string;
  title: string;
  khiNaoDung: string[];
  stack: string[];
  ctaText: string;
  categoryAccent: string; // e.g. 'violet', 'rose'
  patternId: string; // Navigates to this pattern
  patternCountLabel: string;
}

export interface CodeTemplate {
  filename: string;
  language: string;
  code: string;
  description: string;
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
  category: string; // matches Category.id
  difficulty: "Easy" | "Medium" | "Advanced";
  difficultyVi: "Dễ" | "Trung bình" | "Nâng cao";
  productionLevel: string;
  libraries: string[];
  updatedAt: string;
  
  // Decision guidelines (Shown ABOVE code blocks)
  whyUse: string[]; // Khi nào dùng
  whyNotUse: string[]; // Khi nào không dùng
  
  quickDecision: {
    bestFor: string[];
    avoidWhen: string[];
    productionLevel: string;
  };
  
  installCommand: string;
  requestFlow: string[]; // Flow step descriptions
  folderStructure: string; // Text representation of folder tree
  codeTemplates: CodeTemplate[];
  commonErrors: CommonError[];
  productionChecklist: ChecklistItem[];
  relatedPatterns: string[]; // pattern ids
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
