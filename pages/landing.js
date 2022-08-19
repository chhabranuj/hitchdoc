import Head from 'next/head';
import MadeBy from '../components/madeByLayout/madeByLayout';
import TitleBar from '../components/titleBarLayout/titleBarLayout';
import LandingLayout from '../components/landingLayout/landingLayout';

const Home = () => {

  return (
    <div>
      <Head>
        <title>Hitchdoc</title>
      </Head>
      <TitleBar showAddButton={true} />
      <LandingLayout />
      <MadeBy />
    </div>
  )
}

export default Home;