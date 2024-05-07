import axios from 'axios';
import Cars from '../components/CarBox';
import { baseUrl } from '../constants/constants';
import React, { useEffect, useState } from 'react'

const Favorites = () => {
    const [favs, setFavs] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect( _ => {
        axios.post(baseUrl + "/cars/favorites", {userId: user._id})
            .then( res => setFavs(res.data.data))
            .catch( err => console.log(err.response.data.message));
    }, [user._id])

    return (
        <div className='home container-lg'>
            <h4 className='fs-3 m-2 text-center'>Favorites</h4>
            <div className="row">
                {
                    favs && favs.length > 0 ?
                    favs.map( car => {
                        return <Cars
                            id={car._id}
                            key={car._id}
                            title={car.title}
                            imageurl={car.image}
                            price={car.price}
                            liked={true}
                        />
                    })
                    :
                    <h4 className='text-center'>{favs === null ? "Loading..." : "No favorites found"}</h4>
                }
            </div>
        </div>
    )
}

export default Favorites