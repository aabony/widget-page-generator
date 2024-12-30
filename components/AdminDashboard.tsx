'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface DealInBioPage {
  name: string
  url: string
  lastModified: string
}

export default function AdminDashboard() {
  const [pages, setPages] = useState<DealInBioPage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesPerPage] = useState(10)
  const [sortBy, setSortBy] = useState<'name' | 'lastModified'>('lastModified')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/list-deal-in-bio')
      if (response.ok) {
        const data = await response.json()
        setPages(data.pages)
      } else {
        toast.error('Failed to fetch Deal In Bio pages')
      }
    } catch (error) {
      console.error('Error fetching Deal In Bio pages:', error)
      toast.error('An error occurred while fetching Deal In Bio pages')
    }
  }

  const sortedPages = [...pages].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else {
      return sortOrder === 'asc'
        ? new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
        : new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    }
  })

  const filteredPages = sortedPages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastPage = currentPage * pagesPerPage
  const indexOfFirstPage = indexOfLastPage - pagesPerPage
  const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleSort = (column: 'name' | 'lastModified') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Deal In Bio Pages</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastModified')}
              >
                Last Modified {sortBy === 'lastModified' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPages.map((page) => (
              <tr key={page.name}>
                <td className="px-6 py-4 whitespace-nowrap">{page.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={page.url} className="text-blue-600 hover:text-blue-900" target="_blank">
                    {page.url}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(page.lastModified).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/edit/${page.name}`} className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredPages.length / pagesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

