import React, { useContext } from 'react'
import'./ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product}=props;
    const {addtocart}=useContext(ShopContext)
  return (
    <div className='productdisplay'>
           <div className='productdisplay-left'>
                  <div className='productdisplay-img-list'>
                       <img src={product.image} alt='1'/>
                       <img src={product.image} alt='2'/>
                       <img src={product.image} alt='3'/>
                       <img src={product.image} alt='4'/>             
                  </div>
           </div>
                    <div className='productdisplay-img'>
                       <img className='productdisplay-main-img' src={product.image}/>
                    </div>
           <div className='productdisplay-right'>
                 <h1>{product.name}</h1>
                 <div className='productdisplay-right-star'>
                          <img src={star_icon} alt=''/>
                          <img src={star_icon} alt=''/>
                          <img src={star_icon} alt=''/>
                          <img src={star_icon} alt=''/>
                          <img src={star_dull_icon} alt=''/>
                          <p>(122)</p>
                 </div>
                 <div className='productdisplay-right-prices'>
                     <div className='productdisplay-right-price-old'>${product.old_price}</div>
                     <div className='productdisplay-right-price-new'>${product.new_price}</div>
                 </div>
                 <div className='productdisplay-right-description'>
                         A light weight ,usually knitted,pullower shirt,close -fitting and a round neckine and short sleeves ,worn as an undershirt or outer garment.
                 </div>
                 <div className='productdisplay-right-size'>
                    <h1>Select Size</h1>
                    <div className='productdisplay-right-sizes'>
                            <div>S</div>
                            <div>M</div>
                            <div>L</div>
                            <div>XL</div>
                            <div>XXL</div>
                    </div>
                 </div>
                 <button onClick={()=>{addtocart(product.id)}}>ADD TO CART </button>
                    <p className='productdisplay-right-category'>
                  <spn>
                    Category :
                  </spn> Women,T-shirt,crop tops
                   </p>
                    <p className='productdisplay-right-category'>
                  <spn>
                    Tags :
                  </spn> Moden,Latest
                   </p>
           </div>
    </div>

  )
}

export default ProductDisplay