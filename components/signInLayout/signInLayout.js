import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/router';
import InputLayout from '../inputLayout/inputLayout.js';
import ButtonLayout from '../buttonLayout/buttonLayout';
import signInLayoutStyle from './signInLayout.module.css';

const SignIn = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonText, setButtonText] = useState("Sign In");
    const [emptyInputError, setEmptyInputError] = useState(false);
    const [userNotExistError, setUserNotExistError] = useState(false);

    const buttonStyleContent = {
        buttonText: buttonText,
        color: "#888",
        margin: "20px",
        bgColor: "black",
        fontSize: "small",
        borderRadius: "5px",
        padding: "10px 30px",
        fontWeight: "normal",
        border: "1px solid #333",
        hoverColor: "white",
        hoverBgColor: "none",
        hoverBorder: "1px solid white"
    }

    const getUsername = (username) => {
        setUsername(username);
    }

    const getPassword = (password) => {
        setPassword(password);
    }

    const navigateToLanding = () => {
        if(username == "" || password == "") {
            setEmptyInputError(true);
        }
        else {
            setButtonText("Signing In...");
            setEmptyInputError(false);
            const body = {
                _id: username,
                password: password
            }
            axios.post("/api/getUserData", body)
                .then((response) => {
                    if(response.data.result == "UserNotExist") {
                        setButtonText("Sign In");
                        setUserNotExistError(true);
                    }
                    else {
                        sessionStorage.setItem("username", username);
                        sessionStorage.setItem("data", JSON.stringify(response.data.result));
                        router.push("/landing");
                    }
                })
        }
    }

    const naviagteToSignUp = () => {
        router.push('/signUp')
    }

    return (
        <div className={signInLayoutStyle.signInParent}>
            <div className={signInLayoutStyle.leftContainer}>
                <p className={signInLayoutStyle.title}>Sign In</p>
                <InputLayout placeholder="Username*" type="text" getData={getUsername}  />
                <InputLayout placeholder="Password*" type="password" getData={getPassword} />
                <ButtonLayout buttonStyle={buttonStyleContent} handleButtonClick={navigateToLanding} />
                {emptyInputError && <p className={signInLayoutStyle.error}>Fields are empty.</p>}
                {userNotExistError && <p className={signInLayoutStyle.error}>User not exist.</p>}
                <p className={signInLayoutStyle.signUp}>Don't have an account. <span style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}} onClick={naviagteToSignUp}>Sign Up</span></p>
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