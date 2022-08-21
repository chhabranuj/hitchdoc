import Head from 'next/head';
import SignIn from '../components/signInLayout/signInLayout';

const SignInPage = () => {
    return (
        <div>
            <Head>
                <title>Hitchdoc | SignIn</title>
            </Head>
            <SignIn></SignIn>
        </div>
    );
}

export default SignInPage;