import React from 'react'

export default function AttentionRibbon({ pageConfig, setPageConfig }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Attention Ribbon</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Ribbon Text (supports emojis)</label>
        <input
          type="text"
          value={pageConfig.ribbonText}
          onChange={(e) => setPageConfig(prev => ({ ...prev, ribbonText: e.target.value }))}
          placeholder="Enter attention-grabbing text with emojis"
          className="mt-1 w-full border rounded-lg p-2"
        />
      </div>
    </div>
  )
}

