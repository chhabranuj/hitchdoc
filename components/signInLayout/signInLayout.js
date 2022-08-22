import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import ButtonLayout from "../buttonLayout/buttonLayout";
import signInLayoutStyle from './signInLayout.module.css';
import { signIn, useSession } from "next-auth/react";
import inputLayoutStyle from '../inputLayout/inputLayout.module.css';

const SignIn = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [createAccount, setCreateAccount] = useState(false);

    const buttonStyleContent = {
        buttonText: "Create Account",
        margin: "10px 0 0 0",
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
        if(session) {
            const body = {
                _id: session.user.email
            }
            axios.post("/api/getUserData", body)
                .then((response) => {
                    if(response.data.result) {
                        sessionStorage.setItem("username", session.user.email);
                        sessionStorage.setItem("data", JSON.stringify(response.data.result.data));
                        router.push("/");
                    }
                    else {
                        setCreateAccount(true);
                    }
                })
        }
    })

    const handleCreateAccount = () => {
        const body = {
            _id: session.user.email,
            name: session.user.name,
            data: []
        }
        axios.post("/api/addUserData", body)
            .then((response) => {
                sessionStorage.setItem("username", session.user.email);
                sessionStorage.setItem("data", JSON.stringify([]));
                router.push("/");
            })
    }

    return (
        <div className={signInLayoutStyle.signInParent}>
            <div className={signInLayoutStyle.leftContainer}>
                <p className={signInLayoutStyle.title}>Sign In</p>
                <div className={inputLayoutStyle.inputField} onClick={() => signIn("google")}>
                    <p style={{color: "#777", fontSize: "small", margin: "0"}}>Sign In with Google*</p>
                </div>
                {
                    createAccount && 
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <p className={signInLayoutStyle.signUp}>Sorry, you don&apos;t have an account.</p>
                        <ButtonLayout buttonStyle={buttonStyleContent} handleButtonClick={handleCreateAccount} />
                    </div>
                }
            </div>
            <div className={signInLayoutStyle.rightContainer}>
                <Image
                    src="/static/images/signIn.svg"
                    alt="Sign In Image"
                    width={550}
                    height={550}
                />
            </div>
        </div>
    );
    
}

export default SignIn;