import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './product.css'
import Loader from '../../Components/Loader/Loader';
import { IoMdHeartEmpty } from "react-icons/io";
import { Slide, toast } from 'react-toastify';


export default function Product() {
    const token = localStorage.getItem('userToken');
    const [loader, setLoader] = useState(true);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`);
            setCategories(data.categories);
            // console.log(data.categories);
        } catch (error) {
            // console.log('error to load data');
        }
    }
    useEffect(
        () => {
            getCategories();
        },
        []
    );
    const getProduct = async () => {
        try {
            setLoader(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
            console.log(data.product);
            setProduct(data.product);
            setLoader(false);
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
        finally{
            setLoader(false);
        }
    }

    useEffect(() => { getProduct() }, []);
        if (loader) {
        return <Loader />
    }
    const addToCart = async (productId) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
                { productId },
                {
                    headers: {
                        Authorization: `Tariq__${token}`
                    }
                }
            );
            // console.log(data);
            toast.success('Product added to Cart Successfully!', {
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
            // console.log(error.response.data.message);
            toast.error(error.response.data.message, {
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
    return (
        <>
            <section>
                <main>
                    <div className="left">
                        <div className="product-img">
                            <img src={product.mainImage?.secure_url} id="product-preview" />
                        </div>
                        <div className="thumbnails">
                            <ul className="thumbnails-list">
                                {product.subImages?.length > 0 ?
                                    product.subImages.map(
                                        imgg => (
                                            <li className="img-thumbs ">
                                                <img src={imgg.secure_url} />
                                            </li>
                                        )
                                    )
                                    : null}
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        {categories.length > 0 ? (
                            categories.map(category => {
                                if (category._id == product.categoryId) {
                                    return (
                                        <h3>{category.name}</h3>
                                    );
                                } else {
                                    return null;
                                }
                            })
                        ) : (
                            null
                        )} 
                        
                        
                        
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <div className="price-description">
                            <h2>${product.finalPrice}</h2>
                            {product.finalPrice != product.price ? <h5><strike><span>$</span>{product.price}</strike></h5> : null}
                        </div>
                        <IoMdHeartEmpty className='svg'/>
                        <div className="cart-function">
                            <button id="add-btn" onClick={()=>addToCart(product._id)}> Add to Cart</button>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}
