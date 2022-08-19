import clientPromise from "../../lib/mongodb";
import UserModel from "../../models/userModel";

const GetUserData = async (req, res) => {
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
}

export default GetUserData;