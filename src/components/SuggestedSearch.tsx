/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShieldCheck, Zap, CornerDownRight, Sparkles, RotateCcw } from 'lucide-react';
import { SearchResult } from '../types';
import { PATTERN_INDEX, SUGGESTED_SEARCH_CHIPS, CATEGORIES } from '../data/index';
import { searchPatterns, formatMatchedFields, highlightText } from '../lib/search';

interface SuggestedSearchProps {
  onSelectPattern: (patternId: string) => void;
  onSearchQuery: (query: string) => void;
}

function HighlightedText({ text, query, className }: { text: string; query: string; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: highlightText(text, query) }}
    />
  );
}

export default function SuggestedSearch({ onSelectPattern, onSearchQuery }: SuggestedSearchProps) {
  const [searchInput, setSearchInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchInput.trim()) {
      setFilteredResults(searchPatterns(PATTERN_INDEX, '').slice(0, 6));
      onSearchQuery('');
      return;
    }

    const matches = searchPatterns(PATTERN_INDEX, searchInput).slice(0, 8);
    setFilteredResults(matches);
    onSearchQuery(searchInput);
  }, [searchInput, onSearchQuery]);

  const handleChipClick = (chip: string) => {
    setSearchInput(chip);
    setShowDropdown(true);
  };

  const handleClear = () => {
    setSearchInput('');
    setShowDropdown(true);
    onSearchQuery('');
  };

  const getDiffStyle = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-500/15 text-green-300 text-[10px] border border-green-500/20';
      case 'Medium': return 'bg-amber-500/15 text-amber-300 text-[10px] border border-amber-500/20';
      case 'Advanced': return 'bg-rose-500/15 text-rose-300 text-[10px] border border-rose-500/20';
      default: return 'bg-slate-500/15 text-slate-300 text-[10px] border border-slate-600';
    }
  };

  return (
    <div id="search_component_root" className="w-full bg-[#111722] border border-slate-700/80 rounded-2xl p-7 md:p-9 shadow-xl max-w-5xl mx-auto mb-12 text-center relative select-none">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/[0.035] via-transparent to-violet-500/[0.025] pointer-events-none" />
      <div className="relative mb-7">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-300 text-[11px] font-mono font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Static Decision Library · No Backend · No Gemini Runtime
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-50 mb-3 leading-tight tracking-tight">
          Tra cứu Backend Python nhanh, đúng thư viện, có template copy ngay
        </h1>
        <p className="text-[15px] text-slate-300 leading-7 max-w-3xl mx-auto">
          Tìm pattern backend, chọn đúng thư viện, xem <strong className="text-slate-100">khi nào dùng</strong> và copy template production-ready cho FastAPI, Django, SQLAlchemy, Redis, Celery, OCR, RAG.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Tìm: chụp ảnh OCR, login JWT, upload file lớn, Redis cache, Celery, RAG backend..."
            className="w-full bg-[#171d29] border border-slate-600 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 rounded-xl pl-12 pr-11 py-4 text-[15px] text-slate-50 placeholder-slate-400 focus:outline-none transition-all duration-200 shadow-inner"
          />
          {searchInput && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 w-full mt-3 bg-[#151b27] border border-slate-700 rounded-xl shadow-2xl z-50 text-left overflow-hidden transition-all duration-200">
            <div className="bg-[#111722] px-4 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex justify-between items-center select-none border-b border-slate-800">
              <span>{searchInput.trim() ? 'Kết quả gợi ý khớp' : 'Gợi ý nổi bật nhất'}</span>
              <span>{filteredResults.length} items</span>
            </div>

            {filteredResults.length > 0 ? (
              <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-800 scrollbar-thin">
                {filteredResults.map((result) => {
                  const pattern = result.pattern;
                  const cat = CATEGORIES.find(c => c.id === pattern.category);
                  return (
                    <div
                      key={pattern.id}
                      onClick={() => {
                        onSelectPattern(pattern.id);
                        setShowDropdown(false);
                      }}
                      className="p-4 hover:bg-[#202838] cursor-pointer transition-colors duration-150 flex items-start gap-3"
                    >
                      <div className="p-1.5 rounded-lg bg-[#0f131b] shrink-0 text-amber-400 mt-0.5 border border-slate-800">
                        <Zap className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <HighlightedText
                            text={pattern.title}
                            query={searchInput}
                            className="text-[13px] font-bold text-slate-50 line-clamp-1 search-highlight-text"
                          />
                          {cat && (
                            <span
                              className="text-[9px] px-1.5 py-0.5 rounded font-semibold border"
                              style={{ backgroundColor: `${cat.accentHex}18`, color: cat.accentHex, borderColor: `${cat.accentHex}35` }}
                            >
                              {cat.name}
                            </span>
                          )}
                          <span className={`px-1.5 py-0.5 rounded font-mono ${getDiffStyle(pattern.difficulty)}`}>
                            {pattern.difficulty}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2 mb-2 leading-5">
                          <HighlightedText text={`${pattern.vietnameseTitle} — ${pattern.shortDescription}`} query={searchInput} className="search-highlight-text" />
                        </p>

                        <div className="mb-2 inline-flex items-center gap-1.5 rounded-md border border-amber-500/15 bg-amber-500/[0.06] px-2 py-1 text-[10px] text-amber-300 font-mono">
                          <CornerDownRight className="w-3 h-3" />
                          <span>Matched by: {formatMatchedFields(result.matchedFields)}</span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-slate-400 flex items-center">
                            Thư viện:
                          </span>
                          {pattern.libraries.slice(0, 6).map((lib, idx) => (
                            <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                              {lib}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="shrink-0 text-[10px] text-slate-400 font-mono text-right flex flex-col items-end gap-1 select-none">
                        <span className="text-emerald-400 flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" /> Ready
                        </span>
                        <span>{pattern.updatedAt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-7 text-center">
                <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-100 mb-1">Chưa tìm thấy pattern phù hợp</h3>
                <p className="text-xs text-slate-400 leading-5 max-w-md mx-auto mb-4">
                  Thử dùng từ khóa gần nghĩa như “OCR”, “đăng nhập”, “file lớn”, “worker”, “cache”, “webhook”, hoặc chọn một gợi ý bên dưới.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['chụp ảnh OCR', 'login JWT', 'file lớn Celery', 'Redis cache', 'RAG backend'].map((chip) => (
                    <button key={chip} onClick={() => handleChipClick(chip)} className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700">
                      <RotateCcw className="inline w-3 h-3 mr-1" /> {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-center flex-wrap gap-2 text-xs relative">
        <span className="text-slate-400 font-medium select-none">Từ khóa gợi ý:</span>
        {SUGGESTED_SEARCH_CHIPS.map((chip, index) => (
          <button
            key={index}
            onClick={() => handleChipClick(chip)}
            className="px-2.5 py-1.5 rounded-md text-[11px] bg-slate-800/70 border border-slate-700 hover:border-amber-500/40 hover:bg-slate-800 text-slate-200 hover:text-amber-200 transition-all duration-150 active:scale-95 cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
