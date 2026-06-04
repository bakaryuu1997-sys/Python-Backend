/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  filename?: string;
  language?: string;
  code: string;
}

export default function CodeBlock({ filename, language = 'python', code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Safe and clean regex-based Python highlighter for aesthetic visualization
  const highlightPythonLine = (line: string): React.ReactNode[] => {
    // 1. Check if line is empty
    if (!line.trim()) {
      return [<span key="empty" className="syntax-text">&nbsp;</span>];
    }

    // 2. Check if line is entirely a comment
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      return [<span key="comment" className="syntax-comment">{line}</span>];
    }

    // Capture inline comment if it exists
    let mainContent = line;
    let commentContent = '';
    const hashIndex = line.indexOf(' #'); // Notice space before hash to prevent URL hashes
    if (hashIndex !== -1 && !line.substring(0, hashIndex).includes('"') && !line.substring(0, hashIndex).includes("'")) {
      mainContent = line.substring(0, hashIndex);
      commentContent = line.substring(hashIndex);
    } else if (trimmed.startsWith('"""') || trimmed.startsWith('\'\'\'')) {
      return [<span key="multi-comment" className="syntax-comment">{line}</span>];
    }

    const segments: React.ReactNode[] = [];
    let currentIdx = 0;

    // Tokenizer or basic regex helper to color code text
    // We can do a string-based highlighting using span elements or a series of string replacements
    // Below is a robust light-parser for common keywords
    const keywords = [
      'def', 'return', 'class', 'try', 'except', 'raise', 'if', 'elif', 'else', 
      'import', 'from', 'as', 'and', 'or', 'not', 'in', 'is', 'await', 'async', 
      'with', 'payload', 'for', 'while', 'pass'
    ];

    const words = mainContent.split(/(\s+|=|\(|\)|\{|\}|\[|\]|,|:|\.|\+|-|\*|\/)/);

    words.forEach((word, idx) => {
      const trimmedWord = word.trim();
      
      // Decorator detection
      if (trimmedWord.startsWith('@')) {
        segments.push(<span key={idx} className="syntax-decorator">{word}</span>);
      }
      // String quotes detection
      else if (trimmedWord.startsWith('"') || trimmedWord.startsWith("'")) {
        segments.push(<span key={idx} className="syntax-string">{word}</span>);
      }
      // Keyword detection
      else if (keywords.includes(trimmedWord)) {
        segments.push(<span key={idx} className="syntax-keyword">{word}</span>);
      }
      // Numeric values
      else if (/^\d+$/.test(trimmedWord)) {
        segments.push(<span key={idx} className="syntax-number">{word}</span>);
      }
      // Function names (when followed directly by a bracket, or standard classes)
      else if (idx < words.length - 1 && words[idx + 1].startsWith('(') && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmedWord)) {
        segments.push(<span key={idx} className="syntax-function">{word}</span>);
      }
      // Standard exceptions / common types
      else if (['HTTPException', 'ValueError', 'Exception', 'status', 'str', 'int', 'dict', 'list', 'bytes', 'io', 'APIRouter', 'UploadFile', 'File', 'PaddleOCR'].includes(trimmedWord)) {
        segments.push(<span key={idx} className="syntax-class">{word}</span>);
      }
      // Normal text
      else {
        segments.push(<span key={idx} className="syntax-text">{word}</span>);
      }
    });

    if (commentContent) {
      segments.push(<span key="comment-segment" className="syntax-comment">{commentContent}</span>);
    }

    return segments;
  };

  // Highlights a bash terminal command
  const highlightBashLine = (line: string): React.ReactNode => {
    if (line.trim().startsWith('#')) {
      return <span className="syntax-comment">{line}</span>;
    }
    if (line.trim().startsWith('pip install') || line.trim().startsWith('docker run')) {
      const parts = line.split(/(\spip\s|\sinstall\s|\sdocker\s|\srun\s)/);
      return (
        <span>
          {parts.map((p, i) => {
            const t = p.trim();
            if (t === 'pip' || t === 'docker') return <span key={i} className="syntax-keyword font-semibold">{p}</span>;
            if (t === 'install' || t === 'run') return <span key={i} className="syntax-function">{p}</span>;
            if (p.startsWith('-')) return <span key={i} className="syntax-decorator">{p}</span>;
            return <span key={i} className="syntax-text">{p}</span>;
          })}
        </span>
      );
    }
    return <span className="syntax-text">{line}</span>;
  };

  const lines = code.split('\n');

  return (
    <div id={`codeblock_${filename || language}`} className="w-full rounded-xl overflow-hidden border border-slate-800 bg-[#161a22] shadow-xl my-4 font-mono text-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1b202a] border-b border-slate-800 select-none">
        <div className="flex items-center space-x-2">
          {language === 'bash' ? (
            <Terminal className="w-4 h-4 text-emerald-400" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          )}
          <span className="text-xs font-medium text-slate-400 font-mono">
            {filename || (language === 'bash' ? 'terminal' : `template.${language}`)}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 select-none">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors active:scale-95 duration-100"
            title="Copy to Clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium font-sans">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="font-sans">Copy code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 overflow-x-auto leading-relaxed max-h-[550px] scrollbar-thin">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              // Handle trailing empty line
              if (idx === lines.length - 1 && !line) return null;
              
              return (
                <tr key={idx} className="hover:bg-slate-800/20 leading-5">
                  <td className="w-8 text-[11px] select-none text-slate-600 text-right pr-4 align-top font-mono">
                    {idx + 1}
                  </td>
                  <td className="text-left whitespace-pre pl-2 font-mono">
                    {language === 'python' ? highlightPythonLine(line) : highlightBashLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
