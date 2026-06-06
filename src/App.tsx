/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  Terminal, Zap, Feather, Database, KeyRound, Upload, FileText, Clock, 
  Layers, CreditCard, CheckSquare, Cpu, Sparkles, BookOpen, HelpCircle, 
  Activity, Code, Copy, Check, ExternalLink, ShieldCheck, ChevronRight, 
  Search, ArrowRight, CornerDownRight, FileCode, Trophy, Star
} from 'lucide-react';

import { CATEGORIES, PATTERN_INDEX, LIBRARIES, loadPatternById } from './data/index';
import { searchPatterns, formatMatchedFields } from './lib/search';
import { Pattern, SearchResult } from './types';
import SuggestedSearch from './components/SuggestedSearch';
import DecisionCardGrid from './components/DecisionCardGrid';
const PatternDetailPage = lazy(() => import('./components/PatternDetailPage'));


function SimpleCodePreview({ filename, code }: { filename: string; code: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b0e14] overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-3 py-2">
        <span className="font-mono text-[11px] text-slate-400">{filename}</span>
        <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">Preview</span>
      </div>
      <pre className="max-h-[320px] overflow-auto p-4 text-[12px] leading-6 text-slate-300">
        <code>{code || '# Mở pattern chi tiết để lazy-load code template đầy đủ.'}</code>
      </pre>
    </div>
  );
}

// Map string icon names to Lucide icons
function renderSidebarIcon(iconName: string, className: string) {
  switch (iconName) {
    case 'Terminal': return <Terminal className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Feather': return <Feather className={className} />;
    case 'Database': return <Database className={className} />;
    case 'KeyRound': return <KeyRound className={className} />;
    case 'Upload': return <Upload className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'CreditCard': return <CreditCard className={className} />;
    case 'CheckSquare': return <CheckSquare className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    default: return <FileText className={className} />;
  }
}

export default function App() {
  const [activePatternId, setActivePatternId] = useState<string | null>(null);
  const [activePattern, setActivePattern] = useState<Pattern | null>(null);
  const [isLoadingPattern, setIsLoadingPattern] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [libraryFilter, setLibraryFilter] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('python-backend-bookmarks') || '[]');
    } catch {
      return [];
    }
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('python-backend-bookmarks', JSON.stringify(next));
      return next;
    });
  };
  
  // Featured template tabs on Home Page
  const [featuredTab, setFeaturedTab] = useState<'router' | 'service' | 'tree'>('router');
  const [copiedFeatured, setCopiedFeatured] = useState(false);
  const [activeNav, setActiveNav] = useState<'documentation' | 'patterns' | 'decision' | 'libraries'>('documentation');

  const closePatternDetail = () => {
    setActivePatternId(null);
    setActivePattern(null);
    setIsLoadingPattern(false);
  };

  const openPatternDetail = async (patternId: string) => {
    setActivePatternId(patternId);
    setIsLoadingPattern(true);
    try {
      const loaded = await loadPatternById(patternId);
      setActivePattern(loaded);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoadingPattern(false);
    }
  };

  // Lightweight homepage preview. Full OCR templates are lazy-loaded on the pattern detail page.
  const featuredOCRCode = `@router.post("/ocr")
async def read_text_from_image(file: UploadFile = File(...)):
    validate_image_upload(file)
    text = await ocr_service.extract_text(file)
    return {"text": text}`;

  const featuredOCRPreprocess = `def preprocess_image(image: Image.Image) -> np.ndarray:
    gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
    denoised = cv2.fastNlMeansDenoising(gray)
    return denoised`;

  const featuredOCRTree = `app/
├── routers/ocr_router.py
├── services/ocr_service.py
├── services/image_preprocess.py
└── schemas/ocr_schema.py`;

  const handleCopyFeatured = async () => {
    try {
      const codeToCopy = featuredTab === 'router' 
        ? featuredOCRCode 
        : featuredTab === 'service' 
        ? featuredOCRPreprocess 
        : featuredOCRTree;
      await navigator.clipboard.writeText(codeToCopy);
      setCopiedFeatured(true);
      setTimeout(() => setCopiedFeatured(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Safe scroll helper for navigation headers
  const handleNavClick = (nav: 'documentation' | 'patterns' | 'decision' | 'libraries') => {
    setActiveNav(nav);
    closePatternDetail(); // Return to home view
    setCategoryFilter(null); // Reset category filter
    setDifficultyFilter(null);
    setLibraryFilter(null);
    setShowBookmarksOnly(false);
    
    setTimeout(() => {
      let targetId = '';
      if (nav === 'patterns') targetId = 'popular_patterns_section';
      if (nav === 'decision') targetId = 'decision_guide_section';
      if (nav === 'libraries') targetId = 'libraries_section';
      if (nav === 'documentation') targetId = 'search_component_root';

      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  // Format difficulty label in Vietnamese
  const getVietnameseDifficulty = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'Bản dễ';
      case 'Medium': return 'Trung bình';
      case 'Advanced': return 'Nâng cao';
      default: return 'Tiêu chuẩn';
    }
  };

  // Search and filter patterns using the static search spec: title, use cases, libraries, templates, synonyms.
  const searchedResults: SearchResult[] = searchQuery.trim()
    ? searchPatterns(PATTERN_INDEX, searchQuery)
    : PATTERN_INDEX.map((pattern, idx) => ({ pattern, score: 1000 - idx, matchedFields: [], matchedTerms: [] }));

  const libraryOptions = Array.from(new Set(PATTERN_INDEX.flatMap(pattern => pattern.libraries))).sort((a, b) => a.localeCompare(b));
  const difficultyOptions = ['Easy', 'Medium', 'Advanced'];

  const displayedResults = searchedResults.filter(result => {
    const pattern = result.pattern;
    const matchesCategory = categoryFilter ? pattern.category === categoryFilter : true;
    const matchesDifficulty = difficultyFilter ? pattern.difficulty === difficultyFilter : true;
    const matchesLibrary = libraryFilter ? pattern.libraries.includes(libraryFilter) : true;
    const matchesBookmarks = showBookmarksOnly ? bookmarks.includes(pattern.id) : true;
    return matchesCategory && matchesDifficulty && matchesLibrary && matchesBookmarks;
  });

  const displayedPatterns = displayedResults.map(result => result.pattern);
  const hasActiveFilters = Boolean(categoryFilter || difficultyFilter || libraryFilter || searchQuery.trim() || showBookmarksOnly);

  const resetAllFilters = () => {
    setCategoryFilter(null);
    setDifficultyFilter(null);
    setLibraryFilter(null);
    setSearchQuery('');
    setShowBookmarksOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300 font-sans flex flex-col selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0d1017]/90 backdrop-blur border-b border-slate-800/80 select-none">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          {/* Left: Logo brand */}
          <div 
            onClick={() => {
              closePatternDetail();
              setCategoryFilter(null);
              setDifficultyFilter(null);
              setLibraryFilter(null);
              setShowBookmarksOnly(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 cursor-pointer group active:scale-95 duration-150 shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-900/10 transition-transform group-hover:scale-105">
              <span className="font-mono font-black text-slate-950 text-sm">Py</span>
            </div>
            <div>
              <span className="text-sm font-black text-slate-100 tracking-tight block">
                Python Backend Compass
              </span>
              <span className="text-[10px] font-mono text-amber-500/95 font-medium -mt-1 block uppercase tracking-widest">
                Decision-First Map
              </span>
            </div>
          </div>

          {/* Center: Interactive Nav labels */}
          <nav className="hidden md:flex items-center space-x-1.5 text-xs font-semibold">
            {[
              { id: 'documentation', label: 'Documentation' },
              { id: 'patterns', label: 'Patterns' },
              { id: 'decision', label: 'Decision Guide' },
              { id: 'libraries', label: 'Libraries' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  activeNav === tab.id && !activePatternId
                    ? 'text-amber-400 bg-amber-500/[0.06] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right: Trigger action button */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => {
                openPatternDetail('image-ocr-api'); // Lazy-load OCR detail template
              }}
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono tracking-tight cursor-pointer transition-colors active:scale-95 duration-105"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Copy Starter Template</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. CORE LAYOUT WRAPPER ( sidebar left + dashboard content right ) */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 md:px-6 py-6 flex gap-6 items-start">
        
        {/* LEFT FIXED COLUMN SIDEBAR */}
        <aside className="hidden md:block w-64 select-none shrink-0 sticky top-22">
          
          <div id="sidebar_categories_rail" className="space-y-4">
            <div className="px-2">
              <span className="text-[11px] font-bold font-mono text-slate-500 uppercase tracking-widest block mb-1">
                Backend Categories
              </span>
              <p className="text-[10px] text-slate-550 leading-relaxed">
                Lọc bản đồ theo chủ đề cụ thể
              </p>
            </div>

            {/* General Filter Node */}
            <button
              onClick={() => {
                setCategoryFilter(null);
                setDifficultyFilter(null);
                setLibraryFilter(null);
                setShowBookmarksOnly(false);
                closePatternDetail();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                categoryFilter === null && !showBookmarksOnly && !activePatternId
                  ? 'bg-slate-850 text-amber-400 border border-slate-750 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/40'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Show All Patterns</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-850 text-slate-450 px-1.5 py-0.2 rounded">
                {PATTERN_INDEX.length}
              </span>
            </button>

            {/* Bookmarks Filter Node */}
            <button
              onClick={() => {
                setShowBookmarksOnly(!showBookmarksOnly);
                setCategoryFilter(null);
                setDifficultyFilter(null);
                setLibraryFilter(null);
                closePatternDetail();
                setTimeout(() => {
                  const el = document.getElementById('popular_patterns_section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                showBookmarksOnly && !activePatternId
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/35 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/40'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Star className={`w-4 h-4 ${showBookmarksOnly ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
                <span>My Bookmarks</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-850 text-slate-450 px-1.5 py-0.2 rounded">
                {bookmarks.length}
              </span>
            </button>

            {/* List Categories */}
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isSelected = categoryFilter === cat.id && !activePatternId;
                const matchesCount = PATTERN_INDEX.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoryFilter(cat.id);
                      setShowBookmarksOnly(false);
                      closePatternDetail(); // Bring back to list view
                      setActiveNav('documentation');
                      setTimeout(() => {
                        const el = document.getElementById('popular_patterns_section');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer group focus:outline-none ${
                      isSelected
                        ? 'bg-[#151c27]/90 border-l-2 shadow font-bold'
                        : 'text-slate-300 hover:bg-slate-850/40'
                    }`}
                    style={{
                      borderLeftColor: isSelected ? cat.accentHex : 'transparent',
                      color: isSelected ? cat.accentHex : '#cbd5e1'
                    }}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0 pr-2" style={{ color: isSelected ? cat.accentHex : undefined }}>
                      {renderSidebarIcon(cat.icon, `w-4 h-4 shrink-0 transition-colors ${
                        isSelected ? '' : 'text-slate-500 group-hover:text-slate-400'
                      }`)}
                      <span className="truncate">{cat.name}</span>
                    </div>
                    {matchesCount > 0 && (
                      <span className="text-[10px] font-mono font-medium text-slate-500">
                        {matchesCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </aside>

        {/* RIGHT CONTENT COLUMN ( THE ACTIVE WORKSPACE DASHBOARD ) */}
        <main className="flex-1 min-w-0">

          {activePatternId && activePattern ? (
            
            /* SCREEN A: DETAILED PATTERN DOCUMENTATION PAGE */
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[60vh] w-full">
                <div className="rounded-2xl border border-slate-800 bg-[#11141b] px-6 py-5 text-slate-300 shadow-xl">
                  <div className="text-sm font-bold text-slate-100">Đang tải giao diện pattern...</div>
                  <div className="text-xs text-slate-550 mt-1">Pattern detail và code highlighter được tách khỏi bundle đầu trang.</div>
                </div>
              </div>
            }>
              <PatternDetailPage
                pattern={activePattern}
                onBack={closePatternDetail}
                onNavigateToPattern={(id) => openPatternDetail(id)}
                isBookmarked={bookmarks.includes(activePattern.id)}
                onToggleBookmark={toggleBookmark}
              />
            </Suspense>

          ) : (
            
            /* SCREEN B: HOMEPAGE / DASHBOARD GRID */
            <div className="space-y-12">
              
              {/* Hero & Interacting Search Box */}
              <SuggestedSearch
                onSelectPattern={(patternId) => openPatternDetail(patternId)}
                onSearchQuery={(query) => setSearchQuery(query)}
              />

              {!hasActiveFilters && (
                <>
                  {/* “Bạn muốn làm chức năng gì?” Grid block */}
                  <DecisionCardGrid
                    onSelectPattern={(patternId) => openPatternDetail(patternId)}
                  />

                  {/* Featured Template & Multi-Tab VSCode panel */}
                  <div className="bg-[#121620] border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 select-none pb-4 border-b border-slate-850">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 bg-amber-500/15 rounded-lg text-amber-400">
                          <Sparkles className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                          <h2 className="text-base font-extrabold text-slate-100 tracking-tight">
                            Template Việt Hóa Nổi Bật: Image OCR API (PaddleOCR, PIL & OpenCV)
                          </h2>
                          <span className="text-[11px] font-mono text-slate-450 block mt-0.5">
                            Thiết kế cấu trúc mã nguồn tối thiểu 3 lớp phục vụ trích xuất ký tự ảnh chụp chất lượng cao
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyFeatured}
                          className="px-3.5 py-2 border border-slate-750 text-slate-350 hover:text-slate-100 hover:bg-slate-850 text-xs font-mono rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                        >
                          {copiedFeatured ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Mở rộng / Copy</span>
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => openPatternDetail('image-ocr-api')}
                          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                        >
                          <span>Xem Full Pattern</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sub title files navigator tabs */}
                    <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none select-none">
                      {[
                        { id: 'router', name: 'app/routers/ocr_router.py', desc: 'API Router' },
                        { id: 'service', name: 'app/services/image_preprocess.py', desc: 'OpenCV Processing' },
                        { id: 'tree', name: 'File Structure Tree', desc: 'Cấu trúc thư mục' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setFeaturedTab(tab.id as any)}
                          className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                            featuredTab === tab.id 
                              ? 'bg-amber-500/10 border-amber-500/35 text-amber-400 font-semibold' 
                              : 'border-slate-800 bg-slate-950 text-slate-450 hover:text-slate-200'
                          }`}
                        >
                          {tab.name} <span className="text-[9px] text-slate-500 font-sans">({tab.desc})</span>
                        </button>
                      ))}
                    </div>

                    {/* Display highlighted sub codes */}
                    <div className="mt-2">
                      {featuredTab === 'router' && (
                        <SimpleCodePreview filename="app/routers/ocr_router.py" code={featuredOCRCode} />
                      )}
                      {featuredTab === 'service' && (
                        <SimpleCodePreview filename="app/services/image_preprocess.py" code={featuredOCRPreprocess} />
                      )}
                      {featuredTab === 'tree' && (
                        <div className="bg-[#141821] p-4 border border-slate-800 rounded-xl text-xs text-emerald-400 font-mono">
                          <pre>{featuredOCRTree}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}


              {/* "Pattern Phổ Biến" Section */}
              <div id="popular_patterns_section" className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3 select-none">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-amber-500" />
                    <h2 className="text-xl font-bold text-slate-100 tracking-tight">
                      Bản đồ thiết kế & Pattern phổ biến
                    </h2>
                  </div>
                  
                  {categoryFilter && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Đang lọc theo category</span>
                      <button
                        onClick={() => setCategoryFilter(null)}
                        className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] uppercase font-mono rounded hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        Reset Lọc [x]
                      </button>
                    </div>
                  )}
                </div>


                <div className="rounded-2xl border border-slate-800 bg-[#111722] p-4 shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
                        <Search className="h-4 w-4 text-amber-400" />
                        <span>Bộ lọc pattern</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Lọc nhanh theo category, độ khó và thư viện. Kết quả hiện tại: <strong className="text-slate-200">{displayedResults.length}</strong> / {PATTERN_INDEX.length} patterns.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:min-w-[720px]">
                      <label className="space-y-1 text-left">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">Category</span>
                        <select
                          value={categoryFilter ?? ''}
                          onChange={(event) => setCategoryFilter(event.target.value || null)}
                          className="w-full rounded-lg border border-slate-700 bg-[#171d29] px-3 py-2 text-xs font-semibold text-slate-200 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/10"
                        >
                          <option value="">Tất cả category</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1 text-left">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">Difficulty</span>
                        <select
                          value={difficultyFilter ?? ''}
                          onChange={(event) => setDifficultyFilter(event.target.value || null)}
                          className="w-full rounded-lg border border-slate-700 bg-[#171d29] px-3 py-2 text-xs font-semibold text-slate-200 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/10"
                        >
                          <option value="">Tất cả độ khó</option>
                          {difficultyOptions.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>{getVietnameseDifficulty(difficulty)}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1 text-left">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">Library</span>
                        <select
                          value={libraryFilter ?? ''}
                          onChange={(event) => setLibraryFilter(event.target.value || null)}
                          className="w-full rounded-lg border border-slate-700 bg-[#171d29] px-3 py-2 text-xs font-semibold text-slate-200 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/10"
                        >
                          <option value="">Tất cả thư viện</option>
                          {libraryOptions.map((library) => (
                            <option key={library} value={library}>{library}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-3 text-[11px]">
                      <span className="font-mono font-semibold uppercase tracking-wider text-slate-500">Đang áp dụng:</span>
                      {searchQuery.trim() && <span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-amber-300">Search: {searchQuery}</span>}
                      {categoryFilter && <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-200">Category: {CATEGORIES.find(cat => cat.id === categoryFilter)?.name ?? categoryFilter}</span>}
                      {difficultyFilter && <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-200">Difficulty: {getVietnameseDifficulty(difficultyFilter)}</span>}
                      {libraryFilter && <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-slate-200">Library: {libraryFilter}</span>}
                      {showBookmarksOnly && <span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-amber-300 flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Bookmarks</span>}
                      <button
                        onClick={resetAllFilters}
                        className="ml-auto rounded-md border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 font-mono font-semibold text-rose-300 hover:bg-rose-500/15"
                      >
                        Reset tất cả
                      </button>
                    </div>
                  )}
                </div>

                {displayedPatterns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedResults.map((result) => {
                      const pattern = result.pattern;
                      return (
                      <div
                        key={pattern.id}
                        onClick={() => openPatternDetail(pattern.id)}
                        className="group flex flex-col justify-between bg-[#11141b] border border-slate-800/80 hover:border-slate-700 rounded-xl p-5 hover:bg-[#151923] cursor-pointer transition-all-custom shadow relative overflow-hidden"
                      >
                        {/* Bookmark button on card */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(pattern.id);
                          }}
                          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 backdrop-blur text-slate-500 hover:text-amber-400 hover:border-slate-700 transition-all cursor-pointer"
                        >
                          <Star className={`w-3.5 h-3.5 ${bookmarks.includes(pattern.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>

                        {/* Dynamic edge indicator */}
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-700 group-hover:bg-amber-500 transition-colors" />

                        <div className="pl-2">
                          <div className="flex justify-between items-start mb-3 select-none gap-2 pr-6">
                            <span className="text-[10px] font-mono text-slate-500">
                              {pattern.updatedAt}
                            </span>
                            <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded-full ${
                              pattern.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' :
                              pattern.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                              'bg-rose-500/10 text-rose-400'
                            }`}>
                              {pattern.difficulty} Level
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-500 leading-snug tracking-tight mb-2 transition-colors">
                            {pattern.title}
                          </h3>

                          <p className="text-sm text-slate-300 line-clamp-3 leading-6 mb-3 search-highlight-text">
                            {pattern.vietnameseTitle} — {pattern.shortDescription}
                          </p>
                          {searchQuery.trim() && result.matchedFields.length > 0 && (
                            <div className="mb-4 inline-flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/[0.07] px-2 py-1 text-[10px] text-amber-300 font-mono">
                              Matched by: {formatMatchedFields(result.matchedFields)}
                            </div>
                          )}
                        </div>

                        <div className="pl-2 pt-3 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono select-none">
                          <div className="flex gap-1.5 flex-wrap">
                            {pattern.libraries.slice(0, 3).map((lib, i) => (
                              <span key={i} className="text-slate-400 font-semibold">{lib}</span>
                            ))}
                          </div>
                          <span className="text-amber-500 group-hover:translate-x-0.5 duration-150 transition-transform font-sans font-semibold text-xs flex items-center space-x-0.5">
                            <span>Sắp xếp copy </span>
                            <span>→</span>
                          </span>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-500 text-xs bg-slate-950/60 rounded-xl border border-dashed border-slate-800">
                    Không tìm thấy pattern nào phù hợp với bộ lọc hiển thị hiện có của bạn. Hãy click vào "Show All Patterns" phía cột trái để xem tất cả.
                  </div>
                )}
              </div>

              {/* “Thư viện nên biết” Section */}
              <div id="libraries_section" className="space-y-6 select-none bg-slate-950/40 border border-slate-850 p-6 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-slate-100 tracking-tight">
                    Thư viện nên biết (Python Library Guides)
                  </h2>
                </div>
                
                <p className="text-sm text-slate-400 leading-relaxed">
                  Tổng hợp thông số các gói tệp tin thư viện lập trình backend Python kinh điển giúp bạn dọn dẹp các quyết định cài đặt nhanh hơn.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {LIBRARIES.map((lib, i) => {
                    return (
                      <div key={i} className="bg-[#121620] border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold font-mono text-slate-100">{lib.name}</span>
                            <span className="text-[10px] text-slate-500 bg-slate-950 border border-slate-850 px-1.5 py-0.2 rounded font-mono">
                              {lib.relatedPatternCount} patterns
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-3">
                            {lib.description}
                          </p>

                          <div className="mb-4">
                            <span className="text-[10px] font-mono font-semibold text-slate-500 block uppercase tracking-wider mb-1">
                              Khi nào dùng?
                            </span>
                            <p className="text-xs text-slate-350 leading-relaxed">
                              {lib.whenToUse}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-850 space-y-2">
                          <code className="text-[10px] font-mono bg-slate-955 p-1.5 rounded block text-emerald-400 border border-slate-900 select-all overflow-hidden truncate">
                            {lib.installCommand}
                          </code>
                          
                          <a
                            href={lib.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono hover:text-amber-400 text-slate-500 flex items-center space-x-1 font-semibold justify-end"
                          >
                            <span>Trang chủ thư viện</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* 3. FOOTER */}
      <footer className="bg-[#0b0c10] border-t border-slate-900 text-slate-600 select-none py-8 mt-16 font-mono text-xs text-center">
        <div className="max-w-[1600px] mx-auto px-4 space-y-2">
          <p className="text-slate-500 font-semibold font-sans tracking-wide">
            Python Backend Compass — Tập Bản Đồ Tra Cứu Tác Vụ Backend Độc Lập
          </p>
          <p className="text-[11px] text-slate-600 max-w-xl mx-auto leading-relaxed">
            Hệ thống tĩnh cung cấp giải pháp, hướng dẫn công nghệ, copy code thô miễn phí được nén nhẹ chạy online-first trên trình duyệt.
          </p>
          <div className="pt-3 text-[10px] text-slate-700 flex justify-center items-center gap-1.5 flex-wrap">
            <span>FastAPI 0.111+</span>
            <span>•</span>
            <span>Django 5.0+</span>
            <span>•</span>
            <span>Pytest 8.0+</span>
            <span>•</span>
            <span>PaddleOCR 2.7+</span>
            <span>•</span>
            <span>Celery 5.4+</span>
          </div>
        </div>
      </footer>

      {/* No active paying overlays */}

    </div>
  );
}

