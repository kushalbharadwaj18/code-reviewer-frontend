// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const RepositoriesPage = () => {
//   const [repositories, setRepositories] = useState([]);
//   const [repoUrl, setRepoUrl] = useState("");
//   const [branch, setBranch] = useState("main");
//   const [connecting, setConnecting] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Capture GitHub token after OAuth redirect
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const githubToken = params.get("token");
//     const githubUser = params.get("user");

//     if (githubToken) {
//       localStorage.setItem("github_token", githubToken);
//       alert(`✅ GitHub connected as ${githubUser}`);
//       window.history.replaceState({}, document.title, "/repositories"); // remove params
//     }
//   }, []);

//   // 🔐 Connect GitHub (redirect to backend)
//   const connectGitHub = () => {
//     window.location.href = "http://localhost:5000/api/auth/github/login";
//   };

//   // 📦 Fetch Repositories using stored token
//   const loadRepositories = async () => {
//     const token = localStorage.getItem("github_token");
//     if (!token) return alert("Please connect GitHub first.");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/github/repos", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setRepositories(data.repos);
//       } else {
//         alert("Failed to load repositories.");
//       }
//     } catch {
//       alert("Error fetching repositories.");
//     }
//   };

//   const handleConnectRepository = async () => {
//     if (!repoUrl.trim()) {
//       alert("Please enter a repository URL");
//       return;
//     }
//     setConnecting(true);
//     try {
//       const newRepo = {
//         id: Date.now(),
//         name: repoUrl.split("/").pop()?.replace(".git", "") || "Repository",
//         repository_url: repoUrl,
//         branch,
//       };
//       setProjects([...projects, newRepo]);
//       setRepoUrl("");
//       setBranch("main");
//       alert("Repository added manually!");
//     } finally {
//       setConnecting(false);
//     }
//   };
  
//   const handleReview = () => {
//     navigate("/reviews");
//   }
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Repository Integration</h1>
//           <p className="text-gray-600 mt-2">Connect your repositories for automated code reviews</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Connect Repository */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Connect Repository</h2>

//               {/* GitHub OAuth */}
//               <button
//                 onClick={connectGitHub}
//                 className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.77.42-1.31.77-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.78.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
//                 </svg>
//                 Connect GitHub
//               </button>

//               <div className="mt-4 text-center">
//                 <button
//                   onClick={loadRepositories}
//                   className="px-20 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                 >
//                   Load Repositories
//                 </button>
//               </div>

//               <div className="mt-6 text-gray-500 text-sm text-center">
//                 Or connect manually
//               </div>

//               <div className="mt-4 space-y-3">
//                 <input
//                   type="url"
//                   value={repoUrl}
//                   onChange={(e) => setRepoUrl(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="https://github.com/user/repo.git"
//                 />
//                 <input
//                   type="text"
//                   value={branch}
//                   onChange={(e) => setBranch(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="main"
//                 />
//                 <button
//                   onClick={handleConnectRepository}
//                   disabled={connecting}
//                   className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {connecting ? "Connecting..." : "Connect Repository"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Display Connected Repositories */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">My GitHub Repositories</h2>
//               {repositories.length === 0 ? (
//                 <p className="text-gray-500">No repositories loaded yet.</p>
//               ) : (
//                 <div className="space-y-3">
//                   {repositories.map((repo) => (
//                     <div key={repo.id} className="border p-3 rounded-md" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <div>
//                         <p className="font-medium">{repo.full_name}</p>
//                         <p className="text-sm text-gray-500">{repo.html_url}</p>
//                       </div>
//                       <div>
//                         <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" style={{ cursor: 'pointer' }} onClick={handleReview}>Review</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="mt-6 bg-gray-50 p-4 rounded-md">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">
//                 Manually Connected Projects
//               </h3>
//               {projects.length === 0 ? (
//                 <p className="text-gray-400 text-sm">No manual repositories connected.</p>
//               ) : (
//                 projects.map((p) => (
//                   <div key={p.id} className="border p-3 rounded-md mt-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <div>
//                         <p className="font-medium">{p.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {p.repository_url} • Branch: {p.branch}
//                         </p>
//                     </div>
//                     <div>
//                         <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50" style={{ cursor: 'pointer' }} onClick={handleReview}>Review</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RepositoriesPage;






"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RepositoriesPage = () => {
  const [repositories, setRepositories] = useState([]);
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [connecting, setConnecting] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // ✅ Capture GitHub token after OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const githubToken = params.get("token");
    const githubUser = params.get("user");

    if (githubToken) {
      localStorage.setItem("github_token", githubToken);
      alert(`✅ GitHub connected as ${githubUser}`);
      window.history.replaceState({}, document.title, "/repositories"); // remove params
    }
  }, []);

  // 🔐 Connect GitHub (redirect to backend)
  const connectGitHub = () => {
    window.location.href = "http://localhost:5000/api/auth/github/login";
  };

  // 📦 Fetch Repositories using stored token
  const loadRepositories = async () => {
    const token = localStorage.getItem("github_token");
    if (!token) return alert("Please connect GitHub first.");

    try {
      const response = await fetch("http://localhost:5000/api/auth/github/repos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setRepositories(data.repos);
      } else {
        alert("Failed to load repositories.");
      }
    } catch {
      alert("Error fetching repositories.");
    }
  };

  const handleConnectRepository = async () => {
    if (!repoUrl.trim()) {
      alert("Please enter a repository URL");
      return;
    }
    setConnecting(true);
    try {
      const newRepo = {
        id: Date.now(),
        name: repoUrl.split("/").pop()?.replace(".git", "") || "Repository",
        repository_url: repoUrl,
        branch,
      };
      setProjects([...projects, newRepo]);
      setRepoUrl("");
      setBranch("main");
      alert("Repository added manually!");
    } finally {
      setConnecting(false);
    }
  };

  // ⚙️ Handle Review Button (send repo to backend for extraction)
 const handleReview = async (repoUrl, branch = "main") => {
  try {
    alert("🔍 Starting code analysis...");
    const token = localStorage.getItem("token"); 
    const github_token = localStorage.getItem("github_token");

    const response = await fetch("http://localhost:5000/api/review/repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ repo_url: repoUrl, branch, token: github_token }),
    });

    const data = await response.json();
    console.log("📦 Backend response:", data);

    if (data.success) {
      // Save review summary locally for use on review details page
      // localStorage.setItem("reviewData", JSON.stringify(data.review));

      // alert(`✅ Review complete!\n${data.review.totalFiles} files analyzed.\nQuality Score: ${data.review.qualityScore}/100`);

      // Navigate to detailed review page using reviewId
      navigate(`/reviews/${data.review.id}`);
    } else {
      alert("❌ Failed to analyze repository. Check console for details.");
      console.error(data);
    }
  } catch (error) {
    console.error("❌ Review error:", error);
    alert("❌ Error analyzing repository.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Repository Integration</h1>
          <p className="text-gray-600 mt-2">
            Connect your repositories for automated code reviews
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Connect Repository */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Connect Repository</h2>

              {/* GitHub OAuth */}
              <button
                onClick={connectGitHub}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.77.42-1.31.77-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.78.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Connect GitHub
              </button>

              <div className="mt-4 text-center">
                <button
                  onClick={loadRepositories}
                  className="px-20 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Load Repositories
                </button>
              </div>

              <div className="mt-6 text-gray-500 text-sm text-center">Or connect manually</div>

              <div className="mt-4 space-y-3">
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://github.com/user/repo.git"
                />
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="main"
                />
                <button
                  onClick={handleConnectRepository}
                  disabled={connecting}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {connecting ? "Connecting..." : "Connect Repository"}
                </button>
              </div>
            </div>
          </div>

          {/* Display Connected Repositories */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                My GitHub Repositories
              </h2>
              {repositories.length === 0 ? (
                <p className="text-gray-500">No repositories loaded yet.</p>
              ) : (
                <div className="space-y-3">
                  {repositories.map((repo) => (
                    <div
                      key={repo.id}
                      className="border p-3 rounded-md flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{repo.full_name}</p>
                        <p className="text-sm text-gray-500">{repo.html_url}</p>
                      </div>
                      <button
                        onClick={() => handleReview(repo.clone_url, "main")}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Manually Connected Projects
              </h3>
              {projects.length === 0 ? (
                <p className="text-gray-400 text-sm">No manual repositories connected.</p>
              ) : (
                projects.map((p) => (
                  <div
                    key={p.id}
                    className="border p-3 rounded-md mt-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        {p.repository_url} • Branch: {p.branch}
                      </p>
                    </div>
                    <button
                      onClick={() => handleReview(p.repository_url, p.branch)}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Review
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoriesPage;
