"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all") // all, completed, pending, failed

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      console.log(data);
      if (data.success) {
        setReviews(data.reviews)
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true
    return review.status === filter
  })

  const getStatusBadge = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Code Reviews</h1>
          <p className="text-gray-600 mt-2">View and manage your code review results</p>
        </div>

        {/* Filter Tabs */}
        {/* <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "all", label: "All Reviews", count: reviews.length },
                { key: "completed", label: "Completed", count: reviews.filter((r) => r.status === "completed").length },
                { key: "pending", label: "Pending", count: reviews.filter((r) => r.status === "pending").length },
                { key: "failed", label: "Failed", count: reviews.filter((r) => r.status === "failed").length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div> */}

        {/* Reviews List */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto text-gray-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path
                    d="M9 12h6m6 0h6m-6 6h6m-6 6h6m-6 6h6M9 18h6m-6 6h6m-6 6h6"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-gray-500">No reviews found</p>
              <Link
                to="/upload"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Upload Code for Review
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <div key={review.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">{review.projectName || "Uploaded Files"}</h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                            review.status,
                          )}`}
                        >
                          {review.status}
                        </span>
                      </div>
                        <div className="text-sm mt-2 text-gray-500">
                          {review.description || ""}
                        </div>
                      {/* <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                        <span>{review.total_files} files</span>
                        <span>{review.total_issues} issues found</span>
                        {review.security_issues > 0 && (
                          <span className="text-red-600">{review.security_issues} security issues</span>
                        )}
                        {review.performance_issues > 0 && (
                          <span className="text-orange-600">{review.performance_issues} performance issues</span>
                        )}
                      </div> */}
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Quality Score:</span>
                          <span className={`text-sm font-medium ${getScoreColor(review.qualityScore)}`}>
                            {Math.round(review.qualityScore)}%
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/reviews/${review._id}`}
                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewsPage
