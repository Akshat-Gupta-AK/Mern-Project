import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/userContext'


function Card({image}) {
  const{ serverurl,userData,setUserData,frontendImages,setfrontendImages,backendImages,setbackendImages,selectedImage,setSelectedImage}=useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-black border-2 border-[#104ca5] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#104ca5] hover:border-4 hover:border-white cursor-pointer ${selectedImage == image ? 'border-4 border-white shadow-2xl shadow-[#104ca5] ' : ''}` } onClick={()=>{
      setSelectedImage(image)
      setfrontendImages(null)
      setbackendImages(null)
      }}>
      <img src={image}  className=" h-full object-cover" />
    </div>
  )
}

export default Card
