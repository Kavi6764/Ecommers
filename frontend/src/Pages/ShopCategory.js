import React, { useContext } from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Items from '../Components/items/items'
const ShopCategory = (props) => {
  const {all_products}=useContext(ShopContext)
  return (
    <div  className='ShopCategory'>
       <img className='shopcategory-banner' src={props.banner} alt='' />
       <div className='shopcategory-indexsort'>
       <p>
        <span>Showing 1-12</span> Out of 36 Products
       </p>
       <div className='shopcategory-sort'>
            Sort by <img src={dropdown_icon} alt=''></img>
       </div>
       </div>
       <div className='shopcategory-products'>
             {all_products.map((item,i)=>{
              if(props.category===item.category){
                  return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              }
              else{
                return null;
              }
             })}
       </div>
       <div className='shopcategory-loadmore'>
               Explore More
       </div>
      </div>
  )     
}

export default ShopCategory