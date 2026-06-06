import { Pattern, SearchResult } from '../types';
import { SEARCH_SYNONYMS } from '../data/search';

export const MATCHED_FIELD_LABELS: Record<string, string> = {
  title: 'tên pattern',
  description: 'mô tả',
  libraries: 'thư viện',
  use: 'khi nào dùng',
  avoid: 'khi nào không dùng',
  templates: 'template/file',
  keywords: 'từ khóa',
  category: 'category',
};

function normalize(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9+#._-]+/i)
    .map(part => part.trim())
    .filter(part => part.length >= 2);
}

function expandedQuery(query: string): string[] {
  const base = normalize(query);
  if (!base) return [];

  const parts = new Set<string>([base, ...tokenize(base)]);

  Object.entries(SEARCH_SYNONYMS).forEach(([key, values]) => {
    const normalizedKey = normalize(key);
    const all = [key, ...values].map(normalize);
    all.forEach(v => {
      if (v.length < 4) return;
      if (base.includes(v) || v.includes(base) || base.includes(normalizedKey)) {
        parts.add(v);
        tokenize(v).forEach(token => parts.add(token));
      }
    });
  });

  return Array.from(parts).filter(term => term.length >= 2);
}

function fieldText(pattern: Pattern): Record<string, string> {
  return {
    title: `${pattern.title} ${pattern.vietnameseTitle}`,
    description: pattern.shortDescription,
    libraries: pattern.libraries.join(' '),
    use: pattern.whyUse.join(' '),
    avoid: pattern.whyNotUse.join(' '),
    templates: (pattern.codeTemplates ?? []).map(t => `${t.filename} ${t.description} ${t.variant ?? ''}`).join(' '),
    keywords: pattern.searchKeywords?.join(' ') ?? '',
    category: pattern.category,
  };
}

const FIELD_WEIGHTS: Record<string, number> = {
  title: 100,
  use: 75,
  libraries: 55,
  keywords: 45,
  templates: 35,
  description: 30,
  avoid: 24,
  category: 18,
};

export function formatMatchedFields(fields: string[]): string {
  if (!fields.length) return 'gợi ý nổi bật';
  return fields
    .slice(0, 3)
    .map(field => MATCHED_FIELD_LABELS[field] ?? field)
    .join(', ');
}

export function highlightText(text: string, query: string): string {
  const terms = expandedQuery(query)
    .sort((a, b) => b.length - a.length)
    .slice(0, 8);
  if (!terms.length) return text;

  const normalizedText = normalize(text);
  const ranges: Array<[number, number]> = [];

  terms.forEach(term => {
    if (term.length < 3) return;
    let start = normalizedText.indexOf(term);
    while (start !== -1) {
      ranges.push([start, start + term.length]);
      start = normalizedText.indexOf(term, start + term.length);
    }
  });

  if (!ranges.length) return text;

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  ranges.forEach(range => {
    const last = merged[merged.length - 1];
    if (!last || range[0] > last[1]) merged.push(range);
    else last[1] = Math.max(last[1], range[1]);
  });

  let output = '';
  let cursor = 0;
  merged.forEach(([start, end]) => {
    output += text.slice(cursor, start);
    output += `<mark>${text.slice(start, end)}</mark>`;
    cursor = end;
  });
  output += text.slice(cursor);
  return output;
}

export function searchPatterns(patterns: Pattern[], query: string): SearchResult[] {
  const terms = expandedQuery(query);
  if (terms.length === 0) {
    return patterns.map((pattern, idx) => ({
      pattern,
      score: 1000 - idx,
      matchedFields: ['featured'],
      matchedTerms: [],
    }));
  }

  return patterns
    .map((pattern) => {
      const fields = fieldText(pattern);
      let score = 0;
      const matchedFields = new Set<string>();
      const matchedTerms = new Set<string>();

      Object.entries(fields).forEach(([name, raw]) => {
        const value = normalize(raw);
        terms.forEach(term => {
          if (!term || term.length < 2) return;
          const exact = value.includes(term);
          const tokenMatch = tokenize(value).some(token => token === term || token.includes(term) || term.includes(token));
          if (!exact && !tokenMatch) return;
          matchedFields.add(name);
          matchedTerms.add(term);
          const weight = FIELD_WEIGHTS[name] ?? 10;
          score += exact ? weight : Math.floor(weight * 0.55);
        });
      });

      return {
        pattern,
        score,
        matchedFields: Array.from(matchedFields),
        matchedTerms: Array.from(matchedTerms),
      };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.pattern.title.localeCompare(b.pattern.title));
}
