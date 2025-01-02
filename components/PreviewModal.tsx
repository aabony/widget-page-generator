import React from 'react'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  html: string
}

export default function PreviewModal({ isOpen, onClose, html }: PreviewModalProps) {
  console.log(html)
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>
        <div className="flex-grow overflow-auto">
          <iframe
            srcDoc={html}
            className="w-full h-full border-none"
            title="Preview"
          />
        </div>
      </div>
    </div>
  )
}

