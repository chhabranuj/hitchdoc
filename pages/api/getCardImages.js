import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb.js";

const GetCardImages = async (req, res) => {
    const session = await getSession({ req });
    if(!session) {
        res.status(401).json({error: "Unautheticated User"});
    }
    else {
        try{
            const client = await clientPromise;
            const database = client.db(process.env.MONGO_DB);
            const cardImagesCollection = database.collection("cardImagesCollection");
            const result = await cardImagesCollection.find({}).toArray();
            res.send({result: result});
        }
        catch(error) {
            console.log(error);
        } 
    }
}

export default GetCardImages;