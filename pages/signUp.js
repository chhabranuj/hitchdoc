import Head from "next/head";
import SignUp from "../components/signUpLayout/signUpLayout.js";

const SignUpPage = () => {

    return (
        <div>
            <Head>
                <title>Hitchdoc | SignUp</title>
            </Head>
            <SignUp />
        </div>
    );
}

export default SignUpPage;