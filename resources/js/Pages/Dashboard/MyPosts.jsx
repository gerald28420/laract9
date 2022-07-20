import React, { useEffect, useState } from 'react';

import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react'
import { formatTime } from '@/utils/jsHelper';
import { Inertia } from '@inertiajs/inertia';
import NotificationAlert from '@/Components/Default/NotificationAlert';

export default function MyPosts(props) {
  const { flash } = usePage().props
  const [wantRemove, setWantRemove] = useState(false)
  const [showNotif, setShowNotif] = useState(false)

  const handleRemoveConfirmation = () => {
    setWantRemove(true)
  }

  useEffect(() => {
    flash.message ? setShowNotif(true) : setShowNotif(false)
    return () => props.flash
  }, [props])

  const removePosts = (id) => {
    Inertia.post('/dashboard/posts/delete', { id })
    return setWantRemove(false)
  }



  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={
        <div className='flex flex-row justify-between'>
          <h2 className="font-semibold text-xl leading-tight cursor-default">{props.page}</h2>
          <Link href={`${route(props.nextRoute)}`} method="get" as="button" className="btn btn-sm btn-link leading-tight">{props.next}</Link>
        </div>
      }
    >
      <Head title="Dashboard" />
      <div className='flex flex-col justify-center items-center lg:flex-row lg:flex-wrap lg:items-strech pt-6 px-4 gap-6'>
        {showNotif && <NotificationAlert message={flash.message} />}
        {props.data.length > 0 ? props.data.map((posts, i) => {
          return (
            <Link href={`/post/${posts.id}`} method="get" as="div" key={i} className="card w-full md:w-1/2 lg:w-1/3 bg-base-300 shadow-lg">
              <div className="card-body">
                <div className='card-title'>
                  <p className={`text-xl text-left ${posts.description.length > 100 ? "break-normal overflow-x-hidden" : "break-words"} h-20`}>{posts.description}</p>
                </div>
                <div className="card-actions justify-between">
                  <div className='text-xs'>
                    posted {formatTime(posts.updated_at)} | {posts.comments.length} comment
                  </div>
                  <label onClick={() => handleRemoveConfirmation()} className="cursor-pointer badge badge-outline modal-button" htmlFor={`my-modal-${posts.id}`}>remove</label>
                  {wantRemove &&
                    <>
                      <input type="checkbox" id={`my-modal-${posts.id}`} className="modal-toggle" />
                      <div className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Hapus Postingan </h3>
                          <p className="py-4">Kamu yakin ingin menghapus postingan <b>{posts.title}</b>?</p>
                          <div className="modal-action">
                            <label htmlFor={`my-modal-${posts.id}`} className="btn btn-outline" onClick={() => removePosts(posts.id)}>Ya Hapus</label>
                            <label htmlFor={`my-modal-${posts.id}`} className="btn btn-inline">Gak</label>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                </div>
              </div>
            </Link>
          )
        }) : <div className='text-center'>
          <p className='font-bold text-2xl'>
            kamu belum punya postingan
          </p>
          <Link href={
            route('posts.create')} as="button" className='btn btn-link'>Post Sekarang!</Link>
        </div>}
      </div>
    </Authenticated >
  );
}
