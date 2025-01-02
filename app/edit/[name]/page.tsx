'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface EditPageProps {
    params: { name: string };
}

export default function EditPage({ params }: EditPageProps) {
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await fetch(`/api/get-page?name=${params.name}`);
                if (response.ok) {
                    const data = await response.json();
                    setPageData(data.page);
                } else {
                    toast.error('Failed to fetch page data');
                    router.push('/admin');
                }
            } catch (error) {
                console.error('Error fetching page data:', error);
                toast.error('An error occurred while fetching the page data');
                router.push('/admin');
            } finally {
                setLoading(false);
            }
        };

        fetchPageData();
    }, [params.name, router]);

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/update-page`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageData),
            });

            if (response.ok) {
                toast.success('Page updated successfully');
                router.push('/admin');
            } else {
                toast.error('Failed to update page');
            }
        } catch (error) {
            console.error('Error updating page:', error);
            toast.error('An error occurred while updating the page');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Edit Page</h1>
            <div>
                <label className="block text-sm font-medium text-gray-700">Page Name</label>
                <input
                    type="text"
                    value={pageData.name}
                    onChange={(e) => setPageData({ ...pageData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Save Changes
            </button>
        </div>
    );
}
