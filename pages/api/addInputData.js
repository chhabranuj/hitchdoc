import clientPromise from "../../lib/mongodb.js";
import AddDocModel from "../../models/addDocModel.js";

const AddInputData = async (req, res) => {
    try {
        const client = await clientPromise;
        const database = client.db(process.env.MONGO_DB);
        const addDocCollections = database.collection("addDocCollection");
        const data = [
            new AddDocModel({_id: "ban", docCategory: "Bank Documents", docTypes: ["Check Image", "Fd Certificate", "Loan Doc", "Passbook", "PPF Doc", "Rd Certificate", "Tax Doc"]}),
            new AddDocModel({_id: "roa", docCategory: "Road Documents", docTypes: ["Vehicle Documents", "Driving License", "Insurance Doc", "Pollution Certificate", "Registration Certificate"]}),
            new AddDocModel({_id: "per", docCategory: "Personal Documents", docTypes: ["Aadhar Card", "Driving License", "Pan Card", "Passport", "Ration Card", "VoterId Card"]}),
            new AddDocModel({_id: "edu", docCategory: "Education Documents", docTypes: ["10th Marksheet", "12th Marksheet", "Course Certificate", "Degree Certificate", "Degree Marksheet", "Diploma Certificate", "Diploma Marksheet"]}),
            new AddDocModel({_id: "pro", docCategory: "Professional Documents", docTypes: ["Cover Letter", "Experience Letter", "Offer Letter", "Intership Certificate", "Resume"]})
        ]
        addDocCollections.insertMany(data, (error, result) => {
            if(error) {
                console.log("Something went wrong");
            }
            else {
                res.send({result: result});
            }
        });
    }
    catch(error) {
        console.log(error);
    }
}

export default AddInputData;