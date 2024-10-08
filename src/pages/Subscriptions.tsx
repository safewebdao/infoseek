import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Plus, Edit, Trash } from 'lucide-react'

interface Subscription {
  id: string
  keyword: string
  sources: string[]
  frequency: 'realtime' | 'daily' | 'weekly'
}

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [newSubscription, setNewSubscription] = useState({ keyword: '', sources: [], frequency: 'daily' })
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchSubscriptions()
    }
  }, [user])

  const fetchSubscriptions = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user?.id)

    if (error) {
      console.error('Error fetching subscriptions:', error)
    } else {
      setSubscriptions(data)
    }
  }

  const handleAddSubscription = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({ ...newSubscription, user_id: user?.id })

    if (error) {
      console.error('Error adding subscription:', error)
    } else {
      setSubscriptions([...subscriptions, data[0]])
      setNewSubscription({ keyword: '', sources: [], frequency: 'daily' })
    }
  }

  const handleDeleteSubscription = async (id: string) => {
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting subscription:', error)
    } else {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Subscriptions</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Subscription</h2>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <input
              type="text"
              placeholder="Keyword"
              className="w-full p-2 border rounded"
              value={newSubscription.keyword}
              onChange={(e) => setNewSubscription({ ...newSubscription, keyword: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <select
              className="w-full p-2 border rounded"
              value={newSubscription.frequency}
              onChange={(e) => setNewSubscription({ ...newSubscription, frequency: e.target.value as 'realtime' | 'daily' | 'weekly' })}
            >
              <option value="realtime">Realtime</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <button
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleAddSubscription}
            >
              <Plus size={20} className="inline mr-2" />
              Add Subscription
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
        <ul className="space-y-4">
          {subscriptions.map((sub) => (
            <li key={sub.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <span className="font-medium">{sub.keyword}</span>
                <span className="ml-2 text-sm text-gray-500">{sub.frequency}</span>
              </div>
              <div>
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <Edit size={20} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteSubscription(sub.id)}
                >
                  <Trash size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Subscriptions