import mongoose, { Schema, model } from "mongoose";

const testSchema = new Schema({
    'name': String,
    'password': String
})

const Test = model('Test', testSchema);

export default Test;