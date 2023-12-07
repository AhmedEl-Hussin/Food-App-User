import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext.jsx";
import logo from '../../../assets/images/4 3.png'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerfiyEmail() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState : { errors },
    } = useForm();

    const [isLoding , setIsLoding] =useState(false)
    const {baseUrl} = useContext(AuthContext)

    const onSubmit = (data)=>{
        // console.log(data);
        setIsLoding(true)
        axios.put( `${baseUrl}/Users/verify` , data )
            .then((response)=> {
            // console.log(response);
            navigate("/login")
            toast.success("Verfiy Successfully")
        })
        .catch((error)=> { 
            toast.error(error?.response?.data?.message || 'Any fallback error message');
            setIsLoding(false)
        })
    };

    return (
        <>
            <div className="Auth-container">

                <div className="overLay d-flex justify-content-center align-items-center">
                    <div className="caption bg-white">
                        <div className='imageLogo text-center'>
                            <img className='w-50' src= {logo} alt="" />
                        </div>

                    <form className='form w-75 m-auto mt-4' onSubmit={handleSubmit(onSubmit)}>
                        <h2>Verfiy Email</h2>
                        <p>Welcome Back! Please enter your details</p>

    {/**************************** for input email *********************************/}
                        <div className='form-group position-relative mt-4'>
                            <i className="fa-regular icon fa-envelope"></i>
                            <input className='form-control ps-5' 
                                placeholder= 'Enter your E-mail' 
                                type="email" 
                                {...register("email" , {
                                required: true,
                                pattern : /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                            })}
                            />

                            {errors.email && errors.email.type === "required" && (
                            <span className='text-danger mt-4'>Email is required</span>
                                )}

                            {errors.email && errors.email.type === "pattern" && (
                            <span className='text-danger mt-4'>invaild email</span>
                            )}
                        </div>

    {/***************************** for input email ******************************* */}
                        <div className='form-group mt-4 position-relative'>
                            <i className="fa icon fa-lock"></i>
                            <input className='form-control ps-5' 
                                    placeholder='Enter Code' 
                                    type="string" 
                                    {...register("code" , {
                                        required : true
                                    })}
                            />

                            {errors.code && errors.code.type === "required" && (
                            <span className='text-danger mt-4'>Code is required</span>
                            )}

                        </div>
                        
                        <div className='form-group mt-4'>
                            <button className='btn w-100 text-white'> 
                                {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verfiy"}
                            </button>
                        </div>
                        
                    </form>
                </div>    
                        
                </div>
            </div>
        </>
    )
}
