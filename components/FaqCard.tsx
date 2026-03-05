/**
 * FAQ卡片组件
 */

import Link from 'next/link';
import { Faq, CATEGORY_INFO } from '@/types/faq';

interface FaqCardProps {
  faq: Faq;
}

export function FaqCard({ faq }: FaqCardProps) {
  const category = CATEGORY_INFO[faq.category];

  return (
    <Link href={`/faq/${faq.id}`}>
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer h-full">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            {/* 分类标签 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                {category.name}
              </span>
              {faq.isHot && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600">
                  热门
                </span>
              )}
            </div>

            {/* 问题标题 */}
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2">
              {faq.question}
            </h3>

            {/* 答案预览 */}
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {extractText(faq.answer)}
            </p>

            {/* 标签和浏览量 */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {faq.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {faq.views && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <EyeIcon className="w-3 h-3" />
                  {formatNumber(faq.views)}
                </span>
              )}
            </div>
          </div>

          {/* 箭头图标 */}
          <div className="text-gray-300 flex-shrink-0 mt-1">
            <ChevronRightIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function extractText(html: string): string {
  return html
    .replace(/[#*|`\-\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}
