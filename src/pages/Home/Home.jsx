import React, { useEffect, useState } from 'react';
import './Home.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Home() {
    const [categories, setCategories] = useState([]);
    const getData = async () => {
        const response = await fetch(`https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=10`);
        const data = await response.json();
        setCategories(data.categories);

    }
    useEffect(
        () => {
            getData();
        },
        []
    );

    return (
        <>
            <div className="hero">
                <div className="heroContent">
                    <h3>New Arrival</h3>
                    <h2>Discover Our New Collection</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae ullam pariatur saepe nulla voluptates consectetur atque nihil error mollitia repellat magni libero fugit iusto hic obcaecati tempora, placeat dicta sapiente.</p>
                    <button className="btn btn-outline-success">Buy Now</button>
                </div>
            </div>
            <div className="Categorise">
                <div className="CategoriesHeader"><h2>Our Categorise</h2></div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={5}
                    pagination={{ clickable: true }}
                >
                    {categories.map(
                        category => (
                            <SwiperSlide className='Category' key={category.id}>
                                <a href="#"><img src={category.image.secure_url} alt={category.name} /></a>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>
        </>
    )
}
