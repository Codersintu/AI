import React, { useEffect, useRef, useState } from 'react'
import { Upload } from '../Upload';
import { IKImage } from 'imagekitio-react';

export function Newpromt(props) {
    const endRef=useRef(null)
    const [img,setImg]=useState({
        isLoading:false,
        error:"",
        dbData:{}
    })
    useEffect(()=>{
        endRef.current.scrollIntoView({behavior:"smooth"})
    },[])
    return (
        <>
        {img.dbData?.filePath && (
           <IKImage
           urlEndpoint={import.meta.env.VITE_IMG_URLendpoint}
           path={img.dbData?.filePath}
           width="380"
           height={"380"}
           transformation={[{width:380},{height:380}]}
           />
        )}
        <div className="!pb-[100px]" ref={endRef}></div>
        <form className="flex items-center justify-center border !py-2 gap-4 absolute bottom-4 w-[50%] bg-gray-700 p-3 rounded-xl">
            <Upload setImg={setImg}/>
            <input type="file" name="file" id="file" hidden />
            <input
                type="text"
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
