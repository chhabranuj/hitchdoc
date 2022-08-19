import clientPromise from "../../lib/mongodb";

const AddDocData = async (req, res) => {
    let data = [];
    const client = await clientPromise;
    const database = client.db(process.env.MONGO_DB);
    const userCollection = database.collection("userCollection");
    const username = req.body[0];
    const user = await userCollection.findOne({_id: username});
    if(req.body[1] == "Add Doc") {
        const docData = req.body[2];
        user.data.push(docData);
    }
    else if(req.body[1] == "Edit Doc") {
        const date = req.body[3];
        for(let i=0; i<user.data.length; i++) {
            if(user.data[i].uploadedOnDate == date) {
                user.data.splice(i,1);
                i--;
            }
        }
        const docData = req.body[2];
        user.data.push(docData);
    }
    else {
        const date = req.body[2];
        for(let i=0; i<user.data.length; i++) {
            if(user.data[i].uploadedOnDate == date) {
                user.data.splice(i,1);
                i--;
            }
        }
    }
    data = user.data;
    userCollection.updateOne({_id: user._id}, {$set: {data: data}}, (error, result) => {
        if(error) {
            result = "DataNotAdded";
            res.send({result: result});
        }
        else {
            res.send({result: data});
        }
    });
}

export default AddDocData;
