import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto px-6 py-4">
        <p className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} InfoTracker. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer