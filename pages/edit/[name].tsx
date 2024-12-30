import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import LandingPageGenerator from '../../components/LandingPageGenerator'
import { toast } from 'react-hot-toast'

export default function EditDealInBio() {
  const router = useRouter()
  const { name } = router.query
  const [pageConfig, setPageConfig] = useState(null)

  useEffect(() => {
    if (name) {
      fetchPageConfig()
    }
  }, [name])

  const fetchPageConfig = async () => {
    try {
      const response = await fetch(`/api/get-deal-in-bio?name=${name}`)
      if (response.ok) {
        const data = await response.json()
        setPageConfig(data.config)
      } else {
        toast.error('Failed to fetch Deal In Bio page configuration')
      }
    } catch (error) {
      console.error('Error fetching Deal In Bio page configuration:', error)
      toast.error('An error occurred while fetching the page configuration')
    }
  }

  if (!pageConfig) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Deal In Bio: {name}</h1>
      <LandingPageGenerator initialConfig={pageConfig} isEditing={true} />
    </div>
  )
}

