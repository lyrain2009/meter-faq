/**
 * 首页 - FAQ列表页面
 */

'use client';

import { useState, useMemo } from 'react';
import { FaqCategory } from '@/types/faq';
import { getAllFaqs, searchFaqs, getHotFaqs, getFaqsByCategory } from '@/data/faqs';
import { SearchBox } from '@/components/SearchBox';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FaqList } from '@/components/FaqList';

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | 'all'>('all');

  const allFaqs = useMemo(() => getAllFaqs(), []);
  const hotFaqs = useMemo(() => getHotFaqs(4), []);

  const filteredFaqs = useMemo(() => {
    let result = allFaqs;

    // 分类筛选
    if (selectedCategory !== 'all') {
      result = getFaqsByCategory(selectedCategory);
    }

    // 关键词搜索
    if (searchKeyword.trim()) {
      result = searchFaqs(searchKeyword);
      // 如果同时选择了分类，再过滤一次
      if (selectedCategory !== 'all') {
        result = result.filter((faq) => faq.category === selectedCategory);
      }
    }

    return result;
  }, [allFaqs, selectedCategory, searchKeyword]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          电表常见问题解答
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          专业的电表使用指南，涵盖基础使用、故障排查、计费缴费、安全规范等各类问题
        </p>
      </div>

      {/* 搜索框 */}
      <div className="mb-6">
        <SearchBox
          value={searchKeyword}
          onChange={setSearchKeyword}
          placeholder="搜索问题关键词，如：电费、跳闸、充值..."
        />
      </div>

      {/* 分类筛选 */}
      <div className="mb-8">
        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* 热门问题（仅在首页无搜索时显示） */}
      {!searchKeyword && selectedCategory === 'all' && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FireIcon className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">热门问题</h2>
          </div>
          <FaqList faqs={hotFaqs} />
        </div>
      )}

      {/* 问题列表 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {searchKeyword ? `搜索结果 (${filteredFaqs.length})` : '全部问题'}
          </h2>
          {!searchKeyword && selectedCategory === 'all' && (
            <span className="text-sm text-gray-500">
              共 {filteredFaqs.length} 个问题
            </span>
          )}
        </div>
        <FaqList
          faqs={filteredFaqs}
          emptyMessage={
            searchKeyword
              ? `未找到与"${searchKeyword}"相关的问题，请尝试其他关键词`
              : '暂无问题'
          }
        />
      </div>
    </div>
  );
}

function FireIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
        clipRule="evenodd"
      />
    </svg>
  );
}
