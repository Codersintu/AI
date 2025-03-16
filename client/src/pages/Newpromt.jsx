import React, { useEffect, useRef, useState } from 'react'
import { Upload } from '../Upload';
import { IKImage } from 'imagekitio-react';
import model from '../Gemini/gemini';
import Markdown from 'react-markdown'

export function Newpromt(props) {
    const [question,setQuestion]=useState("");
    const [answer,setAnswer]=useState("");
    // const endRef=useRef()
    const [img,setImg]=useState({
        isLoading:false,
        error:"",
        dbData:{},
        aiData:{}
    })

    const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });
    // useEffect(()=>{
    //     endRef.current.scrollIntoView({behavior:"smooth"})
    // },[question,answer,img.dbData])
    
    const add=async(text)=>{
        setQuestion(text)

    const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text] : [text]);

    let accumalatedText="";

    for await (const chunk of result.stream){
        const chunkText=chunk.text();
        console.log(chunkText)
        accumalatedText += chunkText;
    }

    setAnswer(accumalatedText)
    setImg({
        isLoading:false,
        error:"",
        dbData:{},
        aiData:{}
    })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const text=e.target.text.value;
        if (!text) return;
        add(text)
    }
   
    return (
        <>
        
        {img.isLoading && <div className=''>Loading...</div>}
        {img.dbData?.filePath && (
           <IKImage
           urlEndpoint={import.meta.env.VITE_IMG_URLendpoint}
           path={img.dbData?.filePath}
           width="380"
           height={"380"}
           transformation={[{width:380},{height:380}]}
           />
        )}
        {question && <div className='message from user'>{question}</div>}
        {answer && <div className='message from AI'><Markdown>{answer}</Markdown></div>}
        {/* <div ref={endRef}></div> */}
        <form onSubmit={handleSubmit} className="flex form items-center justify-center border !py-2 gap-4 absolute bottom-4 w-[60%] bg-gray-700 p-3 rounded-xl">
            <Upload setImg={setImg}/>
            <input type="file" name="file" id="file" multiple={false} hidden />
            <input
                type="text"
                name='text'
                className=" text-[#ececec] outline-none w-full !px-3 rounded-full"
                placeholder="Ask me anything..."
            />
            <button className="cursor-pointer">
                <img src="/arrow.png" className="w-[30px] h-[30px] bg-white rounded-full" alt="" />
            </button>
        </form>
       
        </>
    );
}
