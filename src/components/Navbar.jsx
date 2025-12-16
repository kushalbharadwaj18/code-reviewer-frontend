"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-bold text-xl">CodeReviewer</span>
        </Link>

        {user ? (
          // Authenticated Navigation
          <nav className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/upload"
              className={`text-sm font-medium transition-colors ${
                isActive("/upload") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upload
            </Link>
            <Link
              to="/repositories"
              className={`text-sm font-medium transition-colors ${
                isActive("/repositories") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Repositories
            </Link>
            <Link
              to="/reviews"
              className={`text-sm font-medium transition-colors ${
                isActive("/reviews") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Reviews
            </Link>
            <Link
              to="/analytics"
              className={`text-sm font-medium transition-colors ${
                isActive("/analytics") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Analytics
            </Link>
            {/* <Link
              to="/team"
              className={`text-sm font-medium transition-colors ${
                isActive("/team") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Team
            </Link> */}
            <Link
              to="/settings"
              className={`text-sm font-medium transition-colors ${
                isActive("/settings") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Settings
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </nav>
        ) : (
          // Public Navigation
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            {/* <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link> */}
            <Link to="/help" className="text-gray-600 hover:text-gray-900 transition-colors">
              Help
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
