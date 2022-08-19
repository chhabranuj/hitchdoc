import { IoEarth } from "react-icons/io5";
import { FaCopyright } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import madeByLayoutStyle from "./madeByLayout.module.css";

const MadeBy = () => {

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
                    <div className={madeByLayoutStyle.connect} onClick={() => {window.open("https://pendownonpaper.netlify.app/", "_blank");}}>
                        <IoEarth className={madeByLayoutStyle.linkText} style={{margin: "0", fontSize: "large"}} />
                        <p className={madeByLayoutStyle.linkText}>PenDownOnPaper</p>
                    </div>
                </div>
            </div>
            <div className={madeByLayoutStyle.linkContainer}>
                <p className={madeByLayoutStyle.linkTitle}>Connect With Us</p>
                <div>
                    <div className={madeByLayoutStyle.connect} onClick={() => {window.open("https://github.com/chhabranuj", "_blank");}}>
                        <IoLogoGithub className={madeByLayoutStyle.linkText} style={{margin: "0", fontSize: "large"}} />
                        <p className={madeByLayoutStyle.linkText}>Github</p>
                    </div>
                    <div className={madeByLayoutStyle.connect} onClick={() => {window.open("https://www.linkedin.com/in/anuj-chhabra-b0b2a422a/", "_blank");}}>
                        <IoLogoLinkedin className={madeByLayoutStyle.linkText} style={{margin: "0", fontSize: "large"}} />
                        <p className={madeByLayoutStyle.linkText}>LinkedIn</p>
                    </div>
                    <div className={madeByLayoutStyle.connect} onClick={() => {window.open("https://wa.me/7217746275", "_blank");}}>
                        <IoLogoWhatsapp className={madeByLayoutStyle.linkText} style={{margin: "0", fontSize: "large"}} />
                        <p className={madeByLayoutStyle.linkText}>Whatsapp</p>
                    </div>
                </div>
            </div>
            </div>
            <div className={madeByLayoutStyle.footer} onClick={() => {window.open("https://chhabranuj.netlify.app", "_blank");}}>
                <FaCopyright />
                <p style={{margin: "0"}}>&nbsp;2022 - Hitchdoc. All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default MadeBy;