import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return (
            <footer className="flex items-center justify-between flex-wrap space-y-5 md:space-y-0 px-5 text-white bg-gray-800 py-5 w-full">
                <div className="text-lg">
                    Copyright {year} | All rights reserved
                </div>
                <div className="flex items-center justify-between text-2xl text-white w-fit gap-5">
                    <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsInstagram />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsFacebook />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsLinkedin />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsTwitter />
                    </a>
                </div>
            </footer>   
    );
}

export default Footer;
