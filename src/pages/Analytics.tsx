import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AnalyticsData {
  totalSubscriptions: number
  totalContentItems: number
  contentBySource: { name: string; count: number }[]
  interactionsByType: { name: string; count: number }[]
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalSubscriptions: 0,
    totalContentItems: 0,
    contentBySource: [],
    interactionsByType: []
  })
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchAnalyticsData()
    }
  }, [user])

  const fetchAnalyticsData = async () => {
    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', user?.id)

    const { data: contentItems, error: contentItemsError } = await supabase
      .from('content_items')
      .select('id, source')
      .in('subscription_id', subscriptions?.map(sub => sub.id) || [])

    const { data: interactions, error: interactionsError } = await supabase
      .from('user_interactions')
      .select('interaction_type')
      .eq('user_id', user?.id)

    if (subscriptionsError || contentItemsError || interactionsError) {
      console.error('Error fetching analytics data:', subscriptionsError || contentItemsError || interactionsError)
    } else {
      const contentBySource = contentItems?.reduce((acc, item) => {
        acc[item.source] = (acc[item.source] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const interactionsByType = interactions?.reduce((acc, item) => {
        acc[item.interaction_type] = (acc[item.interaction_type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      setAnalyticsData({
        totalSubscriptions: subscriptions?.length || 0,
        totalContentItems: contentItems?.length || 0,
        contentBySource: Object.entries(contentBySource || {}).map(([name, count]) => ({ name, count })),
        interactionsByType: Object.entries(interactionsByType || {}).map(([name, count]) => ({ name, count }))
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p>Total Subscriptions: {analyticsData.totalSubscriptions}</p>
          <p>Total Content Items: {analyticsData.totalContentItems}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Content by Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.contentBySource}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Interactions by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.interactionsByType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Analytics