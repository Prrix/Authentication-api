const { default: mongoose, Schema, model } = require("mongoose");

const NoteSchema = mongoose.Schema({

    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required:true
    },
    link:{
        type: String,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model("Note" , NoteSchema);