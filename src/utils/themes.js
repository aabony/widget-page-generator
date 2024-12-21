export const pageStyles = `
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  header {
    padding: 40px 20px;
    text-align: center;
  }
  .header-img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  h1 { 
    font-size: 2.5em; 
    margin: 20px 0 10px;
  }
  .attention-ribbon {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: black;
    padding: 1rem;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
  }
  .content { 
    max-width: 800px; 
    margin: 2rem auto; 
    padding: 0 1rem;
    flex: 1;
  }
  .section {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  footer {
    background: #2C3E50;
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: auto;
  }
  .social-links {
    margin-bottom: 2rem;
  }
  .social-link {
    display: inline-block;
    margin: 0 10px;
    color: white;
    font-size: 24px;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  .social-link:hover {
    opacity: 1;
  }
`;

export const themes = {
    modern: {
        name: 'Modern Minimal',
        styles: {
            headerGradientStart: '#ffffff',
            headerGradientEnd: '#ffffff',
            backgroundColor: '#fafafa',
            textColor: '#171717'
        }
    },
    gradient: {
        name: 'Gradient Pop',
        styles: {
            headerGradientStart: '#FF6B6B',
            headerGradientEnd: '#4ECDC4',
            backgroundColor: '#ffffff',
            textColor: '#ffffff'
        }
    },
    dark: {
        name: 'Dark Mode',
        styles: {
            headerGradientStart: '#1a1a1a',
            headerGradientEnd: '#2d2d2d',
            backgroundColor: '#000000',
            textColor: '#ffffff'
        }
    }
};
