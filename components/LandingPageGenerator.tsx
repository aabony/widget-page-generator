'use client'

import React, { useState, useEffect } from 'react'
import { themes, pageStyles, generateThemeCSS } from '../lib/themes'
import ThemeSelector from './ThemeSelector'
import PageInformation from './PageInformation'
import AttentionRibbon from './AttentionRibbon'
import ContentSections from './ContentSections'
import SocialLinks from './SocialLinks'
import FooterContent from './FooterContent'
import PreviewModal from './PreviewModal'
import { toast } from 'react-hot-toast'
import SaveStatusLog from './SaveStatusLog'

interface LandingPageGeneratorProps {
  initialConfig?: any
  isEditing?: boolean
}

export default function LandingPageGenerator({ initialConfig, isEditing = false }: LandingPageGeneratorProps) {
  const [selectedTheme, setSelectedTheme] = useState('modern')
  const [pageConfig, setPageConfig] = useState(initialConfig || {
    profilePic: '',
    title: 'My Landing Page',
    subtitle: 'Welcome to my page',
    ribbonText: '🎯 Check out these amazing deals! 🎁',
    footerText: 'Lorem ipsum dolor sit amet © 2024',
    socialLinks: [],
    sections: [
      {
        title: 'Featured Content',
        headCode: '',
        bodyCode: '<div id="adblm-widget-1"></div>',
        widgetId: 'adblm-widget-1'
      }
    ],
    dealInBioName: '',
  })
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ message: string; isError: boolean } | null>(null)

  useEffect(() => {
    if (initialConfig) {
      setPageConfig(initialConfig)
      setSelectedTheme(initialConfig.theme || 'modern')
    }
  }, [initialConfig])

  const generateHTML = () => {
    const theme = themes[selectedTheme]
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageConfig.title}</title>
    <meta name="description" content="${pageConfig.subtitle}">
    <meta property="og:title" content="${pageConfig.title}">
    <meta property="og:description" content="${pageConfig.subtitle}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${process.env.NEXT_PUBLIC_BASE_URL}/dealinbio/${pageConfig.dealInBioName}">
    ${pageConfig.profilePic ? `<meta property="og:image" content="${pageConfig.profilePic}">` : ''}
    <link rel="canonical" href="${process.env.NEXT_PUBLIC_BASE_URL}/dealinbio/${pageConfig.dealInBioName}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        ${generateThemeCSS(theme)}
        ${pageStyles}
    </style>
    <script>
    ${pageConfig.sections.map(section => section.headCode).join('\n')}
    </script>
</head>
<body>
    <div id="error-message"></div>
    <header>
        <div class="header-content">
            <h1>${pageConfig.title}</h1>
            <p class="subtitle">${pageConfig.subtitle}</p>
        </div>
    </header>

    <div class="profile-section">
        ${pageConfig.profilePic ? `<img src="${pageConfig.profilePic}" alt="${pageConfig.title} Profile" class="profile-img" onerror="this.onerror=null; this.src='placeholder.png'; showError('Failed to load profile image');">` : ''}
    </div>

    <div class="attention-ribbon">
        ${pageConfig.ribbonText}
    </div>

    <main>
        ${pageConfig.sections.map(section => `
            <div class="section">
                ${section.title ? `<h2>${section.title}</h2>` : ''}
                <div class="widget-container">
                    ${section.bodyCode}
                </div>
            </div>
        `).join('')}
    </main>

    <footer>
        <div class="footer-text">
            ${pageConfig.footerText}
        </div>
        <div class="social-links">
            ${pageConfig.socialLinks.map(link => 
              link.url ? `<a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-${link.platform === 'x' ? 'x-twitter' : link.platform}"></i>
              </a>` : ''
            ).join('')}
        </div>
    </footer>

    <script>
        function showError(message) {
            console.error(message);
            const errorElement = document.getElementById('error-message');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        window.onerror = function(message, source, lineno, colno, error) {
            showError('An error occurred: ' + message);
            return true;
        };

        document.addEventListener('DOMContentLoaded', function() {
            console.log('Page loaded successfully');
        });
    </script>
</body>
</html>`
  }

  const saveDealInBio = async () => {
    if (!pageConfig.dealInBioName) {
      toast.error('Please enter a Deal In Bio name')
      return
    }

    setIsSaving(true)
    const html = generateHTML()
    try {
      const response = await fetch('/api/save-deal-in-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pageConfig.dealInBioName,
          html: html,
          config: { ...pageConfig, theme: selectedTheme },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSaveStatus({ message: `Page saved to ${data.path}`, isError: false })
        toast.success('Deal In Bio page saved successfully!')
      } else {
        console.error('Error response:', data)
        setSaveStatus({ message: data.message || 'Failed to save Deal In Bio page', isError: true })
        toast.error(data.message || 'Failed to save Deal In Bio page')
      }
    } catch (error) {
      console.error('Error saving Deal In Bio page:', error)
      setSaveStatus({ message: 'An error occurred while saving the Deal In Bio page', isError: true })
      toast.error('An error occurred while saving the Deal In Bio page')
    } finally {
      setIsSaving(false)
    }
  }

  const downloadHTML = () => {
    const html = generateHTML()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${pageConfig.dealInBioName || 'landing-page'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
      <PageInformation pageConfig={pageConfig} setPageConfig={setPageConfig} />
      <AttentionRibbon pageConfig={pageConfig} setPageConfig={setPageConfig} />
      <ContentSections pageConfig={pageConfig} setPageConfig={setPageConfig} />
      <SocialLinks pageConfig={pageConfig} setPageConfig={setPageConfig} />
      <FooterContent pageConfig={pageConfig} setPageConfig={setPageConfig} />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Deal In Bio Name</label>
          <input
            type="text"
            value={pageConfig.dealInBioName}
            onChange={(e) => setPageConfig(prev => ({ ...prev, dealInBioName: e.target.value }))}
            placeholder="Enter Deal In Bio name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            disabled={isEditing}
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Preview
          </button>
          <button
            onClick={downloadHTML}
            className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Download HTML
          </button>
          <button
            onClick={saveDealInBio}
            disabled={isSaving}
            className={`flex-1 ${isSaving ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg transition-colors`}
          >
            {isSaving ? 'Saving...' : (isEditing ? 'Update' : 'Save')} Deal In Bio Page
          </button>
        </div>
      </div>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        html={generateHTML()}
      />
      {saveStatus && (
        <SaveStatusLog message={saveStatus.message} isError={saveStatus.isError} />
      )}
    </div>
  )
}

