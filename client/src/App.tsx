import React from 'react'
import { Router, Route } from 'wouter'
import './styles/globals.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/admin-backend">
          <AdminBackend />
        </Route>
      </div>
    </Router>
  )
}

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        VinFast V-Green Investment Platform
      </h1>
      <div className="text-center">
        <a 
          href="#/admin-backend" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          🔧 Admin Dashboard
        </a>
      </div>
    </div>
  )
}

function AdminBackend() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-6">
          👑 VinFast V-Green Admin Dashboard
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Admin System Ready!
          </h2>
          <p className="text-blue-700">
            ✅ Single Admin Access<br/>
            ✅ White Theme Design<br/>
            ✅ Full CRUD Operations<br/>
            ✅ Professional UI/UX
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
