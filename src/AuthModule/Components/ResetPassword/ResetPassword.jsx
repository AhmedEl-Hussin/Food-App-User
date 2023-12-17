import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/images/4 3.png'
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext.jsx";



export default function ResetPassword() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState : { errors },
  } = useForm();
  
  const [isLoding , setIsLoding] =useState(false)
  const {baseUrl} = useContext(AuthContext)

    // ************* to rest email ***************
    const onSubmit = (data)=>{
      // console.log(data);
      setIsLoding(true)
      axios.post( `${baseUrl}/Users/Reset/Request` , data )
        .then((response)=> {
          // console.log(response);
            navigate("/forgetPassword")
        })
        .catch((error)=> { 
          error(error?.response?.data?.message || 'Any fallback error message');
          setIsLoding(false)
        })
  };


  return (
    <>
    <div className='Auth-container contianer-fluid'>
      <div className="overLay d-flex justify-content-center align-items-center">
          
          <div className="caption bg-white">
              <div className='imageLogo text-center'>
                <img className='w-50' src= {logo} alt="" />
              </div>

              <form className='form w-75 m-auto mt-4' onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-success">Request Reset  Password</h2>
                <p>Please Enter Your Email And Check Your Inbox</p>


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

                <div className='form-group mt-4'>
                  <button className='btn w-100 text-white'> {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Send"}</button>
                </div>

              </form>
          </div>

          </div>
      </div>
    </>
  )
}
