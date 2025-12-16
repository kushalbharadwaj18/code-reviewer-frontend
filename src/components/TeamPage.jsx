"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

const TeamPage = () => {
  const { user } = useAuth()
  const [teamMembers, setTeamMembers] = useState([])
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")
  const [loading, setLoading] = useState(true)
  const [inviting, setInviting] = useState(false)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/team/members", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (data.success) {
        setTeamMembers(data.members)
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInvite = async (e) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return

    setInviting(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/team/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: inviteEmail,
          role: inviteRole,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setInviteEmail("")
        setInviteRole("member")
        fetchTeamMembers()
        alert("Invitation sent successfully!")
      } else {
        alert(data.message || "Failed to send invitation")
      }
    } catch (error) {
      alert("Failed to send invitation. Please try again.")
    } finally {
      setInviting(false)
    }
  }

  const handleRemoveMember = async (memberId) => {
    if (!confirm("Are you sure you want to remove this team member?")) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:5000/api/team/members/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        fetchTeamMembers()
      } else {
        alert(data.message || "Failed to remove member")
      }
    } catch (error) {
      alert("Failed to remove member. Please try again.")
    }
  }

  const getRoleBadge = (role) => {
    const colors = {
      owner: "bg-purple-100 text-purple-800",
      admin: "bg-blue-100 text-blue-800",
      member: "bg-gray-100 text-gray-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-2">Manage your team members and their access levels</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invite Member */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Invite Team Member</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleInvite} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="colleague@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={inviting}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {inviting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                    <span>{inviting ? "Sending..." : "Send Invitation"}</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Role Permissions */}
            <div className="mt-6 bg-blue-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-blue-900 mb-3">Role Permissions</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <div>
                  <strong>Owner:</strong> Full access to all features
                </div>
                <div>
                  <strong>Admin:</strong> Manage team, view all projects
                </div>
                <div>
                  <strong>Member:</strong> View assigned projects only
                </div>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Team Members ({teamMembers.length})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {teamMembers.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <div className="w-12 h-12 mx-auto text-gray-400 mb-4">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500">No team members yet</p>
                    <p className="text-sm text-gray-400 mt-1">Invite your first team member to get started</p>
                  </div>
                ) : (
                  teamMembers.map((member) => (
                    <div key={member.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(
                              member.role,
                            )}`}
                          >
                            {member.role}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(member.created_at).toLocaleDateString()}
                          </span>
                          {member.role !== "owner" && (
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-600 hover:text-red-500 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
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

export default TeamPage
