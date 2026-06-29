import React from 'react'
import Card from '../component/Card'
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"

import image4 from "../assets/image4.jpg"
import image5 from "../assets/image5.jpg"
import image6 from "../assets/image6.jpg"
import image7 from "../assets/image7.jpg"
import { RiImageAddFill } from "react-icons/ri";
import { useState } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import Home from './Home'
 

function customize() {
  const{ serverurl,userData,setUserData,frontendImages,setfrontendImages,backendImages,setbackendImages,selectedImage,setSelectedImage}=useContext(userDataContext)
  const inputImage=useRef()
  const navigate=useNavigate()

  const handleImage=(e)=>{
    const file=e.target.files[0];
  setfrontendImages(URL.createObjectURL(file))
  setbackendImages(file)
  }

 
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#19013d] flex justify-center items-center flex-col p-[20px] '>

      <IoArrowBack className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer" onClick={()=> navigate ("/")} />

      <h1 className="text-white text-[30px] text-center mb-[40px] ">Select Your <span className="text-[#476faa]">Assistent Image</span></h1>

      <div className ="w-full max-w-[100%]  flex justify-center items-center flex-wrap gap-[15px]">
        <Card image={image1}/>
        <Card image={image2}/>
        <Card image={image4}/>
        <Card image={image5}/>
        <Card image={image6}/>
        <Card image={image7}/>
         <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-black border-2 border-[#104ca5] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#104ca5] hover:border-4 hover:border-white cursor-pointer flex items-center justify-center ${selectedImage == "input" ? "border-4 border-white shadow-2xl shadow-[#104ca5] " : null}`} onClick={()=>{
              inputImage.current.click() 
              setSelectedImage("input")
          }}>

          {!frontendImages && <RiImageAddFill className="text-white w-[25px] h-[25px]" onClick={()=>inputImage.current.click()}/>}
            {frontendImages && <img src={frontendImages} className="h-full object-cover" />}
        </div>
        <input type="file" accept='/image/*'ref={inputImage} hidden onChange={handleImage}/>
    </div>
    {selectedImage && <button className='w-[180px] h-[60px] bg-white text-black rounded-full text-[18px] font-semibold mt-[20px] cursor-pointer ' onClick={()=>navigate('/customize2')}>Next </button>}
   
    </div>
  )
}


export default customize

