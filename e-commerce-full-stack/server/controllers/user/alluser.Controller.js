const userModel = require("../../models/userModels")

async function allUser (req,res) {
    try{
        // console.log("userid from alluser :", req.userId);

        const allusers = await userModel.find()

        res.json({
            message : "all user",
            data : allusers,
            success : true,
            error : false
        })
    } catch(err) {
        res.status(400).json({
            message : err.message ||err,
            error : true,
            success : false
        })
    }
}

module.exports = allUser