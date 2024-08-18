import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({Component}) {

    const navigate=useNavigate();
  useEffect(()=>{
     let token=sessionStorage.getItem('token')
     if(!token){
        navigate('/')
     }
  },[])
  return (
     <>
     
     <Component/>
     
     </>
  )
}
