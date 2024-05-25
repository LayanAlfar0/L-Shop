import React, { useEffect, useState } from 'react';
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
import './Categories.css'

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(true);
    const getData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`);
            const data = await response.json();
            setCategories(data.categories);
            setLoader(false);
            setError('');
            // console.log(import.meta.env.VITE_API_URL);
        } catch (error) {
            console.log('error to load data');
            setLoader(false);
            setError('error to load data');
        }
    }
    useEffect(
        () => {
            getData();
        },
        []
    );
    if (loader) {
        return <Loader />
    }
    return (
        <div>
            {error ?? <h2>Error ....</h2>}
            <div className="Categorise">
                <div className="CategoriesHeader"><h2>Our Categorise</h2></div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    // slidesPerView={5}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: {
                            slidesPerView: 5,
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        }
                    }}
                >
                    {(categories.length > 0) ? categories.map(
                        category => (
                            <SwiperSlide className='Category' key={category._id}>
                                <Link to={`/products/category/${category._id}`} ><img src={category.image.secure_url} alt={category.name} /></Link>
                            </SwiperSlide>
                        )
                    ) : <p>Error empty Categorise !!!</p>}
                </Swiper>
            </div>
        </div>
    )
}
