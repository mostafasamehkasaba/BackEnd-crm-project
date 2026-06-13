import mongose from "mongoose"

const tokenSchema = new mongose.Schema(
    {
        token :{
            type :String,
            required :true
        },
        user:{
            type :mongose.Schema.Types.ObjectId,
            ref :"user",
            required :true
        },
        expiresAt:{
            type :Date,
            required :true,
        },
    },{
        timestamps :true
    }
)

const Token = mongose.model("Token", tokenSchema)
export default Token