import React from 'react'
import data from "../Assets/data"
import Items from '../items/items'
import './Relatedproduct.css'

const Relatedproduct = () => {
  return (
    <div className='relatedproduct'>
        <h1>Related Producted</h1>
        <hr/>
        <div className='relatedproduct-item'>
               {data.map((item,i)=>{
                 return<Items  key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
               })
               }
        </div>   
     </div>
  )
}

export default Relatedproduct