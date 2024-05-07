import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../constants/constants';

function cars({id, title, imageurl, price, liked}) {
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLike = () => {
        axios.post(baseUrl + `/cars/likeChange/${id}`,{
            userId: user.role === "user" ? user._id : undefined,
            newLikeState: liked ? false : true})
            .then( _ => window.location.reload())
            .catch( err => console.log(err.response.data.message));
    }

    const handleDelete = () => {
        axios.delete(baseUrl + `/cars/deleteCar/${id}`, {
                headers: {Authorization: user && user.role === "admin" ? user._id : undefined}
            })
            .then( _ => window.location.reload())
            .catch( err => console.log(err?.response?.data?.message));
    }

    return (
    <div className="col-12 col-sm-4 col-lg-3 p-1">
        <div className="card w-100 h-100">
            <img src={imageurl} className="card-img-top" alt="" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text text-dark">{price} L.E.</p>
                <div className='d-flex justify-content-between'>
                    <Link to={`/cars/${id}`} className="btn btn-primary">View Info</Link>
                    {
                        user && user.role === "user" &&
                        <button className='favourite-button btn' onClick={handleLike}>
                            {liked ? "❤️" : "💔"}
                        </button>
                    }
                    {
                        user && user.role === "admin" &&
                        <button className='favourite-button btn' onClick={handleDelete}>
                            🗑️
                        </button>
                    }
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default cars