import React from 'react'
import bg from '../assets/authbg.png'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext.jsx';

function SignIn() {
  const [showPassword, setShowPassword] =useState(false);
  const {serverurl,userData,setUserData}=useContext(userDataContext)
  const navigate = useNavigate()
  const[loading,setLoading]=useState(false);
  
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const [err,setErr] = useState("")


 
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
     setLoading(true)
    try{
      const result = await axios.post(`${serverurl}/api/auth/signin`, {
        email,
        password
      }, { withCredentials: true });
      setUserData(result.data);
      setLoading(false);
      navigate("/");
    }catch(error){
      console.error('Error signing up:', error);
      setUserData(null);
      setLoading(false);
      setErr(error.response.data.message);
    }
  }

  return (
    <div  className='w-full h-screen bg-cover flex justify-center items-center'  style={{backgroundImage:`url(${bg})`}}>
  <form className='w-[90%] h-128 max-w-120 bg-[#0000003e] backdrop-blur  shadow-lg shadow-blue flex flex-col justify-center items-center gap-[20px] px-[20px]' onSubmit={handleSignIn}> 

   <h1 className='text-white text-[30px] font-semibold mb-30px'>Sign In to <span className='text-blue-400'>Virtual Assistent </span></h1>

    <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder:gray-300 px-[20px] py-[10px] rounded-full text-[18px]' value={email} onChange={(e) => setemail(e.target.value)} />

    <div className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>

      <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full outline-none bg-transparent text-white placeholder:gray-300 px-[20px] py-[10px] rounded-full text-[18px]' value={password} onChange={(e) => setpassword(e.target.value)} />
     
     {!showPassword && <IoMdEye className='absolute top-[17px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' onClick={()=>setShowPassword(true)}/>}

     {showPassword && <IoMdEyeOff className='absolute top-[17px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer ' onClick={()=>setShowPassword(false)}/>}
    </div> 

    {err&&  err.length>0 && <p className='text-red-500 text-[14px] font-semibold'  >
      *{err}
    </p>}

    <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold  bg-white rounded-full text-[19px] ' disabled={loading}>{loading?"Loading...":"Sign In"}</button>

    <p className='text-white cursor-pointer' onClick={() => navigate('/signup')}>
      Want to create an account?
      <span className='text-blue-400 ml-1'>Sign Up</span>
    </p>

  </form>

    </div>
  )
}

export default SignIn

