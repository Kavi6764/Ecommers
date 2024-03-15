import React, { useEffect, useState } from 'react';
import './Listproduct.css';
import cross_icon from '../../assets/cross_icon.png';

const Listproduct = () => {
  const [allproducts, setallproucts] = useState([]);

  const fetchinfo = async () => {
    await fetch('http://localhost:9000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setallproucts(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchinfo();
  }, []);
   
  const Remove_product = async (id)=>{
     await fetch('http://localhost:9000/removeproduct',{
      method : 'POST',
      headers :{
       Accept: 'application/json',
        'Content-Type': 'application/json',
      },
       body:JSON.stringify({id:id})}
       )
       await fetchinfo(); 
  }
  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return ( <>            
              <div key={index} className="listproduct-format-main listproduct-format-main">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{Remove_product(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt="" />
            </div>
            <hr/>
            </>

          );
        })}
      </div>
    </div>
  );
};

export default Listproduct;