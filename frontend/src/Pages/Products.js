import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import Relatedproduct from '../Components/Relatedproduct/Relatedproduct';

const Products = () => {
  const {all_products}=useContext(ShopContext);
  const{productId}=useParams();
  const Product=all_products.find((e)=>e.id===Number(productId))
  return (
    <div>
       <Breadcrum product={Product} />
       <ProductDisplay product={Product}/>
       <DescriptionBox/>
       <Relatedproduct/>
    </div>
  )
}

export default Products