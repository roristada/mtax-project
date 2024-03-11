"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function TableData({ params }: { params: { id: string } }) {
    const [postData, setPostData] = useState<any>({});
    const [data, setData] = useState(""); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/post-blog/${params.id}`);
                const data = await res.json();
                console.log(data);
                setPostData(data[0]);
                setData(data[0].header);
                console.log(data[0].header);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <div>
            <h1>{params.id}</h1>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={postData.image || ''}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">ชื่อคนโพส:{postData.staff}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">หัวเรื่อง:{postData.header}</h1>
                            <p className="leading-relaxed">{postData.detail}</p>
                            <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-100 mb-4"></div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    ชื่อคนโพส: {postData.author}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
