import React from 'react'
import { themes } from '../lib/themes'

interface ThemeSelectorProps {
  selectedTheme: string
  setSelectedTheme: (theme: string) => void
}

export default function ThemeSelector({ selectedTheme, setSelectedTheme }: ThemeSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Choose Theme</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => setSelectedTheme(key)}
            className={`p-4 rounded-lg transition-all ${
              selectedTheme === key
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            style={{
              background: `linear-gradient(135deg, ${theme.styles.headerGradientStart}, ${theme.styles.headerGradientEnd})`,
            }}
          >
            <div className="w-full aspect-video rounded-md mb-2" style={{ background: theme.styles.backgroundColor }}>
              <div className="w-full h-1/3" style={{ background: `linear-gradient(135deg, ${theme.styles.ribbonGradientStart}, ${theme.styles.ribbonGradientEnd})` }}></div>
            </div>
            <span className="text-sm font-medium" style={{ color: theme.styles.textColor }}>
              {theme.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

