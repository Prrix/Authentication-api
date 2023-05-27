const express = require("express");
const { getnotes, createnote, deletenote, updatenote } = require("../controllers/notes");
const auth = require("../middleware/auth");
const noteRouter = express.Router();

noteRouter.get("/" , auth, getnotes);
noteRouter.post("/" ,auth ,createnote);
noteRouter.delete("/:id" ,auth, deletenote);
noteRouter.put("/:id" ,auth, updatenote); 


module.exports = {noteRouter}