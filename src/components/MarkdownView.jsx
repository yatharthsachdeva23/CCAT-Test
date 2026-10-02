import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownView({ content }) {
  if (!content) return null;

  return (
    <div className="markdown-content text-slate-200 text-xs sm:text-sm leading-relaxed space-y-2.5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-bold text-white mt-3 mb-1.5 pb-1 border-b border-slate-800 flex items-center gap-1.5">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-sky-300 mt-2.5 mb-1">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-bold text-purple-300 mt-2 mb-1 uppercase tracking-wider">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 mt-1.5 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-1 text-slate-300 leading-relaxed">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-extrabold text-white bg-slate-800/60 px-1 py-0.5 rounded text-[13px]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-sky-200 not-italic font-medium">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-4 my-2 space-y-1 text-slate-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-4 my-2 space-y-1 text-slate-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-snug">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-purple-500 pl-3 my-2 text-slate-400 italic bg-purple-950/20 py-1 rounded-r">
              {children}
            </blockquote>
          ),
          code: ({ inline, children }) => {
            return inline ? (
              <code className="font-mono text-[11px] bg-slate-950 text-sky-300 px-1.5 py-0.5 rounded border border-slate-800">
                {children}
              </code>
            ) : (
              <pre className="font-mono text-xs bg-slate-950 text-slate-200 p-3 rounded-xl border border-slate-800 overflow-x-auto my-2">
                <code>{children}</code>
              </pre>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
