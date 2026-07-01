import React from 'react'

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-pink-600 font-medium">Loading...</p>
    </div>
  </div>
)

export default LoadingSpinner