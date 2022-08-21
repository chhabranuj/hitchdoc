import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import signInLayoutStyle from './signInLayout.module.css';
import { signIn, signOut, useSession } from "next-auth/react";
import inputLayoutStyle from '../inputLayout/inputLayout.module.css';

const SignIn = () => {
    const router = useRouter();
    const {data: session} = useSession();

    useEffect(() => {
        if(session) {
            if(router.query.fromSignUp) {
                signOut();
            }
            else {
                const body = {
                    _id: session.user.email
                }
                axios.get("/api/getUserData", {
                    params: {
                        _id: session.user.email
                    }
                })
                    .then((response) => {
                        if(response.data.result == "UserNotExist") {
                            router.push({
                                pathname: "/signUp",
                                query:{fromSignIn: true}
                            }, "/signUp");
                        }
                        else {
                            sessionStorage.setItem("username", session.user.email);
                            sessionStorage.setItem("data", JSON.stringify(response.data.result));
                            router.push("/landing");
                        }
                    })
            }
        }
    })

    return (
        <div className={signInLayoutStyle.signInParent}>
            <div className={signInLayoutStyle.leftContainer}>
                <p className={signInLayoutStyle.title}>Sign In</p>
                <div className={inputLayoutStyle.inputField} onClick={() => signIn("google")}>
                        <p style={{color: "#777", fontSize: "small", margin: "0"}}>Sign In with Google*</p>
                    </div>
                <p className={signInLayoutStyle.signUp}>Don&apos;t have an account. <span style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => router.push('/signUp')}>Sign Up</span></p>
            </div>
            <div className={signInLayoutStyle.rightContainer}>
                <Image
                    src="/static/images/signIn.svg"
                    alt="Sign Up Image"
                    width={550}
                    height={550}
                />
            </div>
        </div>
    );
    
}

export default SignIn;