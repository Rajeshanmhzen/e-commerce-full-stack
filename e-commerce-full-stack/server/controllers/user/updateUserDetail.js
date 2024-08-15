const userPermission = require('../../helper/permission')
const userModel = require('../../models/userModels')

async function updateUserDetail(req,res){
    try{

        if(!userPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody} = req.body

        const updateuser = await userModel.findByIdAndUpdate(_id,resBody)
        
        res.json({
            message : "User update successfully",
            data : updateuser,
            success : true,
            error : false
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateUserDetail