/**
 * FAQ详情页
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFaqById, getRelatedFaqs, getAllFaqs } from '@/data/faqs';
import { CATEGORY_INFO } from '@/types/faq';

interface PageProps {
  params: Promise<{ id: string }>;
}

/** 静态生成所有FAQ详情页 */
export async function generateStaticParams() {
  const faqs = getAllFaqs();
  return faqs.map((faq) => ({
    id: faq.id,
  }));
}

export default async function FaqDetailPage({ params }: PageProps) {
  const { id } = await params;
  const faq = getFaqById(id);

  if (!faq) {
    notFound();
  }

  const category = CATEGORY_INFO[faq.category];
  const relatedFaqs = getRelatedFaqs(id, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          返回列表
        </Link>
      </div>

      {/* 文章头部 */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6">
        {/* 分类标签 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
            {category.name}
          </span>
          {faq.isHot && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600">
              热门
            </span>
          )}
        </div>

        {/* 标题 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {faq.question}
        </h1>

        {/* 元信息 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            更新于 {faq.updatedAt}
          </span>
          {faq.views && (
            <span className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              {faq.views.toLocaleString()} 次浏览
            </span>
          )}
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mt-4">
          {faq.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 答案内容 */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
        <article className="prose prose-gray max-w-none">
          <div
            className="faq-content text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatAnswer(faq.answer) }}
          />
        </article>
      </div>

      {/* 相关问题 */}
      {relatedFaqs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            相关问题
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {relatedFaqs.map((relatedFaq, index) => (
              <Link
                key={relatedFaq.id}
                href={`/faq/${relatedFaq.id}`}
                className={`block p-4 hover:bg-gray-50 transition-colors ${
                  index !== relatedFaqs.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-700 font-medium">
                      {relatedFaq.question}
                    </span>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 底部操作 */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
        <div className="text-sm text-gray-500">
          问题未解决？
        </div>
        <a
          href="tel:95598"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <PhoneIcon className="w-4 h-4" />
          联系客服 95598
        </a>
      </div>
    </div>
  );
}

/**
 * 格式化答案文本
 * 将Markdown风格的文本转换为HTML
 */
function formatAnswer(text: string): string {
  let html = escapeHtml(text);

  // 处理标题 ###
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h1>');

  // 处理粗体 **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>');

  // 处理表格
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim());
    if (cells.length === 0) return match;
    return '<td class="px-4 py-2 border border-gray-200">' + cells.join('</td><td class="px-4 py-2 border border-gray-200">') + '</td>';
  });

  // 处理列表
  html = html.replace(/^\d+\.\s+(.+)$/gim, '<li class="ml-4 mb-1">$1</li>');
  html = html.replace(/^- (.+)$/gim, '<li class="ml-4 mb-1 list-disc">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="mb-4">$&</ul>');

  // 处理代码块
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>$1</code></pre>');

  // 处理行内代码
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');

  // 处理段落
  const paragraphs = html.split('\n\n');
  html = paragraphs
    .map(p => {
      p = p.trim();
      if (!p) return '';
      if (p.startsWith('<')) return p;
      return `<p class="mb-4">${p}</p>`;
    })
    .join('\n');

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// 图标组件
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
