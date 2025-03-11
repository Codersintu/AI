import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ImageKit from 'imagekit';
import mongoose from 'mongoose';
import Chats from './model/chat.js';
import UserChat from './model/Userchat.js';
dotenv.config()

const app=express();
app.use(cors({
    origin:process.env.CLIENT_URL,
}))

async function connect(params) {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(" database connect successfully")
    } catch (error) {
        console.log("database connect to fail")
    }
}

const imgkit=new ImageKit({
    urlEndpoint:process.env.VITE_IMG_URLendpoint,
    privateKey:process.env.VITE_IMG_Private_KEY,
    publicKey:process.env.VITE_IMG_PUBLIC_KEY
})

app.get('/api/upload',(req,res)=>{
    const result=imgkit.getAuthenticationParameters();
    res.send(result);
})

app.post('/api/chat',async(req,res)=>{
    const {userId,text}=req.body;
    try {
        const Newchat=new Chats({
            userId:userId,
            History:[{role:"user",parts:[{text}]}],
        })
        const savedChat=await Newchat.save();


        //find already chat exist
        const userChats=await UserChat.find({userId:userId});


        //if userchat is not exist we can create
        if (!userChats.length) {
            const newUserchats=new UserChat({
                userId:userId,
                chats:[
                    {
                        _id:savedChat.id,
                        title:text.substring(0,40),
                    },
                ],
            })
            await newUserchats.save();
        }else{
           await UserChat.updateOne({userId:userId},{
            $push:{
                chats:[
                    {
                        _id:savedChat.id,
                        title:text.substring(0,40),
                    }
                ]
            }
            
           })
           return res.status(201).json(Newchat._id)
        }
    

    } catch (error) {
        return res.status(500).json({
            success:false,
            error
        })
    }
})

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    connect()
    console.log(`running on ${PORT}`)
})
