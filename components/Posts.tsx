import Link from 'next/link'
import React from 'react'
import { Post } from '../typing'
import { sanityClient, urlFor } from '../sanity'


interface IPosts {
    posts: [Post]
}
function Posts({ posts }: IPosts) {
    return (
        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-4'>{posts.map((post) => {
            return (
                <Link key={post._id} href={`/posts/${post.slug.current}`}>
                    <div className='border rounded-md shadow-md group cursor-pointer overflow-hidden' >
                        <img className='rounded-md h-60 w-full object-cover group-hover:scale-105 transition-transform duration-400 ease-in-out' src={urlFor(post.mainImage).url()} alt="" />
                        <section className='flex justify-between p-5'>
                            <div>
                                <h3 className='font-bold text-lg'>{post.title}</h3>
                                <p className='font-normal text-sm'>{post.description} </p>
                            </div>
                            <div>
                                <img className='h-12 w-12 rounded-full border-4 border-[#FEB139]' src={urlFor(post.author.image).url()} alt="" />
                            </div>
                        </section>
                        <p className='font-thin text-lg p-5 pt-0'>Posted at {new Date(post._createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    </div>
                </Link>
            )
        })}</div>
    )
}

export default Posts