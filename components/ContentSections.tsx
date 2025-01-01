import React from 'react';

export default function ContentSections({ pageConfig, setPageConfig }) {
  const addCard = () => {
    setPageConfig((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: 'New Card Title',
          subtitle: 'Subtitle goes here',
          description: 'Add a short description here.',
          imageSrc: 'https://via.placeholder.com/300x150', // Placeholder image
          buttonText: 'Download Free',
          buttonLink: '#',
        },
      ],
    }));
  };

  const updateCard = (index, field, value) => {
    const updatedSections = [...pageConfig.sections];
    updatedSections[index][field] = value;
    setPageConfig((prev) => ({ ...prev, sections: updatedSections }));
  };

  const removeCard = (index) => {
    setPageConfig((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Content Sections</h2>
          <button
              onClick={addCard}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Card
          </button>
        </div>
        <div className="space-y-6">
          {pageConfig.sections.map((section, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateCard(index, 'title', e.target.value)}
                      placeholder="Enter title"
                      className="mt-1 w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subtitle
                  </label>
                  <input
                      type="text"
                      value={section.subtitle}
                      onChange={(e) => updateCard(index, 'subtitle', e.target.value)}
                      placeholder="Enter subtitle"
                      className="mt-1 w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                      value={section.description}
                      onChange={(e) =>
                          updateCard(index, 'description', e.target.value)
                      }
                      placeholder="Enter description"
                      className="mt-1 w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                      type="text"
                      value={section.imageSrc}
                      onChange={(e) => updateCard(index, 'imageSrc', e.target.value)}
                      placeholder="Enter image URL"
                      className="mt-1 w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Button Text
                  </label>
                  <input
                      type="text"
                      value={section.buttonText}
                      onChange={(e) =>
                          updateCard(index, 'buttonText', e.target.value)
                      }
                      placeholder="Enter button text"
                      className="mt-1 w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Button Link
                  </label>
                  <input
                      type="text"
                      value={section.buttonLink}
                      onChange={(e) =>
                          updateCard(index, 'buttonLink', e.target.value)
                      }
                      placeholder="Enter button link"
                      className="mt-1 w-full border rounded-lg p-2"
                  />
                </div>
                <button
                    onClick={() => removeCard(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove Card
                </button>
              </div>
          ))}
        </div>
      </div>
  );
}
