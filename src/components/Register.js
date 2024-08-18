import React, { useRef, useState } from 'react'
import '../assets/css/main.css'
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [toggle,settoggle]=useState(true)
    const email=useRef();
    const password=useRef();
  
    const navigate=useNavigate();
  
    const handleRegister=async(e)=>{
         e.preventDefault()
         let st={'email':email.current.value, 'password':password.current.value}
         console.log(st)
       try{
       await axios({
             url:'https://intern-task-api.bravo68web.workers.dev/auth/signup',
             method:'post',
             data:st,
             ContentType:'application/json'
         }).then((e)=>{
           console.log(e.data)
            navigate('/')
         })
     }catch(error){
       console.log(error)
     }
       // navigate('product')
     }
    
  return (
   <>
    
    <div class="half">
   
   <div class="contents order-2 order-md-1 ">

     <div class="container">
       <div class="row align-items-center justify-content-center">
         <div class="col-md-6">
           <div class="form-block shadow">
             <div class="text-center mb-5">
              <h3 className='fw-bold'>Register</h3>
        
             </div>
             <form onSubmit={handleRegister}>
               <div class="form-group first mb-3">
                 <label for="username">Email Id</label>
                 <input type="email" class="form-control mt-2" placeholder="your-email@gmail.com" required ref={email}/>
               </div>
               <div class="form-group last mb-3">
                 <label for="password">Password</label>
                <input type={toggle ? "password" : 'text' }class="form-control mt-2" placeholder="Your Password" required ref={password}/>
                {toggle ? <div className='parent-show'><i class='bx bx-show fs-4' onClick={()=>settoggle(!toggle)}></i></div>:
                 <div className='parent-show'><i class='bx bx-hide fs-4' onClick={()=>settoggle(!toggle)}></i></div>}
               </div>
               
               <div class="d-flex mb-5 align-items-center justify-content-between">
               <Link to='/' className="text-decoration-none"><span class="caption fs-14px fw-bolder" style={{fontSize:'14px'}}>Already Register? Login</span> </Link> 
               </div>

               <input type="submit" value="Register" class="btn btn-block shadow-none"/>

             </form>
           </div>
         </div>
       </div>
     </div>
   </div>

   
 </div>
   
   </>
     
  )
}
