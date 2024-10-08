import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Home, Rss, BarChart2, Settings, Search, Bell, User } from 'lucide-react'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">InfoTracker</h1>
        </div>
        <nav className="mt-6">
          <Link href="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200">
            <Home className="mr-3" size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/subscriptions" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200">
            <Rss className="mr-3" size={20} />
            <span className="font-medium">Subscriptions</span>
          </Link>
          <Link href="/analytics" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200">
            <BarChart2 className="mr-3" size={20} />
            <span className="font-medium">Analytics</span>
          </Link>
          <Link href="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200">
            <Settings className="mr-3" size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <input type="text" placeholder="搜索..." className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              <button className="ml-2 p-2 text-gray-500 hover:text-indigo-600 focus:outline-none">
                <Search size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-indigo-600 focus:outline-none">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-indigo-600 focus:outline-none">
                <User size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout