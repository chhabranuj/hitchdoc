import { useEffect } from "react";
import { useRouter } from "next/router";
import { GoSignIn } from "react-icons/go";
import { signOut, useSession } from "next-auth/react";
import ButtonLayout from "../buttonLayout/buttonLayout";
import titleBarLayoutStyle from "./titleBarLayout.module.css";

const TitleBar = (props) => {
    const router = useRouter();
    const {data: session} = useSession();

    const buttonStyleContent = {
        buttonText: "+ Add Doc",
        margin: "0 10px 0 0",
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
    useEffect(() => {
        if(!session) {
            router.push("/");
        }
    })

    const navigateToAddDoc = () => {
        router.push({
            pathname: "/operation/addDoc",
            query: {docData: JSON.stringify([]),
                    handleDoc: "Add Doc"}
        }, "/operation/addDoc");
    }

    return (
        <div className={titleBarLayoutStyle.titleBarParent}>
            <h1 className={titleBarLayoutStyle.titlePartOne} onClick={() => router.push("/landing")}>Hitch<span className={titleBarLayoutStyle.titlePartTwo}>Doc</span></h1>
            <div className={titleBarLayoutStyle.buttonsContainer}>
                {props.showAddButton && <ButtonLayout buttonStyle={buttonStyleContent} handleButtonClick={navigateToAddDoc}/>}
                <ButtonLayout buttonStyle={signOutButtonStyleContent} buttonIcon={<GoSignIn style={{"marginRight": "5px"}} />} handleButtonClick={() => signOut()} />
            </div>
        </div>
    );
}

export default TitleBar;