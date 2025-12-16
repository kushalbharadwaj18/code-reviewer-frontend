"use client"

import { useState, useEffect } from "react"

const AnalyticsPage = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalReviews: 0,
    totalIssues: 0,
    avgQualityScore: 0,
    qualityTrend: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()

      if (data.success && data.reviews) {
        const reviews = data.reviews

        // Total unique projects
        const totalProjects = new Set(reviews.map((r) => r.projectName)).size
        const totalReviews = reviews.length

        // Average quality score
        const avgQualityScore =
          reviews.reduce((sum, r) => sum + (r.qualityScore || 0), 0) /
          (totalReviews || 1)

        // Approximate total issues by keyword scan
        const totalIssues = reviews.reduce((sum, r) => {
          const matches = r.reviewText?.match(/issue|error|bug|problem/gi)
          return sum + (matches ? matches.length : 0)
        }, 0)

        // ✅ Build quality score trend per month
        const monthlyData = {}
        reviews.forEach((r) => {
          const date = new Date(r.createdAt)
          if (isNaN(date)) return
          const month = date.toLocaleString("default", { month: "short" }) // e.g. "Jan"
          if (!monthlyData[month]) monthlyData[month] = { total: 0, count: 0 }
          monthlyData[month].total += r.qualityScore || 0
          monthlyData[month].count++
        })

        // Sort months by order (Jan–Dec)
        const monthOrder = [
          "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
        ]
        const qualityTrend = monthOrder
          .filter((m) => monthlyData[m])
          .map((m) => ({
            month: m,
            score: Math.round(monthlyData[m].total / monthlyData[m].count),
          }))

        setStats({
          totalProjects,
          totalReviews,
          totalIssues,
          avgQualityScore,
          qualityTrend,
        })
      }
    } catch (error) {
      console.error("❌ Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-categorize issues (based on total issues)
  const issuesByCategory = [
    { category: "Security", count: Math.floor(stats.totalIssues * 0.3), color: "bg-red-500" },
    { category: "Performance", count: Math.floor(stats.totalIssues * 0.2), color: "bg-orange-500" },
    { category: "Style", count: Math.floor(stats.totalIssues * 0.25), color: "bg-blue-500" },
    { category: "Bugs", count: Math.floor(stats.totalIssues * 0.15), color: "bg-purple-500" },
    { category: "Maintainability", count: Math.floor(stats.totalIssues * 0.1), color: "bg-green-500" },
  ]

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-2">Track your code quality trends and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Projects"
            value={stats.totalProjects}
            color="bg-blue-500"
            label="P"
            subtext="+2 this month"
          />
          <MetricCard
            title="Reviews Completed"
            value={stats.totalReviews}
            color="bg-green-500"
            label="R"
            subtext="+5 this week"
          />
          <MetricCard
            title="Issues Found"
            value={stats.totalIssues}
            color="bg-yellow-500"
            label="I"
            subtext="Detected automatically"
          />
          <MetricCard
            title="Avg Quality Score"
            value={`${Math.round(stats.avgQualityScore)}%`}
            color="bg-purple-500"
            label="Q"
            subtext="+3% improvement"
          />
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Quality Score Trend">
            {stats.qualityTrend.length > 0 ? (
              <div className="space-y-4">
                {stats.qualityTrend.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-600">{item.month}</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm font-medium text-gray-900">{item.score}%</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No trend data available</p>
            )}
          </ChartCard>

          <ChartCard title="Issues by Category">
            <div className="space-y-4">
              {issuesByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{item.count}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${(item.count / Math.max(stats.totalIssues, 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}

// Reusable components
const MetricCard = ({ title, value, color, label, subtext }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 ${color} rounded-md flex items-center justify-center`}>
          <span className="text-white text-sm font-medium">{label}</span>
        </div>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-green-600">{subtext}</p>
      </div>
    </div>
  </div>
)

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
)

export default AnalyticsPage
