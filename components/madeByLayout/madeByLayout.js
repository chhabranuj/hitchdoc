import { IoEarth } from "react-icons/io5";
import { FaCopyright } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import madeByLayoutStyle from "./madeByLayout.module.css";

const MadeBy = () => {
    const ourPartners = [
        {
            title: "PenDownOnPaper",
            logo: <IoEarth className={madeByLayoutStyle.linkLogo} />,
            link: "https://pendownonpaper.netlify.app/"
        },
    ]

    const connectWithUs = [
        {
            title: "Github",
            logo: <IoLogoGithub className={madeByLayoutStyle.linkLogo} />,
            link: "https://github.com/chhabranuj"
        },
        {
            title: "LinkedIn",
            logo: <IoLogoLinkedin className={madeByLayoutStyle.linkLogo} />,
            link: "https://www.linkedin.com/in/anuj-chhabra-b0b2a422a/"
        },
        {
            title: "Whatsapp",
            logo: <IoLogoWhatsapp className={madeByLayoutStyle.linkLogo} />,
            link: "https://wa.me/7217746275"
        },
        {
            title: "Know Us",
            logo: <IoEarth className={madeByLayoutStyle.linkLogo} />,
            link: "https://chhabranuj.netlify.app"
        },
    ]

    return(
        <div className={madeByLayoutStyle.madeByParent}>
            <div className={madeByLayoutStyle.linkParentContainer}>
            <div style={{justifyContent: "center"}} className={madeByLayoutStyle.linkContainer}>
                <p className={madeByLayoutStyle.linkTitle}>HitchDoc</p> 
                <p className={madeByLayoutStyle.disclaimer}><span style={{color: "red"}}>*Disclaimer:- </span>Under no circumstances shall hitchdoc or its affiliates, partners, suppliers or licensors be liable for any damages, losses or stealings of the files of the user. Once files are uploaded on our website, only user will responsible for everything that will happen to the files. The foregoing limitations will apply even if the above stated remedy fails of its essential purpose.</p>
            </div>
            <div className={madeByLayoutStyle.linkContainer}>
                <p className={madeByLayoutStyle.linkTitle}>Our Partners</p>
                <div>
                    {
                        ourPartners.map((item, index) => {
                            return (
                                <div key={index} className={madeByLayoutStyle.connect} onClick={() => {window.open(item.link, "_blank");}}>
                                    {item.logo}
                                    <p className={madeByLayoutStyle.linkText}>{item.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={madeByLayoutStyle.linkContainer}>
                <p className={madeByLayoutStyle.linkTitle}>Connect With Us</p>
                <div>
                    {
                        connectWithUs.map((item, index) => {
                            return (
                                <div key={index} className={madeByLayoutStyle.connect} onClick={() => {window.open(item.link, "_blank");}}>
                                    {item.logo}
                                    <p className={madeByLayoutStyle.linkText}>{item.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            </div>
            <div className={madeByLayoutStyle.footer}>
                <FaCopyright />
                <p style={{margin: "0"}}>&nbsp;2022 - Hitchdoc. All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default MadeBy;