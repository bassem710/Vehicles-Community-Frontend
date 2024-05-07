import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { baseUrl } from '../../constants/constants';

const AddCar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const imagesRef = useRef(null);
    const [image, setImage] =  useState('');
    const [title, setTitle] =  useState('');
    const [price, setPrice] =  useState("0");
    const [description, setDesc] =  useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddCar = () => {
        setLoading(true);
        if(!title || !price || !image || !description) {
            setError("Please fill all the required fields");
            setLoading(false);
            return;
        }
        // Form data
        // Submit
        axios.post(baseUrl + "/vehicle/add", {
            title,
            description,
            price,
            image
        })
            .then( res => navigate(`/home/`))
            // .catch( err => setError(err?.response?.data?.message))
            .finally( () => setLoading(false));
    }

    return (
        <div className="col-12 mt-3 p-3 shadow cardAdd bg-white rounded-3">
            <h2 className="text-center p-1">Add Car</h2>
            <div className="row">
                {/* Image select */}
                <div className="col-sm-12 col-md-9">
                    <div className="input-group mb-2">
                        <span className="input-group-text" id="inputGroup-sizing-default">
                        Image
                        </span>
                        <input
                        value={image}
                        onChange={ e => setImage(e.target.value)}
                        type="text"
                        className="form-control"
                        id="image"
                        />
                    </div>
                </div>
                {/* <input type="file" id="image" className='my-2' ref={imagesRef} onChange={ e => setImage(e.target.files[0])}/> */}
                {/* Title */}
                <div className="col-sm-12 col-md-9">
                    <div className="input-group mb-2">
                        <span className="input-group-text" id="inputGroup-sizing-default">
                        Title
                        </span>
                        <input
                        value={title}
                        onChange={ e => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                        />
                    </div>
                </div>
                {/* Price */}
                <div className="col-sm-12 col-md-3">
                    <div className="input-group mb-2">
                        <span className="input-group-text">$</span>
                        <input
                        value={price}
                        onChange={ e => setPrice(e.target.value)}
                        type="number"
                        className="form-control"
                        />
                    </div>
                </div>
            </div>
            {/* Desc */}
            <div className="input-group mb-2">
                <span className="input-group-text">description</span>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={ e => setDesc(e.target.value)}
                />
            </div>
            {/* Btn & Error Msg */}
            <div className="d-flex justify-content-between align-items-center">
                <p className='p-o m-0 text-danger fw-bold'>{error}</p>
                <button onClick={handleAddCar} className="btn btn-primary px-5">{loading ? "Loading..." : "Add Car"}</button>
            </div>
        </div>
    )
}

export default AddCar