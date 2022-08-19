import clientPromise from "../../lib/mongodb.js";

const GetCardImages = async (req, res) => {
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

export default GetCardImages;