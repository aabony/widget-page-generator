import React from 'react'

export default function PageInformation({ pageConfig, setPageConfig }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Page Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input
            type="text"
            value={pageConfig.profilePic}
            onChange={(e) => setPageConfig(prev => ({ ...prev, profilePic: e.target.value }))}
            placeholder="Enter image URL"
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={pageConfig.title}
            onChange={(e) => setPageConfig(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter page title"
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            value={pageConfig.subtitle}
            onChange={(e) => setPageConfig(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Enter subtitle"
            className="mt-1 w-full border rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  )
}

