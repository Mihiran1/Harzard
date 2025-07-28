import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";


function BackToHome() {
    const navigate = useNavigate();

  return (
    <div className='flex gap-2'>
        <button onClick={() => navigate('/')} className='bg-gray-900 cursor-pointer rounded-full p-2 text-xl text-amber-50 font-bold'><IoMdArrowRoundBack /></button>
        <p className='mt-1 font-semibold'>Back to Home</p>
    </div>
  )
}

export default BackToHome;