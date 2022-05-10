import React from 'react'

function Hero() {
    return (
        <section className='mx-auto px-6 flex justify-between items-center py-10 lg:py-6 bg-[#FEB139] border-y border-black'>
            <div className='p-4 space-y-5'>
                <h1 className='text-4xl lg:text-5xl max-w-2xl font-serif text-[#08213a]'><span className='underline'>Blog Mine</span>, is a page where you can find my favourite articles at one place.</h1>
                <h2 className='text-lg'>Its easy to share my thoughts, opinions and blogs to the World of Internet.</h2>
            </div>
            <img className='hidden md:inline-flex h-32 lg:h-80 select-none' src="/cube-solid.png" alt="blog mine logo" />

        </section>
    )
}

export default Hero