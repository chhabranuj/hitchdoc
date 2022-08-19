import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/router';
import InputLayout from '../inputLayout/inputLayout.js';
import ButtonLayout from '../buttonLayout/buttonLayout';
import signUpLayoutStyle from './signUpLayout.module.css';
import { signIn, signOut, useSession } from "next-auth/react";
import inputLayoutStyle from '../inputLayout/inputLayout.module.css';
import signInLayoutStyle from '../signInLayout/signInLayout.module.css';

const SignUp = () => {
    const router = useRouter();
    const [newName, setNewName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newNameError, setNewNameError] = useState(false);
    const [buttonText, setButtonText] = useState("Sign Up");
    const [userExistError, setUserExistError] = useState(false);
    const [emptyInputError, setEmptyInputError] = useState(false);
    const [newUsernameError, setNewUsernameError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    const buttonStyleContent = {
        buttonText: buttonText,
        color: "#888",
        margin: "20px",
        bgColor: "black",
        fontSize: "small",
        fontWeight: "normal",
        padding: "10px 30px",
        border: "1px solid #333",
        hoverBorder: "1px solid white",
        hoverColor: "white",
        borderRadius: "5px",
        hoverBgColor: "none"
    }

    const getNewName = (name) => {
        setNewName(name);
        setNewUsernameError(false);
        setNewPasswordError(false);
        setPhoneNumberError(false);
        if(0 < name.length && name.length < 3) {
            setNewNameError(true);
        }
        else {
            setNewNameError(false);
        }
    }

    const getNewUsername = (username) => {
        setNewUsername(username);
        setNewNameError(false);
        setNewPasswordError(false);
        setPhoneNumberError(false);
        if(0 < username.length && username.length < 5) {
            setNewUsernameError(true);
        }
        else {
            setNewUsernameError(false);
        }
    }
    
    const getNewPassword = (password) => {
        setNewPassword(password);
        setNewNameError(false);
        setNewUsernameError(false);
        setPhoneNumberError(false);
        if(0 < password.length && password.length < 5) {
            setNewPasswordError(true);
        }
        else {
            setNewPasswordError(false);
        }
    }

    const getNewPhoneNumber = (phoneNumber) => {
        setPhoneNumber(phoneNumber);
        setNewNameError(false);
        setNewUsernameError(false);
        setNewPasswordError(false);
        if((0 < phoneNumber.length && phoneNumber.length != 10) || isNaN(phoneNumber)) {
            setPhoneNumberError(true);
        }
        else {
            setPhoneNumberError(false);
        }
    }

    const navigateToLanding = () => {
        if(newName == "" || newUsername == "" || newPassword == "" || phoneNumber == "" || newNameError || newUsernameError || newPasswordError || phoneNumberError) {
            setEmptyInputError(true);
        }
        else {
            setButtonText("Signing Up...")
            const body = {
                _id: newUsername,
                name: newName,
                password: newPassword,
                phoneNumber: phoneNumber,
                data: []
            }
            setEmptyInputError(false);
            axios.post("/api/addUserData", body)
                .then((response) => {
                    if(response.data.result == "userExist") {
                        setButtonText("Sign Up")
                        setUserExistError(true);
                    }
                    else {
                        sessionStorage.setItem("username", newUsername);
                        sessionStorage.setItem("data", JSON.stringify([]));
                        router.push("/landing");
                    }
                })
        }
    }

    const naviagteToSignIn = () => {
        window.location.href = "/";
    }

    return (
        <div className={signUpLayoutStyle.signUpParent}>
            <div className={signUpLayoutStyle.leftContainer}>
                <p className={signUpLayoutStyle.title}>Sign Up</p>
                <InputLayout placeholder="Enter Name*" type="text" getData={getNewName} />
                {newNameError && <p className={signInLayoutStyle.error}>Name must be more than 2 characters.</p>}
                <InputLayout placeholder="Enter Username*" type="text" getData={getNewUsername} />
                {newUsernameError && <p className={signInLayoutStyle.error}>Username must be more than 4 characters.</p>}
                <InputLayout placeholder="Enter Password*" type="password" getData={getNewPassword} />
                {newPasswordError && <p className={signInLayoutStyle.error}>Password must be more than 4 characters.</p>}
                <InputLayout placeholder="Enter Phone Number*" type="text" getData={getNewPhoneNumber} />
                {phoneNumberError && <p className={signInLayoutStyle.error}>Phone Number must be of than 10 characters.</p>}
                {/* <div className={inputLayoutStyle.inputField} onClick={() => signIn("google")}>
                    <p style={{color: "#777", fontSize: "small", margin: "0"}}>Continue with Google</p>
                </div> */}
                <ButtonLayout buttonStyle={buttonStyleContent} handleButtonClick={navigateToLanding} />
                {emptyInputError && <p className={signInLayoutStyle.error}>Fields are not filled properly.</p>}
                {userExistError && <p className={signInLayoutStyle.error}>User Aready Exist.</p>}
                <p className={signInLayoutStyle.signUp}>Already have an account. <span style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}} onClick={naviagteToSignIn}>Sign In</span></p>
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