import React, { useEffect, useState } from "react";
import { IUploadImage } from "./interface/IUploadImage";
import Stack from "./Stack";
import axios from "axios";

const UploadImage: React.FC<IUploadImage> = ({onSuccess, initialFile}) => {
    const [file, setFile] = useState<string>(initialFile);
   useEffect(()=>{
    setFile(initialFile)
   },[initialFile])
  
    const handleFileChange = async (event:any) => {
      const selectedFile = event.target.files[0];
      if(selectedFile){
        const formData = new FormData();
        formData.append("image", selectedFile);
        const res = await axios.post("/api/upload", formData,  {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        onSuccess(res.data.base64)
      }
    };
  
    
  
    return (
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center min-h-44 justify-center w-full border-2 border-gray-600 border-dashed rounded-lg cursor-pointer ">
          <div className="flex flex-col items-center justify-center ">
            {file != ''? <Stack><div>
            <img src={file} alt="Preview" className="w-full h-auto object-contain" />
            </div>
            <div className="mx-auto my-auto flex items-center space-x-4">
                <button className="text-white bg-black bg-opacity-25 pointer-events-none text-center px-3 py-2 text-sm border-2 border-gray-300 rounded-lg">Change</button>
                <button onClick={()=>{
                    setFile('')
                    onSuccess('')
                }} className="text-white bg-black bg-opacity-25  text-center px-3 py-2 text-sm border-2 border-gray-300 rounded-lg">Remove</button>
            </div>
            </Stack> :
            <div className="my-auto flex flex-col items-center p-2">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 2-1.5 5.5 5.5 0 0 0-10.793-.479c-0.07 0.004-0.136 0.021-0.207 0.021a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm  text-center text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>}
            
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*"/>
        </label>
      </div>
    );
  }
  
  export default UploadImage;