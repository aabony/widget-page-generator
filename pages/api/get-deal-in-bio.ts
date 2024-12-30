import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name } = req.query

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid name parameter' })
  }

  const sanitizedName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const configPath = path.join(process.cwd(), 'public', 'deal-in-bio', `${sanitizedName}.json`)

  try {
    if (!fs.existsSync(configPath)) {
      return res.status(404).json({ message: 'Deal In Bio page configuration not found' })
    }

    const configData = fs.readFileSync(configPath, 'utf-8')
    const config = JSON.parse(configData)

    res.status(200).json({ config })
  } catch (error) {
    console.error('Error fetching Deal In Bio page configuration:', error)
    res.status(500).json({ message: 'An error occurred while fetching the page configuration' })
  }
}

