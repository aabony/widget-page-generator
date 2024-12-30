import React from 'react'

export default function ContentSections({ pageConfig, setPageConfig }) {
  const addSection = () => {
    const newSectionIndex = pageConfig.sections.length + 1;
    const widgetId = `adblm-widget-${newSectionIndex}`;
    
    setPageConfig(prev => ({
      ...prev,
      sections: [...prev.sections, {
        title: `Offer Section ${newSectionIndex}`,
        headCode: '',
        bodyCode: `<div id="${widgetId}"></div>`,
        widgetId: widgetId
      }]
    }))
  }

  const updateSectionCode = (index, headCode) => {
    const updatedSections = [...pageConfig.sections];
    const section = updatedSections[index];
    const widgetId = section.widgetId;

    // Extract the widgetId from the pasted code
    const widgetIdMatch = headCode.match(/widgetId:\s*['"]([^'"]+)['"]/);
    const extractedWidgetId = widgetIdMatch ? widgetIdMatch[1] : '';

    // Modify the headCode to use the correct widgetId for initialization
    const modifiedHeadCode = headCode.replace(
      /adblm\('init',\s*['"]adblm-widget['"]/,
      `adblm('init', '${widgetId}'`
    );

    updatedSections[index] = {
      ...section,
      headCode: modifiedHeadCode,
      bodyCode: `<div id="${widgetId}"></div>`,
      extractedWidgetId: extractedWidgetId
    };

    setPageConfig(prev => ({ ...prev, sections: updatedSections }));
  }

  return (
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
                  const newSections = [...pageConfig.sections]
                  newSections[index].title = e.target.value
                  setPageConfig(prev => ({ ...prev, sections: newSections }))
                }}
                placeholder="Enter section title"
                className="mt-1 w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Widget ID: {section.widgetId}</label>
              <p className="text-sm text-gray-500">This unique ID ensures proper widget initialization</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Header Code</label>
              <textarea
                value={section.headCode}
                onChange={(e) => updateSectionCode(index, e.target.value)}
                placeholder="Paste widget initialization code here"
                className="mt-1 w-full border rounded-lg p-2 font-mono h-32"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Extracted Widget ID</label>
              <input
                type="text"
                value={section.extractedWidgetId || ''}
                readOnly
                className="mt-1 w-full border rounded-lg p-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Body Code (Auto-generated)</label>
              <textarea
                value={section.bodyCode}
                readOnly
                className="mt-1 w-full border rounded-lg p-2 font-mono h-32 bg-gray-100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

