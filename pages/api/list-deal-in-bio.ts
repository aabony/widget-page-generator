import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const dealInBioDir = path.join(process.cwd(), 'public', 'dealinbio')
  const indexPath = path.join(dealInBioDir, 'index.json')

  try {
    if (!fs.existsSync(indexPath)) {
      return res.status(200).json({ pages: [] })
    }

    const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    const pages = index.map(entry => ({
      name: entry.name,
      url: `/dealinbio/${entry.name}`,
      lastModified: entry.lastModified
    }))

    res.status(200).json({ pages })
  } catch (error) {
    console.error('Error listing Deal In Bio pages:', error)
    res.status(500).json({ message: 'An error occurred while listing Deal In Bio pages' })
  }
}

