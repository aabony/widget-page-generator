import React, { useState, useEffect } from 'react'

interface SaveStatusLogProps {
  message: string
  isError?: boolean
}

export default function SaveStatusLog({ message, isError = false }: SaveStatusLogProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [message])

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-500 ${
        isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      }`}
      style={{
        animation: 'rollIn 0.5s ease-out',
      }}
    >
      {message}
      <style jsx>{`
        @keyframes rollIn {
          from {
            opacity: 0;
            transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  )
}

