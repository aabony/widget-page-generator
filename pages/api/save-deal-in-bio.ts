import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, html, config, overwrite } = req.body

  if (!name || !html || !config) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const sanitizedName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const dealInBioDir = path.join(process.cwd(), 'public', 'dealinbio')
  const filePath = path.join(dealInBioDir, `${sanitizedName}.html`)
  const configPath = path.join(dealInBioDir, `${sanitizedName}.json`)

  try {
    console.log(`Attempting to save Deal In Bio page: ${sanitizedName}`)

    // Check if the file already exists
    if (fs.existsSync(filePath) && !overwrite) {
      console.log(`File already exists: ${filePath}`)
      return res.status(409).json({ message: 'A Deal In Bio page with this name already exists' })
    }

    // Ensure the directory exists
    if (!fs.existsSync(dealInBioDir)) {
      console.log(`Creating directory: ${dealInBioDir}`)
      fs.mkdirSync(dealInBioDir, { recursive: true })
    }

    // Write the HTML file
    fs.writeFileSync(filePath, html)
    console.log(`HTML file saved: ${filePath}`)

    // Write the config file
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log(`Config file saved: ${configPath}`)

    // Update the index file
    const indexPath = path.join(dealInBioDir, 'index.json')
    let index = []
    if (fs.existsSync(indexPath)) {
      index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    }
    // @ts-ignore
    const existingEntryIndex = index.findIndex(entry => entry.name === sanitizedName)
    if (existingEntryIndex !== -1) {
      // @ts-ignore
      index[existingEntryIndex] = { name: sanitizedName, lastModified: new Date().toISOString() }
    } else {
      // @ts-ignore
      index.push({ name: sanitizedName, lastModified: new Date().toISOString() })
    }
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))
    console.log(`Index file updated: ${indexPath}`)

    res.status(200).json({ message: 'Deal In Bio page saved successfully', path: `/dealinbio/${sanitizedName}.html` })
  } catch (error) {
    console.error('Error saving Deal In Bio page:', error)
    res.status(500).json({ message: 'An error occurred while saving the Deal In Bio page', error: error.message })
  }
}

