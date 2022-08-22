import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb";

const GetUserData = async (req, res) => {
    const session = await getSession({ req });
    if(!session) {
        res.status(401).json({error: "Unautheticated User"});
    }
    else {
        try {
            const client = await clientPromise;
            const database = client.db(process.env.MONGO_DB);
            const userCollection = database.collection("userCollection");
            const reqData = req.body;
            const user = await userCollection.findOne({_id: reqData._id});
            res.send({result: user});
        }
        catch(error) {
            console.log(error);
        }
    }
}

export default GetUserData;