import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, Bell, User } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">InfoTracker</Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900"><Home size={20} /></Link>
            <Link to="/search" className="text-gray-600 hover:text-gray-900"><Search size={20} /></Link>
            <Link to="/notifications" className="text-gray-600 hover:text-gray-900"><Bell size={20} /></Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-900"><User size={20} /></Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header