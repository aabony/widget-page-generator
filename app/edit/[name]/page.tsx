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
    
    .header-img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 5px solid var(--social-links-background,  #3498db);
}
      .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30vh; 
        }
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
       .social-links-wrapper {
          background: var(--social-links-background, #3498db);
          padding: 20px 0;
          text-align: center;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .social-links a {
          font-size: 24px;
          color: white;
          background: rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .social-links a:hover {
          background: rgba(255, 255, 255, 0.4);
        }
  </style>
</head>
<body>
  <header>
   <div class="image-container">
     <img src="${pageConfig.profilePic}" alt="Profile" class="header-img">
</div>
    <h1>${pageConfig.title}</h1>
    <p>${pageConfig.subtitle}</p>
  </header>
    <div class="social-links-wrapper">
    <div class="social-links">
      ${pageConfig.socialLinks
            .map(
                (link) => `
          <a href="${link.url}" target="_blank" rel="noopener noreferrer">
            ${
                    link.platform === 'facebook'
                        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
   <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z"></path>
</svg>


`
                        : ''
                }
            ${
                    link.platform === 'instagram'
                        ? `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  width="24" height="24" viewBox="0 0 30 30">
    <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
</svg>`
                        : ''
                }
            ${
                    link.platform === 'x'
                        ? ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
                                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                            </svg> `
                        : ''
                }
                 ${
                    link.platform === 'tiktok'
                        ? ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
</svg>`
                        : ''
                }
          </a>`
            )
            .join('')}
    </div>
  </div>
  <div class="attention-ribbon">${pageConfig.ribbonText}</div>
  <div class="card-container">
    ${pageConfig.offers
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
                <div className="space-y-8">

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
            </div>
        </main>
    );
}
