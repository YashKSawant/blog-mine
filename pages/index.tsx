// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface IPosts {
  posts: [Post]
}

const Home = ({ posts }: IPosts) => {
  return (

    <div>
      <Head>
        <title>Blog Mine</title>
        <link rel="icon" href="/cube-solid.ico" />
      </Head>
      <Header />
      <div className='max-w-7xl mx-auto'>
        <Hero />
        <Posts posts={posts} />
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
  _id,
  _createdAt,
  title,
  slug,
  mainImage,
  author-> {
  name,
  image,
},
body,
description,
publishedAt,
}`;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts
    }
  };
}