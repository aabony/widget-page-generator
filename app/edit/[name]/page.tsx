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
    <h1>${pageConfig.title}</h1>
    <p>${pageConfig.subtitle}</p>
  </header>
      <div class="social-links">
      ${pageConfig.socialLinks
            .map(
                (link) => `
          <a href="${link.url}" target="_blank" rel="noopener noreferrer">
            ${
                    link.platform === 'facebook'
                        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                    <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z"></path>
                  </svg>`
                        : ''
                }
            ${
                    link.platform === 'instagram'
                        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z"></path>
                  </svg>`
                        : ''
                }
              ${
                    link.platform === 'x'
                        ? ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                            </svg> `
                        : ''
                }
                 ${
                    link.platform === 'tiktok'
                        ? ` <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                <path d="M 9 4 C 6.2495759 4 4 6.2495759 4 9 L 4 41 C 4 43.750424 6.2495759 46 9 46 L 41 46 C 43.750424 46 46 43.750424 46 41 L 46 9 C 46 6.2495759 43.750424 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.671576 6 44 7.3284241 44 9 L 44 41 C 44 42.671576 42.671576 44 41 44 L 9 44 C 7.3284241 44 6 42.671576 6 41 L 6 9 C 6 7.3284241 7.3284241 6 9 6 z M 26.042969 10 A 1.0001 1.0001 0 0 0 25.042969 10.998047 C 25.042969 10.998047 25.031984 15.873262 25.021484 20.759766 C 25.016184 23.203017 25.009799 25.64879 25.005859 27.490234 C 25.001922 29.331679 25 30.496833 25 30.59375 C 25 32.409009 23.351421 33.892578 21.472656 33.892578 C 19.608867 33.892578 18.121094 32.402853 18.121094 30.539062 C 18.121094 28.675273 19.608867 27.1875 21.472656 27.1875 C 21.535796 27.1875 21.663054 27.208245 21.880859 27.234375 A 1.0001 1.0001 0 0 0 23 26.240234 L 23 22.039062 A 1.0001 1.0001 0 0 0 22.0625 21.041016 C 21.906673 21.031216 21.710581 21.011719 21.472656 21.011719 C 16.223131 21.011719 11.945313 25.289537 11.945312 30.539062 C 11.945312 35.788589 16.223131 40.066406 21.472656 40.066406 C 26.72204 40.066409 31 35.788588 31 30.539062 L 31 21.490234 C 32.454611 22.653646 34.267517 23.390625 36.269531 23.390625 C 36.542588 23.390625 36.802305 23.374442 37.050781 23.351562 A 1.0001 1.0001 0 0 0 37.958984 22.355469 L 37.958984 17.685547 A 1.0001 1.0001 0 0 0 37.03125 16.6875 C 33.886609 16.461891 31.379838 14.012216 31.052734 10.896484 A 1.0001 1.0001 0 0 0 30.058594 10 L 26.042969 10 z M 27.041016 12 L 29.322266 12 C 30.049047 15.2987 32.626734 17.814404 35.958984 18.445312 L 35.958984 21.310547 C 33.820114 21.201935 31.941489 20.134948 30.835938 18.453125 A 1.0001 1.0001 0 0 0 29 19.003906 L 29 30.539062 C 29 34.707538 25.641273 38.066406 21.472656 38.066406 C 17.304181 38.066406 13.945312 34.707538 13.945312 30.539062 C 13.945312 26.538539 17.066083 23.363182 21 23.107422 L 21 25.283203 C 18.286416 25.535721 16.121094 27.762246 16.121094 30.539062 C 16.121094 33.483274 18.528445 35.892578 21.472656 35.892578 C 24.401892 35.892578 27 33.586491 27 30.59375 C 27 30.64267 27.001859 29.335571 27.005859 27.494141 C 27.009759 25.65271 27.016224 23.20692 27.021484 20.763672 C 27.030884 16.376775 27.039186 12.849206 27.041016 12 z"></path>
                            </svg>`
                        : ''
                }
          </a>`
            )
            .join('')}
    </div>
  <div class="attention-ribbon">${pageConfig.ribbonText}</div>
  <div class="card-container">
    ${pageConfig?.offers
            ?.map(
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
