import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../constants/constants';

const AddNews = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const imagesRef = useRef(null);
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddNews = () => {
        setLoading(true);
        if(!title || !imagesRef.current.value || !desc) {
            setError("Please fill all the required fields");
            setLoading(false);
            return;
        }
        // Form data
        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('image', image);
        formData.append('title', title);
        formData.append('desc', desc);
        // Submit
        axios.post(baseUrl + "/news/addNews", formData)
            .then( res => navigate(`/news`))
            .catch( err => setError(err?.response?.data?.message))
            .finally( () => setLoading(false));
    }

    return (
        <div className="col-12 mt-3 p-3 shadow cardAdd bg-white rounded-3">
            <h2 className="text-center p-1">Add News</h2>
            <div className="row">
                {/* Image select */}
                <input type="file" id="image" className='my-2' ref={imagesRef} onChange={ e => setImage(e.target.files[0])}/>
                {/* Title */}
                <div className="col-12">
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
            </div>
            {/* Desc */}
            <div className="input-group mb-2">
                <span className="input-group-text">Description</span>
                <textarea
                    className="form-control"
                    value={desc}
                    onChange={ e => setDesc(e.target.value)}
                />
            </div>
            {/* Btn & Error Msg */}
            <div className="d-flex justify-content-between align-items-center">
                <p className='p-o m-0 text-danger fw-bold'>{error}</p>
                <button onClick={handleAddNews} className="btn btn-primary px-5">{loading ? "Loading..." : "Add News"}</button>
            </div>
        </div>
    )
}

export default AddNews