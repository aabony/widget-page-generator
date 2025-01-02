import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PageProps {
    params: { uuid: string };
}

export default async function Page({ params }: PageProps) {
    const { uuid } = params;

    // Получаем данные страницы
    const page = await prisma.page.findUnique({
        where: { uuid },
        include: { offers: true },
    });

    if (!page) {
        notFound();
    }

    return (
        <main className="bg-gray-100 min-h-screen">
            <header className="bg-blue-600 text-white text-center py-6">
                <h1 className="text-3xl font-bold">{page.title}</h1>
                <p className="text-lg">{page.subtitle}</p>
            </header>
            <section className="p-8">
                <div className="flex flex-wrap gap-6 justify-center">
                    {page.offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden w-72"
                        >
                            {offer.imageSrc && (
                                <img
                                    src={offer.imageSrc}
                                    alt={offer.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{offer.title}</h2>
                                {offer.subtitle && (
                                    <h4 className="text-md text-gray-500 mb-2">{offer.subtitle}</h4>
                                )}
                                <p className="text-gray-700 text-sm mb-4">{offer.description}</p>
                                <a
                                    href={offer.buttonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
                                >
                                    {offer.buttonText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <footer className="bg-gray-200 text-center py-4">
                <p>{page.footerText}</p>
            </footer>
        </main>
    );
}
