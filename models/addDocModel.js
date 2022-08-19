import { Schema, model, models } from  'mongoose';

const addDocSchema = new Schema({
    _id: {type: String},
    docCategory: {type: String},
    docTypes: {type: Array}
})

const AddDoc = models.AddDoc || model("AddDoc", addDocSchema);

export default AddDoc;