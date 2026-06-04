/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Pattern, Category } from '../types';
import { CATEGORIES } from '../data';
import { Calendar, Layers, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface PatternCardProps {
  pattern: Pattern;
  onClick: (patternId: string) => void;
}

export default function PatternCard({ pattern, onClick }: PatternCardProps) {
  // Find associated category
  const categoryInfo = CATEGORIES.find(c => c.id === pattern.category);
  
  // Format difficulty badge style
  const getDiffStyle = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Advanced':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <div
      onClick={() => onClick(pattern.id)}
      className="group flex flex-col justify-between h-full bg-[#12161f] border border-slate-800 rounded-xl p-5 hover:border-slate-700 hover:bg-[#161a25] active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-md select-none relative overflow-hidden"
    >
      {/* Accent marker */}
      <div 
        className="absolute top-0 left-0 w-1.5 h-full transition-all group-hover:w-2"
        style={{ backgroundColor: categoryInfo?.accentHex || '#64748b' }}
      />

      <div className="pl-2">
        {/* Header Badges */}
        <div className="flex flex-wrap gap-2 items-center mb-3">
          {categoryInfo && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryInfo.accentHex }} />
              <span>{categoryInfo.name}</span>
            </span>
          )}
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${getDiffStyle(pattern.difficulty)}`}>
            {pattern.difficulty}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-900 border border-slate-850 text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            {pattern.productionLevel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-100 group-hover:text-white line-clamp-1 mb-2 tracking-tight group-hover:translate-x-0.5 transition-transform">
          {pattern.title}
        </h3>

        {/* Short Vietnamese Description */}
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {pattern.shortDescription}
        </p>
      </div>

      <div className="pl-2 pt-4 border-t border-slate-850">
        {/* Libraries List */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pattern.libraries.slice(0, 4).map((lib, i) => (
            <span key={i} className="text-[10px] bg-[#1a212d] text-slate-300 font-mono px-1.5 py-0.5 rounded border border-slate-800">
              {lib}
            </span>
          ))}
          {pattern.libraries.length > 4 && (
            <span className="text-[9px] text-slate-400 font-mono px-1.5 py-0.5 rounded bg-slate-950 flex items-center">
              +{pattern.libraries.length - 4}
            </span>
          )}
        </div>

        {/* Action Bottom */}
        <div className="flex items-center justify-between text-xs text-slate-450 mt-1">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-slate-550" />
            {pattern.updatedAt}
          </span>
          
          <span className="flex items-center text-xs font-medium text-amber-400 group-hover:text-amber-300 group-hover:gap-1.5 transition-all gap-1">
            <span>Xem template</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
