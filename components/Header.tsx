import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
function Header() {
    return (
        <header className=" px-3 py-4 shadow-md ">
            <section className="flex justify-between max-w-7xl mx-auto">
                <div className="flex items-center select-none">
                    <Link href="/">
                        <div className=" object-contain cursor-pointer inline-flex items-center" >
                            <FontAwesomeIcon color="#143F6B" className="mx-2" size="2x" icon={faCube}></FontAwesomeIcon>
                            <h1 className="font-bold text-[#143F6B] text-base sm:text-xl">Blog Mine</h1>
                        </div>
                    </Link>
                </div>
                <div className="inline-flex items-center space-x-3 sm:space-x-5 md:space-x-10 ml-4">
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className="text-white bg-[#143F6B] px-4 rounded-full">Follow</h3>
                </div>
            </section>

        </header>
    )
}

export default Header