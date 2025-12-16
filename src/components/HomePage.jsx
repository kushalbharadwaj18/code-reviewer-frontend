import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-6">
            🚀 Now with Gemini-Pro Integration
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            AI-Powered Code Reviews
            <span className="text-blue-600 block">That Actually Help</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
            Get instant, intelligent code reviews that catch bugs, improve performance, and teach best practices.
            Integrate seamlessly with your existing workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            {/* <button className="px-8 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Watch Demo
            </button> */}
          </div>
          <div className="mt-12 relative">
            <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-4xl mx-auto shadow-sm">
              <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-left">
                <div className="text-blue-600 mb-2">// AI Review Results</div>
                <div className="text-gray-600">✅ Performance: Optimized database queries</div>
                <div className="text-gray-600">⚠️ Security: Potential SQL injection risk</div>
                <div className="text-gray-600">💡 Suggestion: Consider using prepared statements</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Code Analysis</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI understands your code context and provides actionable feedback
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Bug Detection</h3>
              <p className="text-gray-600">
                Identifies potential bugs, security vulnerabilities, and performance issues before they reach production
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Optimization</h3>
              <p className="text-gray-600">
                Suggests improvements for faster execution, better memory usage, and optimized algorithms
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <p className="text-gray-600">
                Enforces coding standards and suggests improvements based on industry best practices
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
              <p className="text-gray-600">
                Works with GitHub and your favorite IDEs
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Context-Aware</h3>
              <p className="text-gray-600">
                Understands your project structure, dependencies, and coding patterns for relevant suggestions
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-600">
                Get comprehensive reports with metrics, trends, and actionable insights for your codebase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Developers</h2>
            <p className="text-xl text-gray-600">See what teams are saying about CodeReviewer</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 mb-4">
                "CodeReviewer caught a critical security vulnerability that we missed. It's like having a senior
                developer reviewing every line of code."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">SJ</span>
                </div>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Lead Developer at TechCorp</div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 mb-4">
                "Our code quality improved dramatically. The AI suggestions are spot-on and help junior developers learn
                faster."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">MR</span>
                </div>
                <div>
                  <div className="font-semibold">Mike Rodriguez</div>
                  <div className="text-sm text-gray-600">Engineering Manager at StartupXYZ</div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 mb-4">
                "Integration was seamless. Within hours, we were getting valuable insights that saved us weeks of
                debugging."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">AL</span>
                </div>
                <div>
                  <div className="font-semibold">Alex Liu</div>
                  <div className="text-sm text-gray-600">Senior Engineer at DevCompany</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Improve Your Code Quality?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who trust CodeReviewer for better, safer code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors inline-block text-center"
            >
              Get Started
            </Link>
            {/* <button className="px-8 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Watch Demo
            </button> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl">CodeReviewer</span>
            </Link>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Terms
              </a>
              <Link to="/help" className="hover:text-gray-900 transition-colors">
                Support
              </Link>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © 2025 CodeReviewer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
