import React, { useEffect, useState } from 'react'
import '../assets/css/main.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Product_listing() {
  const [Username, setUsername]=useState();
  const [productData, setproductData]=useState([])
  const [currentPage, setCurrentPage]=useState(1)
  const recordsPerPage=8;

  const lastIndex=currentPage*recordsPerPage;
  const firstIndex= lastIndex-recordsPerPage;

  const records= productData.slice(firstIndex, lastIndex)
  const npage= Math.ceil(productData.length / recordsPerPage )
  const numbers=[...Array(npage+1).keys()].slice(1)
  
  useEffect(()=>{
    GetCurrentUser();
    GetProduct();
  },[])

  const GetCurrentUser=async()=>{
    const token=sessionStorage.getItem('token')
     try{
      await axios({
         url:'https://intern-task-api.bravo68web.workers.dev/api/me',
         method:'get',
         headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((e)=>{
        console.log(e.data.user.sub)
        setUsername(e.data.user.sub)
      })
     }catch(error){ console.log(error) }
  }

  const GetProduct=async()=>{
    const token=sessionStorage.getItem('token')
     try{
      await axios({
         url:'https://intern-task-api.bravo68web.workers.dev/api/products',
         method:'get',
         headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((e)=>{
        console.log(e.data)
        setproductData(e.data)
      })
     }catch(error){ console.log(error) }
  }

  const handleInput=(e)=>{
    console.log(e.target.value)
    let userInput=e.target.value;
    const FilterData=productData.filter((d)=>{
          if(d.title.toLowerCase().includes(userInput.toLowerCase())){
              return d
          }else if(userInput==' '){
              return d;
          }
      }
    )
    console.log(FilterData)
    setproductData(FilterData)
    } 

    const changecPage=(id)=>{
      setCurrentPage(id)
    }

     const prePage=()=>{
       if(currentPage !== 1){
        setCurrentPage(currentPage-1)
       }
     }
     const nextPage=()=>{
      if(currentPage !== npage){
        setCurrentPage(currentPage+1)
       }
     }
    

  return (
    <>
      <div className='container m-3'>
        <center><h5><span>{Username}</span></h5></center>
        <div className='mt-3'>
        <input type="email" className="form-control shadow-none" placeholder='search..' onKeyUp={(e)=>handleInput(e)} />
        </div>

        <div class="container my-5">
         <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {records?.map((d,k)=>(<>
           <div class="col">
             <div class="card h-100 ">
               <div class="position-relative m-2 border rounded">
                 <img src={d.thumbnail} class="card-img-top" alt="Product Image"/>
                 <div class="price-tag position-absolute bottom-0 end-0 bg-danger text-white p-2 rotate-tag" style={{fontSize:'12px'}}>
                   {d.price}
                 </div>
               </div>
               <div class="card-body">
                 <h6 class="card-title text-center  ">{d.title}</h6>
               </div>
             </div>
           </div></>
             ))
          }    
           
         </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a href='#' class="page-link" onClick={prePage}>Prev</a>
          </li>
          {
            numbers.map((n,i)=>(
              <li class={`page-item ${currentPage === n? 'active': ''}`} key={i}>
                <a href='#' class="page-link" onClick={()=>changecPage(n)}>{n}</a>
              </li>
            ))
          }
           <li class="page-item">
            <a href='#' class="page-link" onClick={nextPage}>Next</a>
          </li>
        </ul>
      </nav>

      </div>
    </>
  )
}
