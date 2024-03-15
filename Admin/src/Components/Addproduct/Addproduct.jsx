import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';

const Addproduct = () => {
  const [image, setimage] = useState(false);

  const [productdetails, setproductdetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });

  const changehanler = (e) => {
    setproductdetails({ ...productdetails, [e.target.name]: e.target.value });
  };

  const imagehandler = (e) => {
    setimage(e.target.files[0]);
  };

  const Add_Product = async () => {
    let responseData;
    let product = productdetails;
    let formData = new FormData();
    
    // Only append the image file to the form data
    formData.append('product', image);
    
    await fetch('http://localhost:9000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    }).then((res) => res.json()).then((data) => {
      responseData = data;
    });
    
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);

      await fetch("http://localhost:9000/addproducts", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
               },
      body: JSON.stringify(product),
     }).then((res) => {
           if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
            }).then((data) => {
            data.success ? alert('Product Added') : alert('Failed');
            }).catch((error) => {
           console.error('Error:', error);
           alert('An error occurred while adding the product.');
           });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productdetails.name}
          type="text"
          name="name"
          id=""
          placeholder="Type here"
          onChange={changehanler}
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            value={productdetails.old_price}
            name="old_price"
            placeholder="Type here"
            onChange={changehanler}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            value={productdetails.new_price}
            name="new_price"
            placeholder="Type here "
            onChange={changehanler}
            />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productdetails.category}
          onChange={changehanler}
          name="category"
          className="add-product-selector"
        >
          <option value="women"> Women</option>
          <option value="men"> Men</option>
          <option value="kid"> Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnnail-image"
            alt={productdetails.name ? productdetails.name : 'Product Image'}
          />
        </label>
        <input
          onChange={(e) => imagehandler(e)}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={() => { Add_Product() }} className="Add-btn">ADD</button>
    </div>
  );
};

export default Addproduct;