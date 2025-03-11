import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ImageKit from 'imagekit';
import mongoose from 'mongoose';
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

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    connect()
    console.log(`running on ${PORT}`)
})
