import clientPromise from "../../lib/mongodb";
import UserModel from "../../models/userModel.js";

const AddUserData = async (req, res) => {
    try {
        const client = await clientPromise;
        const database = client.db(process.env.MONGO_DB);
        const userCollection = database.collection("userCollection");
        const data = new UserModel(req.body);
        const allUsers = await userCollection.find({}).toArray();
        allUsers.map(item => {
            if(item._id == data._id) {
                res.send({result: "userExist"});
            }
        });
        userCollection.insertOne(data, (error, result) => {
            if(error) {
                console.log(error);
            }
            else {
                res.send({result: "userAdded"});
            }
        });
    }
    catch(error) {
        console.log(error);
    }
}

export default AddUserData;