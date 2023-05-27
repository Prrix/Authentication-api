const noteModel = require("../models/note");

const createnote = async (req,res)=>{
    const {description , title , link}  = req.body;
    const newNote = new noteModel({
        title : title,
        description : description,
        user : req.userId,
        link : link
    })
    try {

        await newNote.save();
        res.status(201).json({message : "Note with " + title + " created"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"}) 
    } 
}

const getnotes = async (req,res)=>{
    try {
        const notes = await noteModel.find({user : req.userId});
        res.status(200).json(notes);
    } catch (error) {
        console.log(error)
        res.status(404).json({message : "Something went wrong"}) 
        
    }
}

const updatenote = async (req,res)=>{
    const noteid = req.params.id;
    const {description , title , link}  = req.body;
    const newNote = {
        title : title,
        description : description,
        link : link 
    };

    try {
        await noteModel.findByIdAndUpdate(noteid,newNote , {new : true} );
        res.status(200).json(newNote);
    } catch (error) {
        console.log(error)
        res.status(404).json({message : "Something went wrong"});
    }
}

const deletenote = async (req,res)=>{

    const noteid = req.params.id;
    try {
        const note = await noteModel.findByIdAndRemove(noteid);
        res.status(202).json(note);
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message : "Something went wrong"});
        
    }
    
}


module.exports =
{
    createnote,
    getnotes,
    updatenote,
    deletenote
};