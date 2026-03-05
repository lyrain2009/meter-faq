import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "电表FAQ系统 - 用电问题解答",
  description: "专业的电表使用、故障排查、计费缴费、安全规范问题解答平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        {/* 导航栏 */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">电表FAQ</span>
              </a>
              <nav className="flex items-center gap-6">
                <a href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  首页
                </a>
                <a href="https://www.95598.cn" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  联系客服
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* 主内容区 */}
        <main className="py-8">
          {children}
        </main>

        {/* 页脚 */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © 2024 电表FAQ系统 - 专业的用电问题解答平台
              </p>
              <div className="flex items-center gap-4">
                <a href="tel:95598" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  客服热线: 95598
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
