import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
   userId:{
    type:String,
    require:true
   },
   History:[
    {
    role:{
        type:String,
        enum:["user" | "model"],
        require:true,
    },
    parts:[
        {
            text:{
                type:String,
                require:true,
            },
        },
    ],
    img:{
        type:String,
        require:true,
    },
},
   ],
}, { timestamps: true });

const Chat = mongoose.model('chat', ChatSchema);
export default Chat;