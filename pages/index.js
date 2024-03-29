import Head from 'next/head';
import MadeBy from '../components/madeByLayout/madeByLayout';
import TitleBar from '../components/titleBarLayout/titleBarLayout';
import LandingLayout from '../components/landingLayout/landingLayout';

export default function Home() {

  return (
    <div>
      <Head>
        <title>Hitchdoc</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TitleBar showAddButton={true} />
      <LandingLayout />
      <MadeBy />
    </div>
  )
}


