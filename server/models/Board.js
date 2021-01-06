const mongoose = require('mongoose');
const Schema = mongoose.Schema

const boardSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required: true
    },
    contents:{
        type:String,
        required: true
    }
})

const Board = mongoose.model('Board',boardSchema)
module.exports = {Board};