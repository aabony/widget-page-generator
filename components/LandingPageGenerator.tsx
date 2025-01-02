'use client';

import React, { useState, useEffect } from 'react';
import { themes, pageStyles, generateThemeCSS } from '../lib/themes';
import ThemeSelector from './ThemeSelector';
import PageInformation from './PageInformation';
import AttentionRibbon from './AttentionRibbon';
import ContentSections from './ContentSections';
import SocialLinks from './SocialLinks';
import FooterContent from './FooterContent';
import PreviewModal from './PreviewModal';
import { toast } from 'react-hot-toast';
import SaveStatusLog from './SaveStatusLog';

interface LandingPageGeneratorProps {
  initialConfig?: any;
  isEditing?: boolean;
}

export default function LandingPageGenerator({ initialConfig, isEditing = false }: LandingPageGeneratorProps) {
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [pageConfig, setPageConfig] = useState(
      initialConfig || {
        profilePic: '',
        title: 'My Landing Page',
        subtitle: 'Welcome to my page',
        ribbonText: '🎯 Check out these amazing deals! 🎁',
        footerText: 'Lorem ipsum dolor sit amet © 2024',
        socialLinks: [],
        sections: [],
        dealInBioName: '',
      }
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ message: string; isError: boolean } | null>(null);

  useEffect(() => {
    if (initialConfig) {
      setPageConfig(initialConfig);
      setSelectedTheme(initialConfig.theme || 'modern');
    }
  }, [initialConfig]);

  const generateHTML = () => {
    const theme = themes[selectedTheme];
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageConfig.title}</title>
  <meta name="description" content="${pageConfig.subtitle}">
  <style>
    ${generateThemeCSS(theme)}
    ${pageStyles}
    .card-container {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      padding: 20px;
    }
    .card {
      width: 300px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .card-content {
      padding: 16px;
    }
    .card-content h2 {
      font-size: 1.5rem;
      margin: 0 0 8px;
    }
    .card-content p {
      color: #666;
      font-size: 0.9rem;
      margin: 0 0 16px;
    }
    .card-content a {
      background: #007bff;
      color: white;
      padding: 10px 16px;
      text-decoration: none;
      border-radius: 4px;
      text-align: center;
      display: inline-block;
    }
    .card-content a:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <header>
    <h1>${pageConfig.title}</h1>
    <p>${pageConfig.subtitle}</p>
  </header>
  <div class="attention-ribbon">${pageConfig.ribbonText}</div>
  <div class="card-container">
    ${pageConfig.sections
        .map(
            (section) => `
      <div class="card">
        <img src="${section.imageSrc}" alt="${section.title}" />
        <div class="card-content">
          <h2>${section.title}</h2>
          <h4>${section.subtitle}</h4>
          <p>${section.description}</p>
          <a href="${section.buttonLink}" target="_blank">${section.buttonText}</a>
        </div>
      </div>`
        )
        .join('')}
  </div>
  <footer>
    <p>${pageConfig.footerText}</p>
  </footer>
</body>
</html>`;
  };

  const savePage = async () => {
    if (!pageConfig.dealInBioName) {
      toast.error('Please enter a Deal In Bio name');
      return;
    }

    setIsSaving(true);
    const html = generateHTML();
    try {
      const response = await fetch('/api/savepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pageConfig.dealInBioName,
          html: html,
          config: { ...pageConfig, theme: selectedTheme },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSaveStatus({ message: `Page saved successfully: ${data.path}`, isError: false });
        toast.success('Page saved successfully!');
      } else {
        setSaveStatus({ message: data.message || 'Failed to save page', isError: true });
        toast.error(data.message || 'Failed to save page');
      }
    } catch (error) {
      setSaveStatus({ message: 'An error occurred while saving the page', isError: true });
      toast.error('An error occurred while saving the page');
    } finally {
      setIsSaving(false);
    }
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageConfig.dealInBioName || 'landing-page'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
                onChange={(e) => setPageConfig((prev) => ({ ...prev, dealInBioName: e.target.value }))}
                placeholder="Enter Deal In Bio name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                disabled={isEditing}
            />
          </div>
          <div className="flex space-x-4">
            <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Preview
            </button>
            <button
                onClick={downloadHTML}
                className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Download HTML
            </button>
            <button
                onClick={savePage}
                disabled={isSaving}
                className={`flex-1 ${isSaving ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg`}
            >
              {isSaving ? 'Saving...' : isEditing ? 'Update' : 'Save'} Page
            </button>
          </div>
        </div>
        <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} html={generateHTML()} />
        {saveStatus && <SaveStatusLog message={saveStatus.message} isError={saveStatus.isError} />}
      </div>
  );
}
