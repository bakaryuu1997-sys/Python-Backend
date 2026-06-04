/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CheckSquare, ShieldCheck, Zap, CornerDownRight } from 'lucide-react';
import { Pattern } from '../types';
import { PATTERNS, SUGGESTED_SEARCH_CHIPS, CATEGORIES } from '../data';

interface SuggestedSearchProps {
  onSelectPattern: (patternId: string) => void;
  onSearchQuery: (query: string) => void;
}

export default function SuggestedSearch({ onSelectPattern, onSearchQuery }: SuggestedSearchProps) {
  const [searchInput, setSearchInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredPatterns, setFilteredPatterns] = useState<Pattern[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter patterns based on search input
  useEffect(() => {
    if (!searchInput.trim()) {
      // By default show featured patterns as recommendations in autocomplete
      setFilteredPatterns(PATTERNS.slice(0, 4));
      return;
    }

    const query = searchInput.toLowerCase();
    const matches = PATTERNS.filter(pattern => {
      // Match title, library names, description, or category
      return (
        pattern.title.toLowerCase().includes(query) ||
        pattern.vietnameseTitle.toLowerCase().includes(query) ||
        pattern.shortDescription.toLowerCase().includes(query) ||
        pattern.libraries.some(lib => lib.toLowerCase().includes(query)) ||
        pattern.id.toLowerCase().includes(query)
      );
    });

    setFilteredPatterns(matches);
    onSearchQuery(searchInput);
  }, [searchInput, onSearchQuery]);

  const handleChipClick = (chip: string) => {
    setSearchInput(chip);
    setShowDropdown(true);
  };

  const handleClear = () => {
    setSearchInput('');
    onSearchQuery('');
  };

  const getDiffStyle = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-500/15 text-green-400 text-[10px] border border-green-500/20';
      case 'Medium': return 'bg-amber-500/15 text-amber-400 text-[10px] border border-amber-500/20';
      case 'Advanced': return 'bg-rose-500/15 text-rose-400 text-[10px] border border-rose-500/20';
      default: return 'bg-slate-500/15 text-slate-400 text-[10px] border border-slate-550';
    }
  };

  return (
    <div id="search_component_root" className="w-full bg-[#11141b] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto mb-10 text-center relative select-none">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 leading-tight">
          Tra cứu Backend Python nhanh, đúng thư viện, có template copy ngay
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Tìm pattern backend, chọn đúng thư viện, xem khi nào dùng và copy template production-ready cho FastAPI, Django, SQLAlchemy, Redis, Celery, OCR, RAG.
        </p>
      </div>

      {/* Input container with autocomplete wrapper */}
      <div className="relative max-w-3xl mx-auto" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Tìm: chụp ảnh OCR, login JWT, upload file lớn, Redis cache, Celery, RAG backend..."
            className="w-full bg-[#161a23] border border-slate-700 focus:border-amber-500 rounded-xl pl-12 pr-10 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all duration-250 shadow-inner"
          />
          {searchInput && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Dropdown Preview */}
        {showDropdown && (
          <div className="absolute top-full left-0 w-full mt-2 bg-[#161a24] border border-slate-750 rounded-xl shadow-2xl z-50 text-left overflow-hidden transition-all duration-200">
            {/* Dropdown Header Label */}
            <div className="bg-[#12151e] px-4 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center select-none border-b border-slate-800">
              <span>{searchInput.trim() ? 'Kết quả gợi ý khớp' : 'Gợi ý nổi bật nhất'}</span>
              <span>{filteredPatterns.length} items</span>
            </div>

            {/* Results list */}
            {filteredPatterns.length > 0 ? (
              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-800 scrollbar-thin">
                {filteredPatterns.map((pattern) => {
                  const cat = CATEGORIES.find(c => c.id === pattern.category);
                  return (
                    <div
                      key={pattern.id}
                      onClick={() => {
                        onSelectPattern(pattern.id);
                        setShowDropdown(false);
                      }}
                      className="p-3.5 hover:bg-[#1d2331] cursor-pointer transition-colors duration-150 flex items-start gap-3"
                    >
                      <div className="p-1 rounded bg-[#0f1118] shrink-0 text-amber-500 mt-0.5">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* Title and Badge line */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-slate-100 line-clamp-1">
                            {pattern.title}
                          </span>
                          
                          {/* Category badge */}
                          {cat && (
                            <span
                              className="text-[9px] px-1.5 py-0.2 rounded font-medium"
                              style={{ backgroundColor: `${cat.accentHex}15`, color: cat.accentHex, border: `1px solid ${cat.accentHex}20` }}
                            >
                              {cat.name}
                            </span>
                          )}

                          <span className={`px-1.5 py-0.2 rounded font-mono ${getDiffStyle(pattern.difficulty)}`}>
                            {pattern.difficulty}
                          </span>
                        </div>

                        {/* Vietnamese Details Description */}
                        <p className="text-[11px] text-slate-400 line-clamp-1 mb-1.5">
                          {pattern.vietnameseTitle} - {pattern.shortDescription}
                        </p>

                        {/* Tech recommendation row */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-slate-500 flex items-center">
                            <CornerDownRight className="w-2.5 h-2.5 mr-1" /> Thư viện khuyên dùng:
                          </span>
                          {pattern.libraries.map((lib, idx) => (
                            <span key={idx} className="text-[9px] font-mono px-1 rounded bg-slate-900 border border-slate-850 text-slate-300">
                              {lib}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Indicator */}
                      <div className="shrink-0 text-[10px] text-slate-500 font-mono text-right flex flex-col items-end gap-1 select-none">
                        <span className="text-emerald-500 flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" /> Ready
                        </span>
                        <span>{pattern.updatedAt.split(' ').slice(-3).join(' ')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500 text-xs">
                Không tìm thấy pattern nào khớp với từ khóa "{searchInput}". Thử tìm kiếm từ khác!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Suggested Search Chips */}
      <div className="mt-5 flex items-center justify-center flex-wrap gap-2 text-xs">
        <span className="text-slate-500 font-medium select-none">Từ khóa gợi ý:</span>
        {SUGGESTED_SEARCH_CHIPS.map((chip, index) => (
          <button
            key={index}
            onClick={() => handleChipClick(chip)}
            className="px-2.5 py-1 rounded-md text-[11px] bg-slate-800/60 border border-slate-750 hover:border-slate-650 hover:bg-slate-800 text-slate-350 hover:text-slate-100 transition-all duration-150 active:scale-95 cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
