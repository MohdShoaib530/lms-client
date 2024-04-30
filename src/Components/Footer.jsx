import { BsGithub,BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FcManager } from "react-icons/fc";
import { SiGmail } from "react-icons/si";

function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const socialMedia = [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/mohd-shoaib530/",
          icon: <BsLinkedin />,
        },
        {
          name: "GitHub",
          url: "https://github.com/MohdShoaib530",
          icon: <BsGithub />,
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/mohd.shoaib_123/",
          icon: <BsInstagram />,
        },
        {
          name: "Gmail",
          url: "mailto:mohdshoaib91530@gmail.com",
          icon: <SiGmail />,
        },
        {
          name: "Twitter",
          url: "https://twitter.com/MohdShoaib530",
          icon: <BsTwitter />,
        },
        {
          name: "Md Shoaib",
          url: "https://mohdshoaib9.netlify.app/",
          icon: <FcManager />,
        },
      ];
    return (
        <div className='bg-gray-800 text-white'>
            <footer className="footer p-10  flex flex-wrap gap-14 sm:flex-row items-center justify-between">
                <nav>
                    <header className="footer-title">Courses</header>
                    <a className="link link-hover">FULL STACK DEV</a>
                    <a className="link link-hover">FULL STACK WEB DEV</a>
                    <a className="link link-hover">CLOUD COMPUTING</a>
                    <a className="link link-hover">DATA SCIENCE</a>
                    <a className="link link-hover">AI & ML</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Mentors</a>
                    <a className="link link-hover">Jobs</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer text-white px-10 py-4 border-t ">
                <aside className="items-center grid-flow-col">
                    <p>© {year} CODE Pvt Ltd. <br /> All rights reserved.</p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-5 text-2xl">
                        {socialMedia.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="link link-hover"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </nav>
            </footer>
        </div>  
    );
}

export default Footer;
