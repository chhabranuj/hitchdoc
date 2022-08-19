import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import ButtonLayout from "../buttonLayout/buttonLayout";
import titleBarLayoutStyle from "./titleBarLayout.module.css";

const TitleBar = (props) => {
    const router = useRouter();
    const buttonStyleContent = {
        buttonText: "+ Add Doc",
        margin: "0px",
        color: "white",
        border: "none",
        bgColor: "#888",
        fontSize: "small",
        fontWeight: "bold",
        padding: "8px 13px",
        borderRadius: "5px",
        hoverColor: "black",
        hoverBorder: "none",
        hoverBgColor: "white"
    }

    const signOutButtonStyleContent = {
        buttonText: "Sign Out",
        margin: "0px",
        color: "white",
        border: "none",
        bgColor: "#888",
        fontSize: "small",
        fontWeight: "bold",
        padding: "8px 13px",
        borderRadius: "5px",
        hoverColor: "black",
        hoverBorder: "none",
        hoverBgColor: "white"
    }

    const naviagteToLanding = () => {
        router.push("/landing");
    }

    const navigateToAddDoc = () => {
        router.push({
            pathname: "/operation/addDoc",
            query: {docData: JSON.stringify([]),
                    handleDoc: "Add Doc"}
        }, "/operation/addDoc");
    }

    return (
        <div className={titleBarLayoutStyle.titleBarParent}>
            <h1 className={titleBarLayoutStyle.titlePartOne} onClick={naviagteToLanding}>Hitch<span className={titleBarLayoutStyle.titlePartTwo}>Doc</span></h1>
            {props.showAddButton && <ButtonLayout buttonStyle={buttonStyleContent} handleButtonClick={navigateToAddDoc}/>}
            <ButtonLayout buttonStyle={signOutButtonStyleContent} handleButtonClick={() => signOut()}/>
        </div>
    );
}

export default TitleBar;