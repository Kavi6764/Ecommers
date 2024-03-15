import React, { useEffect, useState } from 'react'
import './Popular.css'

import Items from '../items/items'
const Popular = () => {
       const [popularinwoman,setpopularinwomen] = useState([]);
        useEffect(()=>{
          fetch('http://localhost:9000/popularinwoman').then((res)=> res.json()).then((data)=>setpopularinwomen(data));
        })
  return (
    <div className='popular'> 
    <h1>POPULAR IN  WOMEN</h1>
     <hr></hr>
     <div className='popular-item'>
        {popularinwoman.map((item,i)=>{
            return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>

        })}

     </div>
    </div>
  )
}

export default Popular