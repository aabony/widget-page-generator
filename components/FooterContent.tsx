import React from 'react'

export default function FooterContent({ pageConfig, setPageConfig }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Footer Content</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Footer Text</label>
        <textarea
          value={pageConfig.footerText}
          onChange={(e) => setPageConfig(prev => ({ ...prev, footerText: e.target.value }))}
          placeholder="Enter footer content"
          className="mt-1 w-full border rounded-lg p-2 h-32"
        />
      </div>
    </div>
  )
}

