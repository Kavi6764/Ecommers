import React, { createContext, useEffect, useState } from 'react';



export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};


const ShopContextProvider = (props) => {
  const [cartitems, setcartitems] = useState(getDefaultCart());
  const [all_products, setall_products] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/allproducts')
      .then((res) => res.json())
      .then((data) => setall_products(data));
      const token = localStorage.getItem('auth-token');
      if(token){
        fetch('http://localhost:9000/getcart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':token,
            'Content-Type':'application/json'
          },
          body:""
        }).then((res)=>res.json()).then((data)=>setcartitems(data))
      }
 
 
    }, []);

  const addtocart = async (itemId) => {
    const token = localStorage.getItem('auth-token');
    setcartitems((prev) => {
      if (prev[itemId]) {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      } else {
        return { ...prev, [itemId]: 1 };
      }
    });
    if (token) {
      await fetch('http://localhost:9000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => {
          // handle the response data here
          console.log(data);
        });
    }
  };
  const removecart = async (itemId) => {
    const token = localStorage.getItem('auth-token');
    setcartitems((prev) => {
      if (prev[itemId] && prev[itemId] > 0) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        return prev;
      }
    });
    if (token) {
      await fetch('http://localhost:9000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => {
          // handle the response data here
          console.log(data);
        });
    }
  };

  const getTotalCartAmount = () => {
    let TotalAmount = 0;
    for (const [ItemId, quantity] of Object.entries(cartitems)) {
      if (quantity > 0) {
        let itemInfo = all_products.find((Product) => Product.id === Number(ItemId));
        TotalAmount += itemInfo.new_price * quantity;
      }
    }
    return TotalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const [item] of Object.entries(cartitems)) {
      if (cartitems[item] > 0) {
        totalItem += cartitems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_products,
    cartitems,
    addtocart,
    removecart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  console.log(cartitems);
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;