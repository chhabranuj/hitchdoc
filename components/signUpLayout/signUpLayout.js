import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import signUpLayoutStyle from './signUpLayout.module.css';
import { signIn, signOut, useSession } from "next-auth/react";
import inputLayoutStyle from '../inputLayout/inputLayout.module.css';
import signInLayoutStyle from '../signInLayout/signInLayout.module.css';

const SignUp = () => {
    const router = useRouter();
    const {data: session} = useSession();

    useEffect(() => {
        if(session) {
            if(router.query.fromSignIn) {
                signOut();
            }
            else {
                const body = {
                    _id: session.user.email,
                    name: session.user.name,
                    data: []
                }
                axios.post("/api/addUserData", body)
                    .then((response) => {
                        if(response.data.result == "userExist") {
                            router.push({
                                pathname: "/",
                                query: {fromSignUp: true}
                            }, "/");
                        }
                        else {
                            sessionStorage.setItem("username", session.user.email);
                            sessionStorage.setItem("data", JSON.stringify([]));
                            router.push("/landing");
                        }
                    })
            }
        }
    })

    return (
        <div className={signUpLayoutStyle.signUpParent}>
            <div className={signUpLayoutStyle.leftContainer}>
                <p className={signUpLayoutStyle.title}>Sign Up</p>
                <div className={inputLayoutStyle.inputField} onClick={() => signIn("google")}>
                    <p style={{color: "#777", fontSize: "small", margin: "0"}}>Sign Up with Google*</p>
                </div>
                <p className={signInLayoutStyle.signUp}>Already have an account. <span style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => router.push("/")}>Sign In</span></p>
            </div>
            <div className={signUpLayoutStyle.rightContainer}>
                <Image
                    src="/static/images/signUp.svg"
                    alt="Sign Up Image"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
}

export default SignUp;