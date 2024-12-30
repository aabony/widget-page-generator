export function validatePageConfig(config: any) {
  const errors: string[] = []

  if (!config.title) errors.push('Title is required')
  if (!config.subtitle) errors.push('Subtitle is required')
  if (!config.ribbonText) errors.push('Ribbon text is required')
  if (!config.footerText) errors.push('Footer text is required')
  if (!config.dealInBioName) errors.push('Deal In Bio name is required')

  if (config.socialLinks) {
    config.socialLinks.forEach((link: any, index: number) => {
      if (!link.platform) errors.push(`Social link ${index + 1} is missing a platform`)
      if (!link.url) errors.push(`Social link ${index + 1} is missing a URL`)
    })
  }

  if (config.sections) {
    config.sections.forEach((section: any, index: number) => {
      if (!section.title) errors.push(`Section ${index + 1} is missing a title`)
      if (!section.bodyCode) errors.push(`Section ${index + 1} is missing body code`)
    })
  }

  return errors
}

