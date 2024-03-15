import './navbar.css'
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png'
import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export default function Navbar(){
const [menu, setmenu] = useState("shops")
const {getTotalCartItems}=useContext(ShopContext);
return(

            <div className='navbar'>
                <div className="nav-logo">
                 <img src={logo} alt='logo'></img>
                 <p>SHOPPER</p>
                </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setmenu("shops")}}><Link to='/' style={{textDecoration:'none'}}>Shops</Link> {menu==="shops"?<hr/>: <></>}</li>
                <li onClick={()=>{setmenu("mens")}}><Link to='/mens'style={{textDecoration:'none'}}>Mens</Link>{menu==="mens"?<hr/>: <></>}</li>
                <li onClick={()=>{setmenu("womens")}}><Link to='/womens'style={{textDecoration:'none'}}>Womens</Link>{menu==="womens"? <hr/>: <></>}</li>
                <li onClick={()=>{setmenu("kids")}}><Link to='/kids'style={{textDecoration:'none'}}>Kids</Link>{menu==="kids"? <hr/>: <></>}</li>
                
            </ul>
                    <div className="nav-login-cart">
                        {localStorage.getItem('auth-token') ? <button onClick={()=>{localStorage.removeItem('auth-token') ; window.location.replace('/')}} >log out</button> :
                        <Link to='/login'><button >login</button></Link>}
                        <Link to='/cart'><img src={cart_icon} alt='cart_icon' ></img></Link>   
                      <div className='nav-cart-count'>{getTotalCartItems()}</div>

                    </div>

            </div>
            
        
    )
}

