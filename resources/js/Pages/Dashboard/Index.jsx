import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';

export default function DashboardPage(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl leading-tight">{props.title}</h2>}
        >
            <Head title={props.title} />
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
                <div className="flex flex-col md:flex-row w-full gap-2">
                    <Link href={route('posts.create')} method="get" as="button" className='btn btn-outline'>Create New Post</Link>
                    <Link href={route('posts.main')} method="get" as="button" className='btn btn-outline'>Manage My Post</Link>
                    <button className='btn btn-outline'>Badge Saya <span className="ml-2 badge badge-sm badge-primary">Soon</span></button>
                </div>
            </div>
        </Authenticated>
    );
}
