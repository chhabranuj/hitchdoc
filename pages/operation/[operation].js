import Head from "next/head";
import { useRouter } from "next/router";
import clientPromise from "../../lib/mongodb.js";
import TitleBar from "../../components/titleBarLayout/titleBarLayout";
import AddDocLayout from "../../components/addDocLayout/addDocLayout";

const AddDocPage = ({posts}) => {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{`Hitchdoc | ${router.asPath.includes("addDoc")? "Add": "Edit"}`}</title>
            </Head>
            <TitleBar />
            {
                router.query.docData && <AddDocLayout showAddButton={false} inputData={posts} handleDoc={router.query.handleDoc} data={JSON.parse(router.query.docData)} />
            }
            
        </div>
    );
}

export const getStaticPaths = async () => {
    return {
        paths: [
            {
                params: { 
                    operation: "addDoc"
                } 
            }, 
            { 
                params: { 
                    operation: "editDoc"
                } 
            }
        ],
        fallback: false
    }
}

export const getStaticProps = async () => {
    const client = await clientPromise;
    const database = client.db(process.env.MONGO_DB);
    const addDocCollections = database.collection("addDocCollection");
    const result = await addDocCollections.find({}).toArray();

    return {
        props: {
            posts: result
        }
    }
}

export default AddDocPage;
  