import Color from 'color'

export const pageStyles = `
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--background-color);
    color: var(--text-color);
  }
  
  header {
    padding: 40px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--header-gradient-start), var(--header-gradient-end));
    border-bottom: 3px solid var(--accent-color);
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 { 
    font-size: 3.5em; 
    margin: 20px 0 10px;
    font-weight: 800;
    color: var(--heading-color);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .subtitle {
    font-size: 1.5em;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 1.5rem;
    line-height: 1.6;
  }


  .attention-ribbon {
    background: linear-gradient(135deg, var(--ribbon-gradient-start), var(--ribbon-gradient-end));
    color: var(--ribbon-text);
    padding: 0.75rem;
    text-align: center;
    font-weight: 600;
    font-size: 1em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
  }

  .profile-section {
    background-color: #f0f0f0;
    padding: 20px;
    text-align: center;
  }

  .profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--accent-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .content { 
    max-width: 1200px; 
    margin: 3rem auto; 
    padding: 0 2rem;
    flex: 1;
    background: var(--content-bg);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  .section {
    margin: 3rem 0;
    padding: 2rem;
    background: var(--section-bg);
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    color: var(--section-text);
  }

  .section h2 {
    font-size: 2em;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--section-heading);
    background-color: var(--section-title-bg);
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .widget-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }

  .widget-card {
    background: var(--card-background-color);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border-color);
    padding: 1rem;
  }

  .widget-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .widget-card img {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .widget-card-content {
    padding: 1rem;
  }

  .widget-card h3 {
    font-size: 1.1em;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: var(--card-heading);
  }

  .widget-card p {
    color: var(--card-text);
    font-size: 0.9em;
    margin: 0;
    opacity: 0.8;
  }

  .widget-card .price-tag {
    display: inline-flex;
    align-items: center;
    background: var(--price-badge-bg);
    color: var(--price-badge-text);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.9em;
    font-weight: 600;
    margin-top: 0.5rem;
  }

  .widget-card .platform-icons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .widget-card .platform-icon {
    background: var(--platform-badge-bg);
    color: var(--platform-badge-text);
    padding: 0.25rem;
    border-radius: 4px;
    font-size: 0.8em;
  }

  footer {
    background: var(--footer-bg);
    color: var(--footer-text);
    text-align: center;
    padding: 3rem 0;
    margin-top: auto;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5em;
    }
    .subtitle {
      font-size: 1.2em;
    }
    .profile-img {
      width: 90px;
      height: 90px;
    }
  }
`

export const themes = {
  modern: {
    name: 'Modern Minimal',
    styles: {
      headerGradientStart: '#4A90E2',
      headerGradientEnd: '#5CB3FF',
      backgroundColor: '#F4F7FA',
      contentBg: '#FFFFFF',
      sectionGradientStart: '#4A90E2',
      sectionGradientEnd: '#5CB3FF',
      textColor: '#333333',
      sectionText: '#FFFFFF',
      sectionHeading: '#FFFFFF',
      cardHeading: '#4A90E2',
      cardText: '#333333',
      headingColor: '#FFFFFF',
      ribbonGradientStart: '#FFA500',
      ribbonGradientEnd: '#FF6347',
      ribbonText: '#FFFFFF',
      buttonGradientStart: '#4A90E2',
      buttonGradientEnd: '#5CB3FF',
      buttonText: '#FFFFFF',
      footerBg: '#2C3E50',
      footerText: '#FFFFFF',
      accentColor: '#4A90E2',
      cardBackgroundColor: '#FFFFFF',
      borderColor: '#E0E0E0',
    }
  },
  offerwall: {
    name: 'Offerwall Dark',
    styles: {
      headerGradientStart: '#12091D',
      headerGradientEnd: '#1D1128',
      backgroundColor: '#12091D',
      contentBg: '#12091D',
      sectionBg: '#1D1128',
      textColor: '#FFFFFF',
      sectionText: '#FFFFFF',
      sectionHeading: '#FFFFFF',
      cardHeading: '#FFFFFF',
      cardText: '#A8A8B3',
      headingColor: '#FFFFFF',
      ribbonGradientStart: '#6C5DD3',
      ribbonGradientEnd: '#8F7FFA',
      ribbonText: '#FFFFFF',
      buttonGradientStart: '#6C5DD3',
      buttonGradientEnd: '#8F7FFA',
      buttonText: '#FFFFFF',
      footerBg: '#12091D',
      footerText: '#FFFFFF',
      accentColor: '#6C5DD3',
      cardBackgroundColor: '#1D1128',
      borderColor: '#2D2139',
      priceBadgeBg: '#6C5DD3',
      priceBadgeText: '#FFFFFF',
      platformBadgeBg: 'rgba(108, 93, 211, 0.2)',
      platformBadgeText: '#6C5DD3',
      sectionTitleBg: '#2D2139',
    }
  },
  offerwallLight: {
    name: 'Offerwall Light',
    styles: {
      headerGradientStart: '#6C5DD3',
      headerGradientEnd: '#8F7FFA',
      backgroundColor: '#F8F9FE',
      contentBg: '#FFFFFF',
      sectionBg: '#FFFFFF',
      textColor: '#1A1523',
      sectionText: '#1A1523',
      sectionHeading: '#1A1523',
      cardHeading: '#1A1523',
      cardText: '#64618B',
      headingColor: '#FFFFFF',
      ribbonGradientStart: '#6C5DD3',
      ribbonGradientEnd: '#8F7FFA',
      ribbonText: '#FFFFFF',
      buttonGradientStart: '#6C5DD3',
      buttonGradientEnd: '#8F7FFA',
      buttonText: '#FFFFFF',
      footerBg: '#F8F9FE',
      footerText: '#1A1523',
      accentColor: '#6C5DD3',
      cardBackgroundColor: '#FFFFFF',
      borderColor: '#E8E8EF',
      priceBadgeBg: '#6C5DD3',
      priceBadgeText: '#FFFFFF',
      platformBadgeBg: 'rgba(108, 93, 211, 0.1)',
      platformBadgeText: '#6C5DD3',
      sectionTitleBg: '#F8F9FE',
    }
  },
  vibrant: {
    name: 'Vibrant Pop',
    styles: {
      headerGradientStart: '#FF416C',
      headerGradientEnd: '#FF4B2B',
      backgroundColor: '#F5F7FA',
      contentBg: '#FFFFFF',
      sectionGradientStart: '#FF416C',
      sectionGradientEnd: '#FF4B2B',
      textColor: '#333333',
      sectionText: '#FFFFFF',
      sectionHeading: '#FFFFFF',
      cardHeading: '#FF416C',
      cardText: '#333333',
      headingColor: '#FFFFFF',
      ribbonGradientStart: '#4ECDC4',
      ribbonGradientEnd: '#45B7AF',
      ribbonText: '#FFFFFF',
      buttonGradientStart: '#FF416C',
      buttonGradientEnd: '#FF4B2B',
      buttonText: '#FFFFFF',
      footerBg: '#2C3E50',
      footerText: '#FFFFFF',
      accentColor: '#FF416C',
      cardBackgroundColor: '#FFFFFF',
      borderColor: '#E0E0E0',
    }
  },
  dark: {
    name: 'Dark Elegance',
    styles: {
      headerGradientStart: '#2C3E50',
      headerGradientEnd: '#4CA1AF',
      backgroundColor: '#1A1A1A',
      contentBg: '#2C2C2C',
      sectionGradientStart: '#2C3E50',
      sectionGradientEnd: '#4CA1AF',
      textColor: '#FFFFFF',
      sectionText: '#FFFFFF',
      sectionHeading: '#FFFFFF',
      cardHeading: '#4CA1AF',
      cardText: '#FFFFFF',
      headingColor: '#FFFFFF',
      ribbonGradientStart: '#FF6B6B',
      ribbonGradientEnd: '#FF8E53',
      ribbonText: '#FFFFFF',
      buttonGradientStart: '#4CA1AF',
      buttonGradientEnd: '#2C3E50',
      buttonText: '#FFFFFF',
      footerBg: '#1A1A1A',
      footerText: '#FFFFFF',
      accentColor: '#4CA1AF',
      cardBackgroundColor: '#333333',
      borderColor: '#444444',
    }
  },
  nature: {
    name: 'Nature Inspired',
    styles: {
      headerGradientStart: '#134E5E',
      headerGradientEnd: '#71B280',
      backgroundColor: '#F0F4F1',
      contentBg: '#FFFFFF',
      sectionGradientStart: '#134E5E',
      sectionGradientEnd: '#71B280',
      textColor: '#333333',
      sectionText: '#FFFFFF',
      sectionHeading: '#FFFFFF',
      cardHeading: '#134E5E',
      cardText: '#333333',
      headingColor: '#FFFFFF',
      ribbonGradientStart: '#FF6B6B',
      ribbonGradientEnd: '#FF8E53',
      ribbonText: '#FFFFFF',
      buttonGradientStart: '#71B280',
      buttonGradientEnd: '#134E5E',
      buttonText: '#FFFFFF',
      footerBg: '#134E5E',
      footerText: '#FFFFFF',
      accentColor: '#71B280',
      cardBackgroundColor: '#FFFFFF',
      borderColor: '#D1E8D5',
    }
  },
  sunset: {
    name: 'Sunset Glow',
    styles: {
      headerGradientStart: '#FF512F',
      headerGradientEnd: '#F09819',
      backgroundColor: '#FFF9F5',
      contentBg: '#FFFFFF',
      sectionGradientStart: '#FF512F',
      sectionGradientEnd: '#F09819',
      textColor: '#333333',
      sectionText: '#FFFFFF',
      sectionHeading: '#FFFFFF',
      cardHeading: '#FF512F',
      cardText: '#333333',
      headingColor: '#FFFFFF',
      ribbonGradientStart: '#4A90E2',
      ribbonGradientEnd: '#5CB3FF',
      ribbonText: '#FFFFFF',
      buttonGradientStart: '#FF512F',
      buttonGradientEnd: '#F09819',
      buttonText: '#FFFFFF',
      footerBg: '#2C3E50',
      footerText: '#FFFFFF',
      accentColor: '#FF512F',
      cardBackgroundColor: '#FFFFFF',
      borderColor: '#FFE0CC',
    }
  }
}

export const generateThemeCSS = (theme) => {
  const headerColor = Color(theme.styles.headerGradientStart)
  const sectionTitleBg = theme.styles.sectionTitleBg || headerColor.lighten(0.2).hex()

  return `
  :root {
    --header-gradient-start: ${theme.styles.headerGradientStart};
    --header-gradient-end: ${theme.styles.headerGradientEnd};
    --background-color: ${theme.styles.backgroundColor};
    --content-bg: ${theme.styles.contentBg};
    --section-bg: ${theme.styles.sectionBg || theme.styles.contentBg};
    --text-color: ${theme.styles.textColor};
    --section-text: ${theme.styles.sectionText};
    --section-heading: ${theme.styles.sectionHeading};
    --card-heading: ${theme.styles.cardHeading};
    --card-text: ${theme.styles.cardText};
    --heading-color: ${theme.styles.headingColor};
    --ribbon-gradient-start: ${theme.styles.ribbonGradientStart};
    --ribbon-gradient-end: ${theme.styles.ribbonGradientEnd};
    --ribbon-text: ${theme.styles.ribbonText};
    --button-gradient-start: ${theme.styles.buttonGradientStart};
    --button-gradient-end: ${theme.styles.buttonGradientEnd};
    --button-text: ${theme.styles.buttonText};
    --footer-bg: ${theme.styles.footerBg};
    --footer-text: ${theme.styles.footerText};
    --accent-color: ${theme.styles.accentColor};
    --card-background-color: ${theme.styles.cardBackgroundColor};
    --border-color: ${theme.styles.borderColor};
    --section-title-bg: ${sectionTitleBg};
    --price-badge-bg: ${theme.styles.priceBadgeBg || theme.styles.accentColor};
    --price-badge-text: ${theme.styles.priceBadgeText || '#FFFFFF'};
    --platform-badge-bg: ${theme.styles.platformBadgeBg || 'rgba(0,0,0,0.1)'};
    --platform-badge-text: ${theme.styles.platformBadgeText || theme.styles.accentColor};
  }
`
}

