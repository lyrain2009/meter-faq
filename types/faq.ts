/**
 * FAQ类型定义
 */

/** FAQ分类 */
export type FaqCategory =
  | 'basic'
  | 'troubleshooting'
  | 'billing'
  | 'safety';

/** 分类标签显示信息 */
export interface CategoryInfo {
  id: FaqCategory;
  name: string;
  icon: string;
  description: string;
}

/** FAQ数据结构 */
export interface Faq {
  /** 唯一标识 */
  id: string;
  /** 问题标题 */
  question: string;
  /** 问题答案 */
  answer: string;
  /** 所属分类 */
  category: FaqCategory;
  /** 关键词标签 */
  tags: string[];
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 浏览次数 */
  views?: number;
  /** 是否热门 */
  isHot?: boolean;
}

/** 搜索过滤参数 */
export interface FaqFilter {
  keyword?: string;
  category?: FaqCategory | 'all';
}

/** 分类信息映射 */
export const CATEGORY_INFO: Record<FaqCategory, CategoryInfo> = {
  basic: {
    id: 'basic',
    name: '基础使用',
    icon: 'BookOpen',
    description: '电表基本操作与功能介绍',
  },
  troubleshooting: {
    id: 'troubleshooting',
    name: '故障排查',
    icon: 'Wrench',
    description: '常见问题诊断与解决方法',
  },
  billing: {
    id: 'billing',
    name: '计费缴费',
    icon: 'CreditCard',
    description: '电费计算、缴费方式与账单查询',
  },
  safety: {
    id: 'safety',
    name: '安全规范',
    icon: 'Shield',
    description: '用电安全与设备维护规范',
  },
};

/** 所有分类列表 */
export const ALL_CATEGORIES: CategoryInfo[] = Object.values(CATEGORY_INFO);
