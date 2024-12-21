import { useState } from 'react';
import { themes, pageStyles } from './utils/themes.js';


function App() {
    const [showPreview, setShowPreview] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('modern');
    const [pageConfig, setPageConfig] = useState({
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
                bodyCode: '',
                widgetId: 'adblm-widget-1'
            }
        ]
    });

    const addSection = () => {
        setPageConfig(prev => ({
            ...prev,
            sections: [...prev.sections, {
                title: '',
                headCode: '',
                bodyCode: '',
                widgetId: `adblm-widget-${prev.sections.length + 1}`
            }]
        }));
    };

    const addSocialLink = () => {
        setPageConfig(prev => ({
            ...prev,
            socialLinks: [...prev.socialLinks, { platform: 'facebook', url: '' }]
        }));
    };

    const removeSocialLink = (index) => {
        setPageConfig(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter((_, i) => i !== index)
        }));
    };

    const updateSocialLink = (index, field, value) => {
        const newLinks = [...pageConfig.socialLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setPageConfig(prev => ({ ...prev, socialLinks: newLinks }));
    };

    const generateHTML = () => {
        const theme = themes[selectedTheme];
        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageConfig.title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        ${pageStyles}
        body {
            background: ${theme.styles.backgroundColor};
            color: ${theme.styles.textColor};
        }
        header {
            background: linear-gradient(135deg, ${theme.styles.headerGradientStart}, ${theme.styles.headerGradientEnd});
        }
    </style>
    ${pageConfig.sections.map(section => section.headCode).join('\n')}
</head>
<body>
    <header>
        ${pageConfig.profilePic ? `<img src="${pageConfig.profilePic}" alt="Profile" class="header-img">` : ''}
        <h1>${pageConfig.title}</h1>
        <p>${pageConfig.subtitle}</p>
    </header>
    
    <div class="attention-ribbon">
        ${pageConfig.ribbonText}
    </div>

    <div class="content">
        ${pageConfig.sections.map(section => `
            <div class="section">
                ${section.title ? `<h2>${section.title}</h2>` : ''}
                <div id="${section.widgetId}">${section.bodyCode}</div>
            </div>
        `).join('')}
    </div>

    <footer>
        <div class="social-links">
            ${pageConfig.socialLinks.map(link =>
            link.url ? `<a href="${link.url}" class="social-link" target="_blank">
                <i class="fab fa-${link.platform === 'x' ? 'x-twitter' : link.platform}"></i>
              </a>` : ''
        ).join('')}
        </div>
        <div class="footer-text">
            ${pageConfig.footerText}
        </div>
    </footer>
</body>
</html>`;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Theme Selection */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Choose Theme</h2>
                    <select
                        value={selectedTheme}
                        onChange={(e) => setSelectedTheme(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    >
                        {Object.entries(themes).map(([key, theme]) => (
                            <option key={key} value={key}>{theme.name}</option>
                        ))}
                    </select>
                </div>

                {/* Page Information */}
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

                {/* Attention Ribbon */}
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

                {/* Widget Sections */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Content Sections</h2>
                        <button
                            onClick={addSection}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Add Section
                        </button>
                    </div>
                    <div className="space-y-6">
                        {pageConfig.sections.map((section, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Section Title</label>
                                    <input
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => {
                                            const newSections = [...pageConfig.sections];
                                            newSections[index].title = e.target.value;
                                            setPageConfig(prev => ({ ...prev, sections: newSections }));
                                        }}
                                        placeholder="Enter section title"
                                        className="mt-1 w-full border rounded-lg p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Widget ID: {section.widgetId}</label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Header Code</label>
                                    <textarea
                                        value={section.headCode}
                                        onChange={(e) => {
                                            const newSections = [...pageConfig.sections];
                                            newSections[index].headCode = e.target.value;
                                            setPageConfig(prev => ({ ...prev, sections: newSections }));
                                        }}
                                        placeholder="Paste widget initialization code"
                                        className="mt-1 w-full border rounded-lg p-2 font-mono h-32"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Body Code</label>
                                    <textarea
                                        value={section.bodyCode}
                                        onChange={(e) => {
                                            const newSections = [...pageConfig.sections];
                                            newSections[index].bodyCode = e.target.value;
                                            setPageConfig(prev => ({ ...prev, sections: newSections }));
                                        }}
                                        placeholder="Paste widget body code"
                                        className="mt-1 w-full border rounded-lg p-2 font-mono h-32"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links Section */}
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
                    <div className="space-y-4">
                        {pageConfig.socialLinks.map((link, index) => (
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

                {/* Footer Content */}
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

                {/* Preview & Generate Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowPreview(true)}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => {
                            const html = generateHTML();
                            const blob = new Blob([html], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'landing-page.html';
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                        className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Generate Page
                    </button>
                </div>

                {/* Preview Modal */}
                {showPreview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
                            <div className="p-4 border-b flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Preview</h3>
                                <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700">
                                    Close
                                </button>
                            </div>
                            <div className="p-4 h-[80vh] overflow-auto">
                                <iframe
                                    srcDoc={generateHTML()}
                                    className="w-full h-full border rounded"
                                    title="Preview"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
