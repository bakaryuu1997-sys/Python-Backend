/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DecisionCard } from '../types';
import { DECISION_CARDS } from '../data/index';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface DecisionCardGridProps {
  onSelectPattern: (patternId: string) => void;
}

export default function DecisionCardGrid({ onSelectPattern }: DecisionCardGridProps) {
  
  // Custom color badge styling mapped from card accent
  const getAccentStyles = (accent: string) => {
    switch (accent) {
      case 'violet':
        return {
          border: 'border-violet-500/20 hover:border-violet-500/40',
          badge: 'bg-violet-500/10 text-violet-400',
          marker: 'bg-violet-500',
          btn: 'bg-violet-600/20 text-violet-300 hover:bg-violet-600/30',
          title: 'text-violet-400 group-hover:text-violet-300'
        };
      case 'rose':
        return {
          border: 'border-rose-500/20 hover:border-rose-500/40',
          badge: 'bg-rose-500/10 text-rose-400',
          marker: 'bg-rose-500',
          btn: 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30',
          title: 'text-rose-400 group-hover:text-rose-300'
        };
      case 'orange':
        return {
          border: 'border-orange-500/20 hover:border-orange-500/40',
          badge: 'bg-orange-500/10 text-orange-400',
          marker: 'bg-orange-500',
          btn: 'bg-orange-600/20 text-orange-300 hover:bg-orange-600/30',
          title: 'text-orange-400 group-hover:text-orange-300'
        };
      case 'green':
        return {
          border: 'border-green-500/20 hover:border-green-500/40',
          badge: 'bg-green-500/10 text-green-400',
          marker: 'bg-green-500',
          btn: 'bg-green-600/20 text-green-300 hover:bg-green-600/30',
          title: 'text-green-400 group-hover:text-green-300'
        };
      case 'warm-red':
        return {
          border: 'border-red-500/20 hover:border-red-500/40',
          badge: 'bg-red-500/10 text-red-400',
          marker: 'bg-red-500',
          btn: 'bg-red-600/20 text-red-300 hover:bg-red-600/30',
          title: 'text-red-400 group-hover:text-red-300'
        };
      case 'muted-purple':
        return {
          border: 'border-fuchsia-500/20 hover:border-fuchsia-500/40',
          badge: 'bg-fuchsia-500/10 text-fuchsia-400',
          marker: 'bg-fuchsia-500',
          btn: 'bg-fuchsia-600/20 text-fuchsia-300 hover:bg-fuchsia-600/30',
          title: 'text-fuchsia-400 group-hover:text-fuchsia-300'
        };
      default:
        return {
          border: 'border-slate-500/20 hover:border-slate-500/40',
          badge: 'bg-slate-500/10 text-slate-400',
          marker: 'bg-slate-500',
          btn: 'bg-slate-600/20 text-slate-300 hover:bg-slate-600/30',
          title: 'text-slate-300 group-hover:text-slate-200'
        };
    }
  };

  return (
    <div id="decision_guide_section" className="my-8">
      <div className="flex flex-col gap-1 mb-6">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Bạn muốn làm chức năng gì?
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Chọn nhu cầu backend trước, sau đó nhấp mở pattern phù hợp để xem khi nào dùng và sao chép template code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DECISION_CARDS.map((card) => {
          const style = getAccentStyles(card.categoryAccent);
          return (
            <div
              key={card.id}
              className={`group flex flex-col justify-between h-full bg-[#11141b] border ${style.border} rounded-xl p-5 hover:bg-[#141822] active:scale-[0.99] transition-all-custom duration-250 shadow-md relative overflow-hidden`}
            >
              {/* Vertical Color Indicator Line on Hover */}
              <div className={`absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300 ${style.marker}`} />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-base font-bold tracking-wide transition-colors flex items-center space-x-2 ${style.title}`}>
                    <span className={`w-2 h-2 rounded-full ${style.marker}`} />
                    <span>{card.title}</span>
                  </h3>
                  <span className="text-[10px] font-mono font-medium text-slate-500">
                    {card.patternCountLabel}
                  </span>
                </div>

                {/* Bullets List "Khi nào dùng" */}
                <div className="space-y-2 mb-5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest block select-none">
                    Khi nào dùng?
                  </span>
                  <ul className="space-y-1.5">
                    {card.khiNaoDung.map((bullet, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-350 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/80 shrink-0 mt-0.5 mr-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Stack Badges */}
                <div className="flex flex-wrap gap-1 mb-4 select-none">
                  {card.stack.map((item, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-850 text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPattern(card.patternId)}
                  className={`w-full py-2.5 px-4 text-xs font-medium rounded-lg flex items-center justify-center space-x-1.5 transition-all duration-150 cursor-pointer ${style.btn}`}
                >
                  <span>{card.ctaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
