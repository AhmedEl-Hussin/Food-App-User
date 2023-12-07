import { useForm } from "react-hook-form";
import logo from '../../../assets/images/4 3.png'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login({saveUserData}) {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState : { errors },
  } = useForm();
  
  const [isLoding , setIsLoding] =useState(false)
  const {baseUrl} = useContext(AuthContext)


  // ****************** to login **********************
  const onSubmit = (data)=> {
    // console.log(data);
    setIsLoding(true)

    axios.post( `${baseUrl}/Users/Login` , data)
    .then((response)=> {
      localStorage.setItem('userToken', response.data.token);
      saveUserData()
      navigate("/dashboard")
      toast.success("Successfully")
    })
    .catch((error)=> {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message)
      setIsLoding(false)
    })
  }

  return (
    <>
      <div className="Auth-container">
        <div className="overLay d-flex justify-content-center align-items-center">
          
          <div className="caption bg-white">
              <div className='imageLogo text-center'>
                <img className='w-50' src= {logo} alt="" />
              </div>

              <form className='form w-75 m-auto mt-4' onSubmit={handleSubmit(onSubmit)}>
                <h2>Log in</h2>
                <p>Welcome Back! Please enter your details</p>

  {/* ************************* for input email ***************************** */}
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

  {/* ************************* for input password ************************* */}
                <div className='form-group mt-4 position-relative'>
                  <i className="fa icon fa-lock"></i>
                  <input className='form-control ps-5' 
                    placeholder='Password' 
                    type="password" 
                    {...register("password" , {
                      required : true,
                      pattern : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/
                    })}
                  />

                  {errors.password && errors.password.type === "required" && (
                  <span className='text-danger mt-4'>Password is required</span>
                  )}

                  {errors.password && errors.password.type === "pattern" && (
                  <span className='text-danger mt-4'>Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long</span>
                  )}

                </div>

                <div className='rigester mt-3 d-flex justify-content-between'>

                  <Link className="text-black" to="/rigesteration">
                    Rigester Now? 
                  </Link>

                  <Link to="/resetPassword">
                    Forget Password
                  </Link>
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
