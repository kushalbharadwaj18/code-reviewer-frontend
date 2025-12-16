"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "getting-started", name: "Getting Started" },
    { id: "integrations", name: "Integrations" },
    { id: "reviews", name: "Code Reviews" },
    { id: "troubleshooting", name: "Troubleshooting" },
  ]

  const articles = [
    {
      id: 1,
      title: "Getting Started with CodeReviewer",
      category: "getting-started",
      description: "Learn how to set up your account and run your first code review",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Connecting Your GitHub Repository",
      category: "integrations",
      description: "Step-by-step guide to integrate CodeReviewer with your GitHub repositories",
      readTime: "3 min read",
    },
    {
      id: 3,
      title: "Understanding Code Review Results",
      category: "reviews",
      description: "Learn how to interpret and act on your code review findings",
      readTime: "7 min read",
    },
    {
      id: 6,
      title: "Troubleshooting Upload Issues",
      category: "troubleshooting",
      description: "Common solutions for file upload problems",
      readTime: "6 min read",
    },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions and learn how to get the most out of CodeReviewer
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for help articles..."
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>

              {/* Contact Support */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Need more help?</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <a
                  href="mailto:support@codereviewer.com"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Contact Support
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Quick Start Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Start Guide</h3>
                <p className="text-gray-600 mb-4">Get up and running with CodeReviewer in minutes</p>
                <Link to="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Read Guide →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrations</h3>
                <p className="text-gray-600 mb-4">Connect with GitHub and other tools</p>
                <Link to="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  View Integrations →
                </Link>
              </div>

              {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Setup</h3>
                <p className="text-gray-600 mb-4">Learn how to collaborate with your team</p>
                <Link to="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Team Guide →
                </Link>
              </div> */}
            </div>

            {/* Help Articles */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Help Articles ({filteredArticles.length})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredArticles.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-500">No articles found matching your search.</p>
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <div key={article.id} className="px-6 py-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            <Link to="#" className="hover:text-blue-600">
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-3">{article.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="capitalize">
                              {categories.find((c) => c.id === article.category)?.name}
                            </span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400 ml-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage
