import React, { useRef } from 'react'
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';


const urlEndpoint = import.meta.env.VITE_IMG_URLendpoint;
const publicKey =import.meta.env.VITE_IMG_PUBLIC_KEY; 
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3001/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};



export function Upload({setImg}) {
  const uploadRef=useRef(null)
    
    const onError = err => {
        console.log("Error", err);
      };
      
      const onSuccess = res => {
        console.log("Success", res);
        setImg((prev)=>({...prev,isLoading:false,dbData:res}))
      };

      const onUploadProgress = progress => {
        console.log("Progress", progress);
      };
      
      const onUploadStart = (evt) => {
        const file=evt.target.files[0]
        const  reader=new FileReader();
        reader.onloadend=()=>{
          setImg((prev)=>({...prev,isLoading:true,aiData:{
            inlineData:{
              data:reader.result.split(",")[1],
              mimeType:file.type,
            },
          }}))
        }
        reader.readAsDataURL(file)
        
      };
      
    return (
        <div className="">
             <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          style={{display:"none"}}
          ref={uploadRef}
        />
        <label onClick={()=>uploadRef.current.click()} >
          <img src="/attachment.png" className='w-[24px]'  alt="" />
        </label>
      </IKContext>
      {/* ...other SDK components added previously */}
        </div>
    )
}
