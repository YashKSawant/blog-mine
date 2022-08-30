import { GetStaticProps } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from '../../typing'
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaCode } from 'react-icons/fa'
import { atomDark, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'


interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}

interface IPost {
    post: Post
}
function Post({ post }: IPost) {

    const [submit, setSubmit] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(() => {
            console.log(data);
            setSubmit(true)
        }).catch((error) => {
            console.log(error);
            setSubmit(false)
        })
    }
    return (
        <>

            <Head>
                <title>{post.title}</title>
                <link rel="icon" href="/cube-solid.ico" />
            </Head>
            <Header />
            <img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()} alt="post banner" />
            <main className="max-w-4xl mx-auto text-base">
                <article className="mb-5 p-5">
                    <h1 className="text-4xl font-bold mt-10 mb-6 text-primary ">{post.title}</h1>
                    <h2 className="text-xl font-medium mb-4">{post.description}</h2>
                    <div className="flex items-center space-x-4 mt-3">
                        <img className="h-12 w-12 rounded-full border-4 border-secondary" src={urlFor(post.author.image).url()} alt="" />
                        <p className='font-extralight text-lg '>Posted by <span className="font-semibold text-[#064a8d]">{post.author.name}</span>  - Published at {new Date(post.publishedAt).toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    </div>
                    <div className="mt-8">
                        {post.categories.map((category, index) => (
                            <span className="px-3 py-1 rounded-xl ml-3 bg-[#c3e2ff] text-[#143F6B]" key={index}>#{category.toLowerCase()}</span>
                        ))}
                    </div>

                    <div className="mt-10 max-w-full text-justify">
                        <PortableText

                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                            projectId={process.env.NEXT_PUBLIC_SANITY_PORJECT_ID!}
                            content={post.body}
                            serializers={
                                {
                                    h1: (props: any) => <h1 className="text-4xl font-bold my-8" {...props} />,
                                    h2: (props: any) => <h2 className="text-3xl font-bold my-6" {...props} />,
                                    h3: (props: any) => <h3 className="text-2xl font-bold my-6" {...props} />,
                                    h4: (props: any) => <h3 className="text-xl font-bold my-4" {...props} />,
                                    h5: (props: any) => <h3 className="text-lg font-bold my-2" {...props} />,
                                    h6: (props: any) => <h3 className="text-base font-bold my-1" {...props} />,
                                    ol: ({ children }: any) => <ol>{children}</ol>,
                                    li: ({ children, _key }: any) => <li key={_key} className="list-disc ml-6">{children}</li>,
                                    blockquote: ({ children }: any) => <div className="font-light italic text-lg bg-slate-100 my-4 p-4 rounded-md border-l-4 border-primary"> - {children}</div>,
                                    customImage: ({ asset, alt, reference, _key }: any) => <figure className="flex flex-col">
                                        <img key={_key} className="select-none w-full h-full mt-6 mb-3" alt={alt} src={urlFor(asset).url()} />
                                        <figcaption className="my-2 text-xs font-serif mx-auto md:text-sm text-gray-400 justify-center">{reference}</figcaption>
                                    </figure>,
                                    link: ({ href, children }: any) => <a className="text-blue-700 hover:underline" target='_blank' href={href}>{children}</a>,
                                    code: ({ children }: any) => <pre className="rounded-md p-1 bg-[#d8d8d8] inline">{children}</pre>,
                                    customCode: ({ code }: any) => <div className="mt-8 relative mb-4 ">
                                        <div className="flex justify-between">
                                            <span className="mb-0 border-x-2 px-3 py-1 rounded-md text-gray-900 bg-[#f5f2f0] ">
                                                {code.language.toUpperCase()}</span>
                                            <CopyToClipboard text={code.code}>
                                                <button className="text-gray-400 hover:text-blue-700 absolute top-12 right-2 transition-all duration-200 ease-in"><FaRegCopy size={18} /></button>
                                            </CopyToClipboard>
                                        </div>
                                        <SyntaxHighlighter language={code.language || "text"} style={atomDark} className='hover:bg-opacity-10 rounded-md mt-0' >{code.code}</SyntaxHighlighter>
                                    </div>,
                                }
                            }
                        />
                    </div>
                </article>
                <hr className="divider" />
                {submit ? (
                    <div className="submitted-form">
                        <h2 className="text-3xl mb-5">Thank you very much for your suggestion.</h2>
                        <p className="italic text-md">Comment will appear after been approved.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} id='form'>
                        <h1>Have some suggestions?</h1>
                        <h2>Leave a comment down below.</h2>
                        <hr className="mt-2 py-4" />
                        <input type="hidden"{...register("_id")} name="_id" value={post._id} />
                        <label className="block mb-5">
                            <span className="text-gray-700 text-xl">Name</span>
                            <input {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name Field is Required"
                                },
                            })}
                                className="input-fields form-input"
                                placeholder="Danish Maxwell"
                                type="text" />
                            {errors.name?.message && (
                                <div className="text-red-600 mt-3"> <sup>*</sup> {errors.name?.message}</div>
                            )}
                        </label>
                        <label className="block mb-5">
                            <span className="text-gray-700 text-xl">Email</span>
                            <input {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email Field is Required"
                                },
                                pattern: {
                                    value:
                                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Invalid email address",
                                },
                            })}
                                className="input-fields form-input"
                                placeholder="danishmaxwell69@gmail.com"
                                type="email" />
                            {errors.email?.message && (
                                <div className="text-red-600 mt-3"><sup>*</sup> {errors.email?.message}</div>
                            )}
                        </label>
                        <label className="block mb-5">
                            <span className="text-gray-700 text-xl">Comment</span>
                            <textarea {...register("comment", {
                                required: {
                                    value: true,
                                    message: "Comment Field is Required"
                                },
                            })}
                                className="input-fields form-input"
                                placeholder="This article is sick!"
                                rows={8}></textarea>
                            {errors.comment?.message && (
                                <div className="text-red-600 mt-3"><sup>*</sup> {errors.comment?.message}</div>
                            )}
                        </label>
                        <input type="submit" className="btn-submit" />
                    </form>
                )}
                {/* Comments */}
                <section id="comments" >
                    <h3 className="text-2xl mb-2 font-bold">Comments</h3>
                    <hr className="mt-2 py-2" />

                    {
                        post.comments.length ? (
                            <div>{post.comments.map((comment) => (
                                <p>
                                    <span className="font-bold text-xl block py-3">{comment.name} <span className="font-light text-sm"> @ {new Date(comment._createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</span> </span>
                                    {comment.comment}
                                </p>
                            ))}</div>
                        ) :
                            (
                                <div>Looks like there's silence here 😶.</div>
                            )
                    }
                </section>
            </main>
        </>

    )
}

export default Post
export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
  _id,
  title,
  slug,
}`;
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }));
    return {
        paths,
        fallback: 'blocking',
    };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current==$slug][0]{
  _id,
  _createdAt,
  publishedAt,
  title,
  slug,
  mainImage,
  author-> {
  name,
  image,
},
  "comments":*[
      _type == "comment" &&
      post._ref == ^._id &&
      approved ==true
  ],
body,
description,
"categories": categories[]->title
}`
    const post = await sanityClient.fetch(query, { slug: params?.slug });
    if (!post) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            post,
        },
        revalidate: 60,
    };
}