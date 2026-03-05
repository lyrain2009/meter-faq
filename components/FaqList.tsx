/**
 * FAQ列表组件
 */

import { Faq } from '@/types/faq';
import { FaqCard } from './FaqCard';

interface FaqListProps {
  faqs: Faq[];
  emptyMessage?: string;
}

export function FaqList({
  faqs,
  emptyMessage = '暂无相关问题，请尝试其他关键词',
}: FaqListProps) {
  if (faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-300 mb-4">
          <EmptyIcon className="w-16 h-16 mx-auto" />
        </div>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {faqs.map((faq) => (
        <FaqCard key={faq.id} faq={faq} />
      ))}
    </div>
  );
}

function EmptyIcon({ className }: { className?: string }) {
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
        strokeWidth={1.5}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
