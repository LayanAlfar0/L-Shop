import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Slide, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import Loader from '../../Components/Loader/Loader';


export default function Cart() {
    const token = localStorage.getItem('userToken');
    const [cart, setCart] = useState([]);
    const [loader, setLoader] = useState(false);

    const getCart = async () => {
        try {
            setLoader(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
            setCart(data.products);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        getCart();
    }, [cart.length]);
    
    if (loader) {
        return <Loader />;
    }
    const deleteItem = async (productId) => {
        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/cart/removeItem`,
                { productId },
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            // Update the cart state after deletion
            setCart(data.cart.products);
            toast.success('Product deleted from the cart successfully!', {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };
    let sum = 0;
    const clearCart=async()=>{
            const { data } = await axios.patch(
                `${import.meta.env.VITE_API_URL}/cart/clear`,{},
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            if(data.message ==='success'){
                toast.success('the cart cleared successfully!', {
                    position: "bottom-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
    }
    const decreaseQuantity=async(productId)=>{
        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId},
            {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            }
        );
        // console.log(data.cart.products);
    }
    const increaseQuantity= async(productId)=>{
        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId},
            {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            }
        );
        // console.log(data.cart.products);
    }

    return (
        <>
            <div className="card">
                <div className="row">
                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col"><h2>Shopping Cart</h2></div>
                            </div>
                        </div>
                        {cart.length > 0 ? cart.map(item => (
                            <div className="row border-top border-bottom" key={item._id}>
                                <div className="row main align-items-center">
                                    <div className="productCard">
                                        {item.details && item.details.mainImage && (
                                            <div className="col-2 imgContainer">
                                                <img className="img-fluid" src={item.details.mainImage.secure_url} alt={item.details.name} />
                                            </div>
                                        )}
                                        <div className="col">
                                            <div className="row text-muted">{item.details?.name}</div>
                                        </div>
                                        <div className="col quantityControl">
                                            <button className='btn' onClick={()=>decreaseQuantity(item.productId)}>-</button>
                                            <span className="border">{item.quantity}</span>
                                            <button className='btn' onClick={()=>increaseQuantity(item.productId)}>+</button>
                                        </div>
                                        <div className="col ">
                                            <span>$</span>{item.details?.finalPrice}
                                        </div>
                                        <div className="d-none">
                                            {item.quantity>0?sum += (item.details?.finalPrice)*item.quantity || 0:null}
                                            </div>
                                        <button onClick={() => deleteItem(item.productId)}><span className="close">✕</span></button>
                                    </div>
                                </div>
                            </div>
                        )) : <p>Empty Shopping Cart</p>}
                    </div>
                </div>
                <button className='clearCart btn' onClick={clearCart}><MdDelete /></button>
                <div className="summaryContainer">
                    <div className="col-md-4 summary">
                        <div><h5>Summary</h5></div>
                        <hr />
                        <p>SHIPPING</p>
                        <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right"><span>$</span> {sum}</div>
                        </div>
                        <button className="btn">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </>
    );
}
