import React from 'react'

export default function SocialLinks({ pageConfig, setPageConfig }) {
  const addSocialLink = () => {
    setPageConfig(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: 'facebook', url: '' }]
    }))
  }

  const removeSocialLink = (index) => {
    setPageConfig(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }))
  }

  const updateSocialLink = (index, field, value) => {
    const newLinks = [...pageConfig.socialLinks]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setPageConfig(prev => ({ ...prev, socialLinks: newLinks }))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <button
          onClick={addSocialLink}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Social Link
        </button>
      </div>
      <p className="mb-4 text-sm text-gray-600">These links will appear in a ribbon below your profile information.</p>
      <div className="space-y-4">
        {pageConfig?.socialLinks?.map((link, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Platform</label>
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  className="mt-1 w-full border rounded-lg p-2"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="x">X (Twitter)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    placeholder={`https://${link.platform === 'x' ? 'x.com' : link.platform + '.com'}/username`}
                    className="mt-1 w-full border rounded-lg p-2"
                  />
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="mt-1 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

