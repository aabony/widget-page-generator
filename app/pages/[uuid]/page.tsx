'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { themes, generateThemeCSS, pageStyles } from '../../../lib/themes';

export default function PageView() {
    const { uuid } = useParams();
    const router = useRouter();
    const [pageConfig, setPageConfig] = useState<any>(null);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await fetch(`/api/get-page-by-uuid?uuid=${uuid}`);
                if (response.ok) {
                    const data = await response.json();
                    setPageConfig(data.page);
                } else {
                    toast.error('Failed to fetch page data');
                    router.push('/');
                }
            } catch (error) {
                console.error('Error fetching page data:', error);
                toast.error('An error occurred while fetching the page data');
                router.push('/');
            }
        };

        fetchPageData();
    }, [uuid]);

    if (!pageConfig) {
        return <p>Loading...</p>;
    }

    const themeCSS = generateThemeCSS(themes[pageConfig.theme] || themes['modern']);

    return (
        <div>
            <style jsx>{`
        ${themeCSS}
        ${pageStyles}
        .attention-ribbon {
          text-align: center;
          padding: 10px;
          background: #f4f4f4;
          margin: 20px 0;
        }
        .card-container {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          padding: 20px;
        }
        .card {
          width: 300px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .card-content {
          padding: 16px;
        }
        .card-content h2 {
          font-size: 1.5rem;
          margin: 0 0 8px;
        }
        .card-content h4 {
          font-size: 1.2rem;
          color: #666;
          margin: 0 0 8px;
        }
        .card-content p {
          color: #666;
          font-size: 0.9rem;
          margin: 0 0 16px;
        }
        .card-content a {
          background: #007bff;
          color: white;
          padding: 10px 16px;
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
          display: inline-block;
        }
        .card-content a:hover {
          background: #0056b3;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        .social-links a {
          font-size: 24px;
          color: #007bff;
        }
      `}</style>
            <header>
                <h1>{pageConfig.title}</h1>
                <p>{pageConfig.subtitle}</p>
            </header>
            <div className="attention-ribbon">{pageConfig.ribbonText}</div>
            <div className="card-container">
                {pageConfig.offers.map((offer: any) => (
                    <div key={offer.id} className="card">
                        <img src={offer.imageSrc} alt={offer.title} />
                        <div className="card-content">
                            <h2>{offer.title}</h2>
                            <h4>{offer.subtitle}</h4>
                            <p>{offer.description}</p>
                            <a href={offer.buttonLink} target="_blank" rel="noopener noreferrer">
                                {offer.buttonText}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <footer>
                <p>{pageConfig.footerText}</p>
                <div className="social-links">
                    {pageConfig.socialLinks.map((link: any) => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
                            <i className={`fab fa-${link.platform}`}></i>
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
}
