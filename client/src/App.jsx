import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-pink-500">
          🚀 Codesmate
        </h1>
      </div>
    </BrowserRouter>
  )
}

export default App