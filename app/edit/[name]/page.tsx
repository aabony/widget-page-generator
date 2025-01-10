'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { themes, pageStyles, generateThemeCSS } from '../../../lib/themes';
import ThemeSelector from '../../../components/ThemeSelector';
import PageInformation from '../../../components/PageInformation';
import AttentionRibbon from '../../../components/AttentionRibbon';
import ContentSections from '../../../components/ContentSections';
import SocialLinks from '../../../components/SocialLinks';
import FooterContent from '../../../components/FooterContent';
import PreviewModal from '../../../components/PreviewModal';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface EditPageProps {
    params: { name: string };
}

export default function EditPage({ params }: EditPageProps) {
    const [pageConfig, setPageConfig] = useState<any>(null);
    const [selectedTheme, setSelectedTheme] = useState('modern');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<{ message: string; isError: boolean } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await fetch(`/api/get-page?name=${params.name}`);
                if (response.ok) {
                    const data = await response.json();
                    setPageConfig(data.page);
                    setSelectedTheme(data.page.theme || 'modern');
                } else {
                    toast.error('Failed to fetch page data');
                    router.push('/admin');
                }
            } catch (error) {
                console.error('Error fetching page data:', error);
                toast.error('An error occurred while fetching the page data');
                router.push('/admin');
            }
        };

        fetchPageData();
    }, [params.name]);

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
    .card-container { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; padding: 20px; }
    .card { width: 300px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden; display: flex; flex-direction: column; }
    .card img { width: 100%; height: 200px; object-fit: cover; }
    .card-content { padding: 16px; }
    .card-content h2 { font-size: 1.5rem; margin: 0 0 8px; }
    .card-content p { color: #666; font-size: 0.9rem; margin: 0 0 16px; }
    .card-content a { background: #007bff; color: white; padding: 10px 16px; text-decoration: none; border-radius: 4px; text-align: center; display: inline-block; }
    .card-content a:hover { background: #0056b3; }
  </style>
</head>
<body>
  <header>
    <h1>${pageConfig.title}</h1>
    <p>${pageConfig.subtitle}</p>
  </header>
  <div class="card-container">
    ${pageConfig.offers
            .map((offer) =>
                offer.type === 'widget'
                    ? offer.widgetCode
                    : `
      <div class="card">
        <img src="${offer.imageSrc}" alt="${offer.title}" />
        <div class="card-content">
          <h2>${offer.title}</h2>
          <h4>${offer.subtitle}</h4>
          <p>${offer.description}</p>
          <a href="${offer.buttonLink}" target="_blank">${offer.buttonText}</a>
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
        setIsSaving(true);
        try {
            const response = await fetch('/api/save-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...pageConfig, theme: selectedTheme }),
            });

            if (response.ok) {
                toast.success('Page updated successfully');
                setSaveStatus({ message: 'Page updated successfully', isError: false });
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to update page');
                setSaveStatus({ message: data.message || 'Failed to update page', isError: true });
            }
        } catch (error) {
            console.error('Error updating page:', error);
            toast.error('An error occurred while updating the page');
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
        a.download = `${pageConfig.name || 'landing-page'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!pageConfig) {
        return <p>Loading...</p>;
    }

    return (
        <main className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Edit Page: {params.name}</h1>
                    <Link href="/admin" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Admin Dashboard
                    </Link>
                </div>
                <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
                <PageInformation pageConfig={pageConfig} setPageConfig={setPageConfig} />
                <AttentionRibbon pageConfig={pageConfig} setPageConfig={setPageConfig} />
                <ContentSections pageConfig={pageConfig} setPageConfig={setPageConfig} />
                <SocialLinks pageConfig={pageConfig} setPageConfig={setPageConfig} />
                <FooterContent pageConfig={pageConfig} setPageConfig={setPageConfig} />
                <div>
                    <label className="block text-sm font-medium text-gray-700">Deal In Bio Name</label>
                    <input
                        type="text"
                        value={pageConfig.name}
                        onChange={(e) => setPageConfig((prev: any) => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setIsPreviewOpen(true)}
                            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Preview
                        </button>
                        <button
                            onClick={savePage}
                            disabled={isSaving}
                            className={`flex-1 ${isSaving ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg`}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            onClick={downloadHTML}
                            className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                        >
                            Download HTML
                        </button>
                    </div>
                </div>
                <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} html={generateHTML()} />
            </div>
        </main>
    );
}
