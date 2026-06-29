import React, { createContext, useEffect } from 'react'
export const userDataContext=createContext();
import { useState } from 'react';
import axios from 'axios';


function UserContext({children}) {
  const serverurl="http://localhost:8000"
  const [userData,setUserData]=useState(null)
  const[frontendImages,setfrontendImages]=useState(null)
  const[backendImages,setbackendImages]=useState(null)
  const[selectedImage,setSelectedImage]=useState(null)


  const handleCurrenrtUser=async()=>{
    try{
      const result =await axios.get(`${serverurl}/api/user/current`, { withCredentials: true });
      setUserData(result.data.user);
      console.log('Current user data:', result.data.user);
    }catch(error){
      console.log('Error fetching current user data:', error);
    }
  }

  const getGeminiResponse=async(command)=>{
   try{
    const result=await axios.post(`${serverurl}/api/user/asktoassistent`,{command},{withCredentials:true})
    return result.data;

   }catch(error){
       console.log(error);
   }
  }



  useEffect(()=>{
    handleCurrenrtUser();
  },[])

  const value={
  serverurl,userData,setUserData,frontendImages,setfrontendImages,backendImages,setbackendImages,selectedImage,setSelectedImage,getGeminiResponse
  }

  return (
    <div>
      <userDataContext.Provider value={value}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}



export default UserContext;
