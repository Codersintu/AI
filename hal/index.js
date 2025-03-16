import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ImageKit from 'imagekit';
import mongoose from 'mongoose';
import Chats from './model/chat.js';
import UserChat from './model/Userchat.js';

dotenv.config()

const app=express();
app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization"]
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

app.get("/api/text", (req, res) => {
    console.log("Authenticated user:", req.auth);
    res.send("Success");
});

// FIXED: `/api/chat` Route
app.post("/api/chats", async (req, res) => {
    const userId = req.auth.userId;
    const { text } = req.body;
  
    try {
      // CREATE A NEW CHAT
      const newChat = new Chats({
        userId: userId,
        history: [{ role: "user", parts: [{ text }] }],
      });
  
      const savedChat = await newChat.save();
  
      // CHECK IF THE USERCHATS EXISTS
      const userChats = await UserChat.find({ userId: userId });
  
      // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
      if (!userChats.length) {
        const newUserChats = new UserChat({
          userId: userId,
          chats: [
            {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          ],
        });
  
        await newUserChats.save();
      } else {
        // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
        await UserChat.updateOne(
          { userId: userId },
          {
            $push: {
              chats: {
                _id: savedChat._id,
                title: text.substring(0, 40),
              },
            },
          }
        );
  
        res.status(201).send(newChat._id);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error creating chat!");
    }
  });

// 🛠 Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
});


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    connect()
    console.log(`running on ${PORT}`)
})
