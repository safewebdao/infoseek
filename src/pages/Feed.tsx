import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { ExternalLink } from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  content: string
  source: string
  original_url: string
  published_at: string
}

const Feed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<ContentItem[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchFeedItems()
    }
  }, [user])

  const fetchFeedItems = async () => {
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Error fetching feed items:', error)
    } else {
      setFeedItems(data)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Information Feed</h1>
      <div className="space-y-6">
        {feedItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.content.substring(0, 200)}...</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{item.source}</span>
              <span>{new Date(item.published_at).toLocaleDateString()}</span>
            </div>
            <a
              href={item.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-700"
            >
              Read more
              <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed