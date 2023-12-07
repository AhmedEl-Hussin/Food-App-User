import { useForm } from 'react-hook-form'
import logo from '../../../assets/images/4 3.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext.jsx';


export default function ForgetPassword() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState : { errors },
  } = useForm();
  const [isLoding , setIsLoding] =useState(false)
  const {baseUrl} = useContext(AuthContext)


  // *************** to change password **************
  const onSubmit = (data)=>{
    // console.log(data);
    setIsLoding(true)
    axios.post( `${baseUrl}/Users/Reset` , data )
    .then((response)=> {
      // console.log(response);
      navigate("/login")

    })
    .catch((error)=> { 
      error(error?.response?.data?.message || "Data Not Vaild");
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
                <h2> Reset  Password</h2>
                <p>Please Enter Your Otp  or Check Your Inbox</p>

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

                <div className='form-group mt-4 position-relative'>
                  <i className="fa icon fa-lock"></i>
                  <input className='form-control ps-5' 
                          placeholder='OTP' 
                          type="string" 
                          {...register("seed" , {
                            required : true
                          })}
                  />

                  {errors.seed && errors.seed.type === "required" && (
                  <span className='text-danger mt-4'>OTP is required</span>
                  )}

                </div>

                <div className='form-group mt-4 position-relative'>
                  <i className="fa icon fa-lock"></i>
                  <input className='form-control ps-5' 
                          placeholder='New Password' 
                          type="password" 
                          {...register("password" , {
                            required : true
                          })}
                  />

                  {errors.password && errors.password.type === "required" && (
                  <span className='text-danger mt-4'>Password is required</span>
                  )}

                </div>

                <div className='form-group mt-4 position-relative'>
                  <i className="fa icon fa-lock"></i>
                  <input className='form-control ps-5' 
                          placeholder='Confirm New Password' 
                          type="password" 
                          {...register("confirmPassword" , {
                            required : true
                          })}
                  />

                  {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                  <span className='text-danger mt-4'>Password is required</span>
                  )}

                </div>

                <div className='form-group mt-4'>
                  <button className='btn w-100 text-white'> 
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
                  </button>
                </div>

              </form>
          </div>

          </div>
      </div>
    </>
  )
}
