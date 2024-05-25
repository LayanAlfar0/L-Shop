import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../Components/Loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { MdFavorite } from 'react-icons/md';
import { Slide, toast } from 'react-toastify';
import {  Link, useNavigate } from 'react-router-dom';

export default function Products() {
    const [loader, setLoader] = useState(true);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const getProducts = async () => {
        try {
            setLoader(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`);
            // console.log(data.products);
            setProducts(data.products);
            setLoader(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoader(false);
        }
        finally { setLoader(false); }
    };
    useEffect(() => { getProducts() }, []);
    if (loader)
        return <Loader />
    if (products.length === 0) {
        return <p>Empty products !!!</p>;
    }
    const token = localStorage.getItem('userToken');
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
            <div className="py-3 py-md-5 bg-light" >
                <div className="container">
                    <div className="row">
                        {(products.length > 0) ? products.map(
                            product => (
                                <>
                                    <div className="col-md-6 col-lg-4 " key={product._id}>
                                        <div className="product-card">
                                            <div className="product-card-img">
                                                <Swiper
                                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                    spaceBetween={0}
                                                    slidesPerView={1}
                                                    navigation
                                                    pagination={{ clickable: true }}
                                                >
                                                    <SwiperSlide className='img'>
                                                        <a href="#"><img src={product.mainImage.secure_url} alt="" /></a>
                                                    </SwiperSlide>
                                                    {(product.subImages.length > 0) ? product.subImages.map(
                                                        imgg => (
                                                            <SwiperSlide className='img'>
                                                                <a href="#"><img src={imgg.secure_url} /></a>
                                                            </SwiperSlide>
                                                        )
                                                    ) : null}
                                                </Swiper>
                                            </div>
                                            <div className="product-card-body">
                                                <h5 className="product-name">
                                                    <a href="#">
                                                        {product.name}
                                                    </a>
                                                </h5>
                                                <div>
                                                    <span className="selling-price"><span>$</span>{product.finalPrice}</span>
                                                    {/* <span className="original-price">{product.price}</span> */}
                                                    {product.finalPrice != product.price ? <span className="original-price"><span>$</span>{product.price}</span> : null}
                                                </div>
                                                <div className="mt-2">
                                                    <button onClick={() => addToCart(product._id)} className="btn btn1 expandable">Add To Cart</button>
                                                    <button className="btn btn1"> <MdFavorite /></button>
                                                    <Link to={`/product/${product._id}`} className="btn btn1" > View </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                            : (
                                null
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}
