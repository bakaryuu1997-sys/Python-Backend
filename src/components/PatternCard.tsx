/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Pattern } from '../types';
import { CATEGORIES } from '../data/index';
import { Calendar, ShieldCheck, ArrowRight, SearchCheck } from 'lucide-react';
import { formatMatchedFields, highlightText } from '../lib/search';

interface PatternCardProps {
  pattern: Pattern;
  onClick: (patternId: string) => void;
  matchedFields?: string[];
  query?: string;
}

function HighlightedText({ text, query, className }: { text: string; query?: string; className?: string }) {
  if (!query) return <span className={className}>{text}</span>;
  return <span className={className} dangerouslySetInnerHTML={{ __html: highlightText(text, query) }} />;
}

export default function PatternCard({ pattern, onClick, matchedFields = [], query = '' }: PatternCardProps) {
  const categoryInfo = CATEGORIES.find(c => c.id === pattern.category);

  const getDiffStyle = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-500/10 text-green-300 border border-green-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-300 border border-amber-500/20';
      case 'Advanced':
        return 'bg-rose-500/10 text-rose-300 border border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-300 border border-slate-500/20';
    }
  };

  return (
    <div
      onClick={() => onClick(pattern.id)}
      className="group flex flex-col justify-between h-full bg-[#121823] border border-slate-700/80 rounded-2xl p-6 hover:border-slate-600 hover:bg-[#171e2b] active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-md select-none relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-1.5 h-full transition-all group-hover:w-2"
        style={{ backgroundColor: categoryInfo?.accentHex || '#64748b' }}
      />

      <div className="pl-2">
        <div className="flex flex-wrap gap-2 items-center mb-4">
          {categoryInfo && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryInfo.accentHex }} />
              <span>{categoryInfo.name}</span>
            </span>
          )}
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${getDiffStyle(pattern.difficulty)}`}>
            {pattern.difficulty}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            {pattern.productionLevel}
          </span>
        </div>

        <h3 className="text-[17px] font-bold text-slate-50 group-hover:text-white line-clamp-1 mb-2 tracking-tight group-hover:translate-x-0.5 transition-transform search-highlight-text">
          <HighlightedText text={pattern.title} query={query} />
        </h3>

        <p className="text-[14px] text-slate-300 line-clamp-3 leading-6 mb-4 search-highlight-text">
          <HighlightedText text={`${pattern.vietnameseTitle} — ${pattern.shortDescription}`} query={query} />
        </p>

        {query && matchedFields.length > 0 && (
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.07] px-2.5 py-1.5 text-[11px] text-amber-300 font-mono">
            <SearchCheck className="w-3.5 h-3.5" />
            <span>Matched by: {formatMatchedFields(matchedFields)}</span>
          </div>
        )}
      </div>

      <div className="pl-2 pt-5 border-t border-slate-800">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pattern.libraries.slice(0, 5).map((lib, i) => (
            <span key={i} className="text-[10px] bg-[#1b2432] text-slate-200 font-mono px-2 py-1 rounded-md border border-slate-700/70">
              {lib}
            </span>
          ))}
          {pattern.libraries.length > 5 && (
            <span className="text-[10px] text-slate-300 font-mono px-2 py-1 rounded-md bg-slate-950 border border-slate-800 flex items-center">
              +{pattern.libraries.length - 5}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {pattern.updatedAt}
          </span>

          <span className="flex items-center text-xs font-semibold text-amber-300 group-hover:text-amber-200 group-hover:gap-1.5 transition-all gap-1">
            <span>Xem template</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
