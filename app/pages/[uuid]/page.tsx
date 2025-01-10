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

    const executeWidgetScripts = () => {
        pageConfig.offers
            .filter((offer: any) => offer.type === 'widget' && offer.widgetCode)
            .forEach((offer: any) => {
                const container = document.createElement('div');
                container.innerHTML = offer.widgetCode;

                // Добавляем контейнер в DOM временно
                document.body.appendChild(container);

                // Извлекаем все <script>-теги
                const scripts = container.querySelectorAll('script');
                scripts.forEach((oldScript) => {
                    const newScript = document.createElement('script');

                    // Копируем все атрибуты
                    Array.from(oldScript.attributes).forEach((attr) =>
                        newScript.setAttribute(attr.name, attr.value)
                    );

                    // Оборачиваем содержимое скрипта в IIFE
                    newScript.textContent = `(function() { ${oldScript.textContent} })();`;

                    // Добавляем новый скрипт в DOM
                    document.body.appendChild(newScript);
                });

                // Удаляем временный контейнер
                document.body.removeChild(container);
            });
    };
    useEffect(() => {
        if (pageConfig) {
            executeWidgetScripts();
        }
    }, [pageConfig]);
    if (!pageConfig) {
        return <p>Loading...</p>;
    }

    const themeCSS = generateThemeCSS(themes[pageConfig.theme] || themes['modern']);

    // @ts-ignore
    // @ts-ignore
    return (

        <div>
            <style jsx>{`
        ${themeCSS}
        ${pageStyles}
        .attention-ribbon {
          text-align: center;
          padding: 10px;
          background: var(--ribbon-background, #f4f4f4);
          color: var(--ribbon-color, #000);
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
          background: var(--card-background, white);
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
          color: var(--card-title-color, #000);
          margin: 0 0 8px;
        }
        .card-content h4 {
          font-size: 1.2rem;
          color: var(--card-subtitle-color, #666);
          margin: 0 0 8px;
        }
        .card-content p {
          color: var(--card-text-color, #666);
          font-size: 0.9rem;
          margin: 0 0 16px;
        }
        .card-content a {
          background: var(--button-background, #007bff);
          color: var(--button-color, white);
          padding: 10px 16px;
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
          display: inline-block;
        }
        .card-content a:hover {
          background: var(--button-hover-background, #0056b3);
        }
        .social-links-wrapper {
          background: var(--social-links-background, #3498db);
          padding: 20px 0;
          text-align: center;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .social-links a {
          font-size: 24px;
          color: white;
          background: rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30vh; 
        }
        .header-img {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 5px solid var(--social-links-background,  #3498db);
        }
        .social-links a:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
            <header>
                <div className="image-container">
                    <img src={pageConfig.profilePic} alt="Profile" className="header-img"/>
                </div>
                <h1>{pageConfig.title}</h1>
                <p>{pageConfig.subtitle}</p>
            </header>
            <div className="social-links-wrapper">
                <div className="social-links">
                    {pageConfig.socialLinks.map((link: any) => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.platform === 'facebook' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
                                    <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z"></path>
                                </svg>
                                : ''}

                            {link.platform ==='instagram' ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  width="24" height="24" viewBox="0 0 30 30">
                                    <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
                                </svg>
                                : ""}
                            {link.platform ==='x' ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
                                    <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                                </svg>
                                : ""}
                            {link.platform ==='tiktok' ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
                                    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
                                </svg>
                                : ""}
                        </a>
                    ))}
                </div>
            </div>
            <div className="attention-ribbon">{pageConfig.ribbonText}</div>
            <div className="card-container">
                {pageConfig.offers.map((offer: any) =>
                    offer.type === 'widget' ? (
                        <div
                            className="pl-10"
                            key={offer.id}
                            dangerouslySetInnerHTML={{ __html: offer.widgetCode }}
                        />
                    ) : (

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
            </footer>
        </div>
    );
}
