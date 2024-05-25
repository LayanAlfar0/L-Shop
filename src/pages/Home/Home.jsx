import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';
import { UserContext } from '../../Components/Contex/User';

export default function Home() {
    const {userName}=useContext(UserContext);
    return (
        <>
        <h2 className='username'>Welcome {userName}</h2>
            <div className="hero">
                <div className="heroContent">
                    <h3>New Arrival</h3>
                    <h2>Discover Our New Collection</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae ullam pariatur saepe nulla voluptates consectetur atque nihil error mollitia repellat magni libero fugit iusto hic obcaecati tempora, placeat dicta sapiente.</p>
                    <button className="btn btn-outline-success">Buy Now</button>
                </div>
            </div>
            <Categories />
        </>
    )
}
