import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext'


const CartItem = () => {
  const {all_products,cartitems,removecart,getTotalCartAmount}=useContext(ShopContext)
  return (
    <div className='cartitem'>
      <div className='cartitems-format-main'>
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
      </div>
 <hr/>
      {all_products.map((e)=>{
             if(cartitems[e.id]>0)
             {
              return<div>
               <div className='cartitems-format cartitems-format-main'>
                <img src={e.image} alt='' className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartiems-quantity'>{cartitems[e.id]}</button>
                <p>${e.new_price*cartitems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon}  onClick={()=>{removecart(e.id)}} alt=''/>
               </div>
                   </div>
             }
             return null
      })}
      <div className='cartiems-down'>
         <div className='cartiems-total'>
          <h>Cart Totals</h>
          <div>
            <div className='cartiems-total-item'>
                      <p>Sub Total</p>
                      <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cartiems-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr/>
            <div className='cartiems-total-item'> 
                 <h3>Total</h3>
                 <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed to Checkout</button>
         </div> 
          <div className='cartiems-promocode'>
              <p>If you have a promocode ,Enter it here</p>
              <div className='cartiems-promobox'>
                <input type='text' placeholder='PROMO CODE'/>
                <button>Submit</button>
              </div>
          </div>
      </div>
</div>
  )
}

export default CartItem