import React from 'react'
import { Rss } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to InfoTracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Rss className="mr-2 text-blue-500" size={16} />
              <span>Technology News</span>
            </li>
            <li className="flex items-center">
              <Rss className="mr-2 text-blue-500" size={16} />
              <span>Climate Change Updates</span>
            </li>
            <li className="flex items-center">
              <Rss className="mr-2 text-blue-500" size={16} />
              <span>Artificial Intelligence</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="font-medium">New AI Breakthrough in Natural Language Processing</h3>
              <p className="text-sm text-gray-600">Source: Tech News Daily</p>
            </li>
            <li>
              <h3 className="font-medium">Global Climate Summit Announces New Emission Targets</h3>
              <p className="text-sm text-gray-600">Source: Environmental Watch</p>
            </li>
            <li>
              <h3 className="font-medium">Tech Giants Collaborate on Open-Source AI Project</h3>
              <p className="text-sm text-gray-600">Source: Silicon Valley Insider</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home