import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb";

const GetUserData = async (req, res) => {
    const session = await getSession({ req });
    // if(!session) {
    //     res.status(401).json({error: "Unautheticated User"});
    // }
    // else {
        const client = await clientPromise;
        const database = client.db(process.env.MONGO_DB);
        const userCollection = database.collection("userCollection");
        const data = req.body;
        const allUsers = await userCollection.find({}).toArray();
        allUsers.map(item => {
            if(item._id == data._id) {
                res.send({result: item.data});
            }
        });
        res.send({result: "UserNotExist"});
    // }
}

export default GetUserData;