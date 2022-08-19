import clientPromise from "../../lib/mongodb.js";

const GetInputData = async(req, res) => {
    try {
        const client = await clientPromise;
        const database = client.db(process.env.MONGO_DB);
        const addDocCollections = database.collection("addDocCollection");
        const result = await addDocCollections.find({}).toArray();
        res.send({result: result});
    }
    catch(error) {
        console.log(error);
    }
}

export default GetInputData;