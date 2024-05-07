import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../constants/constants';

const Compare = () => {
    const {car1,car2} = useParams();
    const navigate = useNavigate();
    const url=baseUrl + "/cars/" + car1;
    const [cars,Setcars]=useState({});
    const [isloading,setisloading]=useState(true);
    const [carsloading,setcarsloading]=useState(true);
    const [allcars, setallCars] = useState({});
    const [secCar,setsecCar] = useState({});
    const [seccarloading,setseccarloading]=useState(true);

    const secCarSelection = (carId) => {
        navigate("/compare/" + car1 + "/" + carId);
        window.location.reload();
    }

    useEffect( _ => {
        axios.get(baseUrl + "/cars/all")
        .then(
            (Response) =>{
                setallCars(Response.data);
                setcarsloading(false);
            })
            .catch(function(Error){
                console.log(Error.Response);
            })
    }, [])
    

    useEffect(
        ()=>{
            axios.get(url).then(
                (Response) =>{
                    Setcars(Response.data);
                    setisloading(false);
                }).catch(function(Error){
                    console.log(Error.Response);
                })
        },[url]
    )

    useEffect(
        ()=>{
            if(car2 !== undefined){
            axios.get(baseUrl + "/cars/" + car2).then(
                (Response) =>{
                    setsecCar(Response.data);
                    setseccarloading(false);
                }).catch(function(Error){
                    console.log(Error.Response);
                })}
        },[car2]
    )

    return (
        <div className='compare'>
            {
            isloading === true?
                // Loading
                <div className="compare-part">
                    <div className="compare-part-img image-fluid"><h4>Loading...</h4></div>
                    <h5 className='my-2'>Loading...</h5>
                    <div className="compare-part-info">
                        Loading...
                    </div>
                </div>
                :
                // Car 1
                <div className="compare-part">
                    <img src={cars.data.image} className="compare-part-img image-fluid" alt=''/>
                    <h5 className='my-2'>{cars.data.title}</h5>
                    <h5 className='my-2 text-danger'>Price: {cars.data.price}</h5>
                    <div className="compare-part-info">
                    {cars.data.desc}
                </div>
            </div>
            }
            {/* Splitter */}
            <span className='compare-title'>Compare</span>
            {/* Car 2 */}
            {
                car2 !== undefined?
                    seccarloading === true?
                    <div className="compare-part">
                            <div  className="compare-part-img image-fluid">Loading...</div>
                            <div className="compare-part-info">
                            Loading...
                            </div>
                    </div>
                    :
                    secCar.data &&
                    <div className="compare-part">
                            <img src={secCar.data.image} className="compare-part-img image-fluid" alt=''/>
                            <h5 className='my-2'>{secCar.data.title}</h5>
                            <h5 className='my-2 text-danger'>Price: {secCar.data.price}</h5>
                            <div className="compare-part-info">
                            {secCar.data.desc}
                            </div>
                    </div>
        :
            <div className='choose-to-compare'>
                <h5 className='my-3'>Choose Car To Compare</h5>
                {
                    carsloading === true?
                        <div className='choose-item'>
                            <div className='choose-item-img'>Loading ...</div>
                            <h5>Loading Car ...</h5>
                        </div>
                        :
                        allcars &&
                        allcars.data.map(
                            (car) => {
                                return(
                                    <Link key={car._id} onClick={() => secCarSelection(car._id)} className='choose-item'>
                                        <img src={car.image} className='choose-item-img' alt=''/>
                                        <h5>{car.title}</h5>
                                    </Link>
                                )
                            }
                        )
                }
            </div>
            }
        </div>
    )
}

export default Compare