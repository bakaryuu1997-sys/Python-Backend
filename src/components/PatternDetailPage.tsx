/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Pattern } from '../types';
import { CATEGORIES, PATTERN_INDEX } from '../data/index';
import CodeBlock from './CodeBlock';
import { 
  ArrowLeft, Check, Copy, CheckSquare, Info, ShieldAlert, Play, 
  CornerDownRight, RefreshCw, FileCode, CheckCircle2, AlertTriangle, 
  ExternalLink, ArrowRight, Zap, Code, Package, Terminal, FileText, ClipboardList,
  Star
} from 'lucide-react';

interface PatternDetailPageProps {
  pattern: Pattern;
  onBack: () => void;
  onNavigateToPattern: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function PatternDetailPage({ 
  pattern, 
  onBack, 
  onNavigateToPattern,
  isBookmarked,
  onToggleBookmark
}: PatternDetailPageProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedStructure, setCopiedStructure] = useState(false);
  const [copiedAllCode, setCopiedAllCode] = useState(false);
  const [checkedList, setCheckedList] = useState<Record<string, boolean>>({});
  const [activeAnchor, setActiveAnchor] = useState('overview');

  // Load associated category
  const categoryInfo = CATEGORIES.find(c => c.id === pattern.category);

  // Initialize checklist state
  useEffect(() => {
    const list: Record<string, boolean> = {};
    pattern.productionChecklist.forEach((item, idx) => {
      list[`${pattern.id}_${idx}`] = item.checked || false;
    });
    setCheckedList(list);
    setActiveTabIdx(0); // Reset template tab on change
    
    // Scroll to top of article
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pattern]);

  // Handle anchor changes on scroll
  useEffect(() => {
    const handleScroll = () => {
      const anchors = [
        'overview', 'quick-decision', 'khi-nao-dung', 'recommended-stack',
        'install', 'request-flow', 'folder-structure', 'code-templates',
        'common-errors', 'production-checklist', 'related-patterns'
      ];
      
      let currentAnchor = 'overview';
      for (const anchor of anchors) {
        const el = document.getElementById(anchor);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentAnchor = anchor;
          }
        }
      }
      setActiveAnchor(currentAnchor);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleCheck = (idx: number) => {
    const key = `${pattern.id}_${idx}`;
    setCheckedList(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(pattern.installCommand);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyStructure = async () => {
    try {
      await navigator.clipboard.writeText(pattern.folderStructure);
      setCopiedStructure(true);
      setTimeout(() => setCopiedStructure(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyAllCode = async () => {
    try {
      const combined = pattern.codeTemplates.map(t => `# --- ${t.filename} ---\n${t.code}`).join('\n\n');
      await navigator.clipboard.writeText(combined);
      setCopiedAllCode(true);
      setTimeout(() => setCopiedAllCode(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveAnchor(id);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-300">
      
      {/* Back to Home Navigator button & Bookmark toggle */}
      <div className="mb-6 flex justify-between items-center select-none">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-500 hover:text-amber-400 font-mono tracking-tight cursor-pointer py-1.5 focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>QUAY LẠI DANH SÁCH BẢN ĐỒ</span>
        </button>

        <button
          onClick={() => onToggleBookmark(pattern.id)}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-slate-800 bg-[#121620] hover:bg-[#161a25] text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer focus:outline-none"
        >
          <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
          <span>{isBookmarked ? 'Đã lưu (Bookmarked)' : 'Lưu mẫu này'}</span>
        </button>
      </div>

      {/* Hero Header Area */}
      <div id="overview" className="border-b border-slate-800 pb-6 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          {categoryInfo && (
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-850 text-slate-300 border border-slate-750 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryInfo.accentHex }} />
              <span>{categoryInfo.name}</span>
            </span>
          )}
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-850 hover:bg-slate-800 text-amber-500 border border-amber-500/10">
            {pattern.difficulty} Level
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {pattern.updatedAt}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight leading-tight mb-3">
          {pattern.title}
        </h1>
        
        <p className="text-[16px] text-slate-300 leading-7 max-w-4xl">
          {pattern.shortDescription}
        </p>
      </div>

      {/* Grid Layout containing Left TOC, Center Article, Right Panel */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Table of Contents */}
        <div className="hidden lg:col-span-3 lg:block sticky top-24 select-none">
          <div className="bg-[#11141c]/40 border border-slate-850 rounded-xl p-4">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-slate-650" />
              ON THIS PAGE
            </h4>
            
            <nav className="space-y-1 text-xs">
              {[
                { id: 'overview', name: 'Mô tả tổng quan' },
                { id: 'quick-decision', name: 'Quyết định nhanh (Quick Decision)' },
                { id: 'khi-nao-dung', name: 'Khi nào nên / không nên dùng?' },
                { id: 'recommended-stack', name: 'Recommended Stack' },
                { id: 'install', name: 'Cài đặt (Install)' },
                { id: 'request-flow', name: 'Luồng xử lý (Request Flow)' },
                { id: 'folder-structure', name: 'Cấu trúc thư mục (Folder)' },
                { id: 'code-templates', name: 'Mẫu mã nguồn (Templates)' },
                { id: 'common-errors', name: 'Lỗi thường gặp (Errors)' },
                { id: 'production-checklist', name: 'Checklist đưa lên Production' },
                { id: 'related-patterns', name: 'Patterns liên quan' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToAnchor(item.id)}
                  className={`w-full text-left py-2 px-2.5 rounded-md font-medium transition-all block cursor-pointer ${
                    activeAnchor === item.id 
                    ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* CENTER COLUMN: Core Article Documentation Content */}
        <div className="col-span-12 lg:col-span-6 space-y-10">
          
          {/* Quick Decision Box */}
          <div id="quick-decision" className="bg-[#121622] border-l-4 border-amber-500 border border-slate-800 rounded-r-xl p-5 md:p-6 shadow-md">
            <div className="flex items-center space-x-2 text-amber-500 font-bold text-sm mb-3 font-mono">
              <Zap className="w-4 h-4" />
              <span>QUYẾT ĐỊNH NHANH (QUICK DECISION)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest block mb-1">
                  Xài tốt nhất khi (Best for):
                </span>
                <ul className="space-y-2 text-[13px] text-slate-200 leading-6">
                  {pattern.quickDecision.bestFor.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-emerald-400 font-bold mr-1.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest block mb-1">
                  Né tránh khi (Avoid when):
                </span>
                <ul className="space-y-2 text-[13px] text-slate-200 leading-6">
                  {pattern.quickDecision.avoidWhen.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-rose-400 font-bold mr-1.5">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Độ phức tạp sản xuất: <strong className="text-slate-300">{pattern.quickDecision.productionLevel}</strong></span>
              <span>Độ an toàn: <strong className="text-emerald-500">Chuẩn bảo mật</strong></span>
            </div>
          </div>

          {/* Decision Guidelines: When to use (Khi nào dùng) vs When not to use (Khi nào không dựng) */}
          {/* Note: This MUST appear ABOVE the code block! */}
          <div id="khi-nao-dung" className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            {/* Khi nào nên dùng */}
            <div className="bg-[#10141a] border border-emerald-500/20 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
              <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center space-x-2 font-mono">
                <CheckCircle2 className="w-4.5 h-4.5" />
                <span>KHI NÀO NÊN DÙNG?</span>
              </h3>
              <ul className="space-y-2.5 text-[13px] text-slate-200 leading-6">
                {pattern.whyUse.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Khi nào không nên dùng */}
            <div className="bg-[#120f12] border border-rose-500/20 rounded-xl p-5 hover:border-rose-500/30 transition-colors">
              <h3 className="text-sm font-bold text-rose-400 mb-3 flex items-center space-x-2 font-mono">
                <AlertTriangle className="w-4.5 h-4.5" />
                <span>KHI NÀO KHÔNG NÊN DÙNG?</span>
              </h3>
              <ul className="space-y-2.5 text-[13px] text-slate-200 leading-6">
                {pattern.whyNotUse.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Stack Badge Items */}
          <div id="recommended-stack" className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-2 font-mono tracking-wide">
              <Package className="w-4 h-4 text-amber-500" />
              <span>RECOMMENDED TECH STACK</span>
            </h3>
            <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl flex flex-wrap gap-2.5">
              {pattern.libraries.map((lib, i) => (
                <div key={i} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#141a24] border border-slate-800 text-xs text-slate-300 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{lib}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Install Command section */}
          <div id="install" className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-2 font-mono tracking-wide">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>CÀI ĐẶT THƯ VIỆN ĐỘC LẬP</span>
            </h3>
            <div className="relative group">
              <input
                type="text"
                readOnly
                value={pattern.installCommand}
                className="w-full bg-[#161a22] border border-slate-800 font-mono text-xs text-slate-300 p-4 rounded-xl pr-16 select-all focus:outline-none"
              />
              <button
                onClick={handleCopyInstall}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all cursor-pointer flex items-center space-x-1"
              >
                {copiedInstall ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] text-emerald-450">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Request Flow Timeline */}
          <div id="request-flow" className="space-y-4 select-none">
            <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-2 font-mono tracking-wide">
              <Play className="w-4 h-4 text-blue-500 fill-blue-500/20" />
              <span>LUỒNG XỬ LÝ DỮ LIỆU (REQUEST FLOW)</span>
            </h3>
            
            <div className="bg-[#11141c]/40 border border-slate-850 rounded-xl p-5 space-y-4">
              {pattern.requestFlow.map((step, idx) => {
                const parts = step.split(': ');
                const phaseName = parts[0];
                const phaseDetail = parts[1] || '';

                return (
                  <div key={idx} className="flex items-start gap-3 relative group">
                    {/* Vertical Timeline Track Line */}
                    {idx < pattern.requestFlow.length - 1 && (
                      <div className="absolute left-3.5 top-7 bottom-0 w-0.5 bg-slate-800 group-hover:bg-amber-500/20 transition-colors" />
                    )}
                    
                    {/* Circle Node */}
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    
                    {/* Details content */}
                    <div className="pt-0.5">
                      <h4 className="text-[13px] font-bold text-slate-200 tracking-wide font-mono">
                        {phaseName}
                      </h4>
                      {phaseDetail && (
                        <p className="text-[13px] text-slate-300 leading-6 mt-1">
                          {phaseDetail}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Folder Structure Layout Section */}
          <div id="folder-structure" className="space-y-3 font-mono">
            <div className="flex justify-between items-center bg-slate-900/20 p-2.5 rounded-lg border border-slate-850">
              <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-2 font-mono tracking-wide select-none">
                <FileCode className="w-4 h-4 text-violet-400" />
                <span>CẤU TRÚC THƯ MỤC CHUẨN</span>
              </h3>
              
              <button
                onClick={handleCopyStructure}
                className="text-[11px] text-amber-500 hover:text-amber-400 border border-amber-500/25 px-2.5 py-1 rounded hover:bg-amber-500/5 transition-all flex items-center space-x-1 cursor-pointer"
              >
                {copiedStructure ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Structure</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Folder Tree</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-[#141821] border border-slate-850 rounded-xl overflow-x-auto text-xs text-emerald-400 leading-relaxed font-mono">
              <pre>{pattern.folderStructure}</pre>
            </div>
          </div>

          {/* Code Templates Multi-Tab Area */}
          <div id="code-templates" className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/20 py-2 px-3 rounded-xl border border-slate-850">
              <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2 font-mono tracking-wide">
                <Code className="w-4 h-4 text-amber-500" />
                <span>MẪU THIẾT KẾ MÃ NGUỒN</span>
              </h3>
              
              <button
                onClick={handleCopyAllCode}
                className="text-xs text-amber-400 hover:text-amber-300 border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 select-none cursor-pointer"
              >
                {copiedAllCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied All Files</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All Templates</span>
                  </>
                )}
              </button>
            </div>

            {/* Tabs selector */}
            <div className="flex border-b border-slate-800 overflow-x-auto scrollbar-none select-none">
              {pattern.codeTemplates.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`py-3 px-4 text-xs font-mono font-semibold transition-all border-b-2 shrink-0 cursor-pointer flex items-center space-x-1.5 ${
                    activeTabIdx === idx 
                    ? 'border-amber-500 text-amber-400 bg-amber-500/5' 
                    : 'border-transparent text-slate-450 hover:text-slate-300 hover:bg-slate-850/30'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>{template.filename.split('/').pop()}</span>
                  {template.variant && (
                    <span className="text-[9px] uppercase rounded bg-slate-900 border border-slate-700 px-1.5 py-0.5 text-slate-300">
                      {template.variant}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Template descriptive helper text */}
            <p className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded-lg border border-slate-850 italic">
              ↳ {pattern.codeTemplates[activeTabIdx].description}
            </p>

            {/* Displaying CodeBlock with Python highlights */}
            <CodeBlock 
              filename={pattern.codeTemplates[activeTabIdx].filename}
              language={pattern.codeTemplates[activeTabIdx].language}
              code={pattern.codeTemplates[activeTabIdx].code}
            />
          </div>

          {/* Common Errors & Exceptions list */}
          <div id="common-errors" className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-2 font-mono tracking-wide">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>CÁC LỖI THƯỜNG GẶP KHI CHẠY (COMMON ERRORS)</span>
            </h3>

            <div className="space-y-4">
              {pattern.commonErrors.map((errObj, idx) => (
                <div key={idx} className="bg-[#141113] border border-rose-500/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold bg-rose-500/15 text-rose-400 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                      EXCEPTION
                    </span>
                    <span className="text-xs font-mono text-rose-350 font-bold block leading-relaxed line-clamp-2">
                      {errObj.error}
                    </span>
                  </div>
                  
                  <div className="pl-2 border-l border-slate-800 space-y-2 font-sans text-xs">
                    <p className="text-slate-400">
                      <strong className="text-slate-300 font-mono text-[11px]">Nguyên nhân:</strong> {errObj.cause}
                    </p>
                    <p className="text-slate-305">
                      <strong className="text-emerald-500 font-mono text-[11px]">Khắc phục:</strong> <code className="bg-slate-950 p-1 rounded border border-slate-850 font-mono text-[11px] text-emerald-450">{errObj.fix}</code>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Production Checklist Interactive Cards */}
          <div id="production-checklist" className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 flex items-center space-x-2 font-mono tracking-wide select-none">
              <CheckSquare className="w-4 h-4 text-emerald-500" />
              <span>BIÊN TIÊN CHECKLIST ĐƯA LÊN PRODUCTION</span>
            </h3>

            <p className="text-xs text-slate-450 leading-relaxed italic">
              Nhấp trực tiếp vào các ô bên dưới tương tác để đánh dấu tiến độ công việc chuẩn hoá hệ thống của bạn trước khi đưa backend vào hoạt động thực tế.
            </p>

            <div className="bg-[#11141c]/50 border border-slate-850 rounded-xl divide-y divide-slate-850 overflow-hidden font-sans">
              {pattern.productionChecklist.map((item, idx) => {
                const isChecked = checkedList[`${pattern.id}_${idx}`] || false;
                return (
                  <div 
                    key={idx}
                    onClick={() => handleToggleCheck(idx)}
                    className={`p-4 flex gap-3 cursor-pointer items-start hover:bg-[#161a25] transition-colors ${
                      isChecked ? 'bg-emerald-500/[0.015]' : ''
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                        isChecked 
                        ? 'bg-emerald-600 border-emerald-500 text-slate-950' 
                        : 'border-slate-650 bg-slate-950 hover:border-slate-500'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className={`text-xs font-semibold tracking-wide ${
                        isChecked ? 'text-slate-400 line-through' : 'text-slate-200'
                      }`}>
                        {item.task}
                      </h4>
                      <p className={`text-xs mt-1 leading-relaxed ${
                        isChecked ? 'text-slate-500' : 'text-slate-450'
                      }`}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Patterns list section */}
          <div id="related-patterns" className="py-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-400 flex items-center space-x-2 font-mono tracking-wider select-none mb-4">
              <span>BẢN ĐỒ LIÊN QUAN (RELATED PATTERN_INDEX)</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PATTERN_INDEX.filter(p => pattern.relatedPatterns.includes(p.id)).map((relPattern) => (
                <div
                  key={relPattern.id}
                  onClick={() => onNavigateToPattern(relPattern.id)}
                  className="bg-[#11141b] border border-slate-850 hover:border-slate-750 p-4 rounded-xl cursor-pointer transition-all active:scale-[0.98] group flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {relPattern.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {relPattern.vietnameseTitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Action and Quick Operations panel */}
        <div className="col-span-12 lg:col-span-3 sticky top-24 space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-[#121620] border border-slate-800 rounded-xl p-4.5 space-y-4 shadow-lg select-none">
            <span className="text-[10px] font-bold font-mono tracking-widest text-slate-550 block">
              QUICK ACTIONS
            </span>
            
            <div className="space-y-2.5">
              <button
                onClick={handleCopyAllCode}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-[#0d0f12] font-extrabold text-xs rounded-lg cursor-pointer flex items-center justify-center space-x-1.5 transition-colors shadow"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Copy Code Template</span>
              </button>

              <button
                onClick={handleCopyInstall}
                className="w-full py-2 px-4 border border-slate-750 text-slate-300 hover:text-slate-100 hover:bg-slate-800 text-xs rounded-lg cursor-pointer flex items-center justify-center space-x-1.5 transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copy Install CMD</span>
              </button>

              <button
                onClick={handleCopyStructure}
                className="w-full py-2 px-4 border border-slate-750 text-slate-300 hover:text-slate-100 hover:bg-slate-800 text-xs rounded-lg cursor-pointer flex items-center justify-center space-x-1.5 transition-all bg-[#141821]/50"
              >
                <Package className="w-3.5 h-3.5" />
                <span>Copy Folder Tree</span>
              </button>
            </div>
          </div>

          {/* Quick Related Side link items */}
          <div className="bg-[#121620]/60 border border-slate-850 rounded-xl p-4">
            <span className="text-[10px] font-bold font-mono tracking-widest text-slate-550 block mb-3">
              RELATED ARCHITECTURES
            </span>
            
            <div className="divide-y divide-slate-850 text-xs">
              {[
                { name: 'PDF OCR API processing', pattern: 'image-ocr-api' },
                { name: 'Upload Image to AWS S3', pattern: 'image-ocr-api' },
                { name: 'Celery Background Pipeline', pattern: 'celery-worker-setup' },
                { name: 'Secure Input File Validation', pattern: 'image-ocr-api' },
                { name: 'FastAPI S3 Direct Upload', pattern: 'image-ocr-api' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigateToPattern(item.pattern)}
                  className="w-full text-left py-2.5 text-slate-400 hover:text-amber-400 transition-colors flex items-center justify-between group cursor-pointer focus:outline-none"
                >
                  <span className="font-mono text-[11px] font-semibold">{item.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-650 group-hover:text-amber-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Security & Operational warnings notes block */}
          <div className="bg-[#141113] border border-rose-500/10 rounded-xl p-4.5 space-y-3 shadow-md select-none">
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>PRODUCTION NOTE WRAPPERS</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-400 list-disc pl-4 leading-relaxed font-sans">
              <li>
                <strong className="text-slate-350">Validate MIME type:</strong> Tuyệt đối không tin tưởng file extension thô của Client. Dùng python-magic đọc byte thô tệp tin.
              </li>
              <li>
                <strong className="text-slate-355">Limit file size:</strong> Giới hạn request body ở mức thấp nhất (Ví dụ 5MB cho ảnh, 20MB cho văn bản) chặn treo RAM.
              </li>
              <li>
                <strong className="text-slate-355">Do not log OCR:</strong> Cấu hình hệ thống logger không in nội dung văn bản nhạy cảm chứa số tài khoản/số CCCD của khách.
              </li>
              <li>
                <strong className="text-slate-355">Background jobs:</strong> Các ảnh nặng hoặc tệp tin nén tốn nhiều giây bắt buộc dồn về hàng đợi Celery.
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
