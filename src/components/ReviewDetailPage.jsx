"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"

// Import language support
import "prismjs/components/prism-c"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-markup" // HTML
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"

const ReviewDetailPage = () => {
  const { id } = useParams()
  const [reviewText, setReviewText] = useState("")
  const [qualityScore, setQualityScore] = useState(0)
  const [loading, setLoading] = useState(true)

  // ✅ Fetch review details on component mount
  useEffect(() => {
    fetchReviewDetails()
  }, [id])

  const fetchReviewDetails = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (data.success) {
        setReviewText(data.reviewText)
        setQualityScore(data.qualityScore)
      }
    } catch (error) {
      console.error("❌ Failed to fetch review details:", error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Non-blocking copy to clipboard
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      const toast = document.createElement("div")
      toast.textContent = "✅ Code copied!"
      toast.className =
        "fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md animate-fade"
      document.body.appendChild(toast)
      setTimeout(() => toast.remove(), 1500)
    } catch {
      console.error("Clipboard copy failed")
    }
  }

  // ✅ Map file extensions to Prism language names
  const getLanguageFromExtension = (ext) => {
    const languageMap = {
      ".js": "javascript",
      ".json": "json",
      ".py": "python",
      ".java": "java",
      ".cpp": "cpp",
      ".html": "markup",
      ".css": "css",
      ".md": "markdown",
      ".txt": "text",
    }
    return languageMap[ext] || "javascript"
  }

  // ✅ Split text into code and non-code blocks
  const parseReviewText = (text) => {
    const parts = []
    // Match both ```language and ```(file.ext) formats
    const regex = /```(?:([a-zA-Z0-9.]+))?\n([\s\S]*?)```/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index)
      if (before.trim()) parts.push({ type: "text", content: before })

      let language = "javascript"
      if (match[1]) {
        // Check if it's a file extension or language name
        if (match[1].startsWith(".")) {
          language = getLanguageFromExtension(match[1])
        } else {
          language = match[1]
        }
      }

      parts.push({
        type: "code",
        language: language,
        content: match[2].trim(),
      })
      lastIndex = regex.lastIndex
    }

    const remaining = text.slice(lastIndex)
    if (remaining.trim()) parts.push({ type: "text", content: remaining })

    return parts
  }

  // ✅ Renders formatted content (with custom bold rule for “skksls”)
  const renderFormattedText = () => {
    const parts = parseReviewText(reviewText)

    return parts.map((part, index) => {
      if (part.type === "code") {
        // Get the Prism language grammar
        const language = part.language
        const grammar = Prism.languages[language] || Prism.languages.javascript
        const highlightedCode = Prism.highlight(part.content, grammar, language)

        return (
          <div key={index} className="relative group my-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto">
              <button
                onClick={() => handleCopy(part.content)}
                className="absolute top-2 right-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-10"
              >
                Copy
              </button>
              <pre className="m-0">
                <code
                  className={`language-${language}`}
                  dangerouslySetInnerHTML={{
                    __html: highlightedCode,
                  }}
                />
              </pre>
            </div>
          </div>
        )
      }

      // 🧩 Format non-code text
      const lines = part.content.split(/\n+/)
      return (
        <div key={index} className="space-y-2 mb-4">
          {lines.map((line, i) => {
            line = line.trim()
            if (!line) return null

            // Headings (#, ##, ###)
            if (/^#{1,3}\s/.test(line)) {
              const headingText = line
                .replace(/^#{1,3}\s*/, "") // Remove # markers
                .replace(/\*\*(.*?)\*\*/g, "$1") // Remove ** and keep text bold
              const headingLevel = line.match(/^#{1,3}/)[0].length
              const headingClass =
                headingLevel === 1
                  ? "text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4"
                  : headingLevel === 2
                  ? "text-xl font-semibold text-gray-800 dark:text-gray-200 mt-3"
                  : "text-lg font-semibold text-gray-700 dark:text-gray-300 mt-2"

              return (
                <h2 key={i} className={headingClass}>
                  {headingText}
                </h2>
              )
            }

            // Bullet points
            if (/^[-*]\s+/.test(line)) {
              const bullet = line.replace(/^[-*]\s+/, "")
              return (
                <ul key={i} className="list-disc ml-6 text-gray-800 dark:text-gray-200">
                  <li>{bullet}</li>
                </ul>
              )
            }

            // ✅ Bold text (**text**) + custom bold for "skksls"
            const boldFormatted = line
              .replace(
                /\*\*(.*?)\*\*/g,
                "<strong class='font-bold text-gray-900 dark:text-gray-100'>$1</strong>"
              )
              .replace(
                /\bskksls\b/gi,
                "<strong class='font-bold text-gray-900 dark:text-gray-100'>skksls</strong>"
              )

            // Normal paragraph
            return (
              <p
                key={i}
                className="text-gray-800 dark:text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: boldFormatted }}
              />
            )
          })}
        </div>
      )
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!reviewText) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">No review data available</p>
          <Link to="/reviews" className="mt-4 text-blue-600 hover:text-blue-500">
            Back to Reviews
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/reviews" className="text-blue-600 hover:text-blue-500">
              ← Back to Reviews
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Code Review Summary
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Detailed AI-generated code review for uploaded files
          </p>
        </div>

        {/* Quality Score */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Quality Score
            </h2>
            <span className="text-3xl font-bold text-green-600">
              {Math.round(qualityScore)}%
            </span>
          </div>
        </div>

        {/* Review Text */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
          {renderFormattedText()}
        </div>
      </div>
    </div>
  )
}

export default ReviewDetailPage
