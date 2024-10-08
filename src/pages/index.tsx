import React from 'react'
import Head from 'next/head'
import MainLayout from '@/components/MainLayout'
import { Rss, TrendingUp, Bell } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>InfoTracker - 首页</title>
        <meta name="description" content="InfoTracker - 多平台信息聚合和追踪系统" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">欢迎使用 InfoTracker</h1>
          <p className="text-xl text-gray-600 mb-8">开始追踪您感兴趣的信息，获取实时更新和深度洞察。</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Rss className="w-12 h-12 text-indigo-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">订阅管理</h2>
              <p className="text-gray-600">轻松管理您的订阅，随时添加或删除感兴趣的主题。</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="w-12 h-12 text-indigo-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">趋势分析</h2>
              <p className="text-gray-600">深入了解热门话题和趋势，洞察信息流动。</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Bell className="w-12 h-12 text-indigo-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">实时通知</h2>
              <p className="text-gray-600">获取重要更新的即时通知，不错过任何关键信息。</p>
            </div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">开始使用</h2>
            <p className="text-lg text-indigo-700 mb-6">只需几个简单的步骤，即可开始您的信息追踪之旅：</p>
            <ol className="list-decimal list-inside space-y-2 text-indigo-600">
              <li>创建您的第一个订阅</li>
              <li>选择感兴趣的信息源</li>
              <li>设置更新频率</li>
              <li>开始接收个性化的信息流</li>
            </ol>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Home