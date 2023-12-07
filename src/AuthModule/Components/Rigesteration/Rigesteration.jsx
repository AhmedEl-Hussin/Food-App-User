
import { useForm } from 'react-hook-form';
import logo from '../../../assets/images/4 3.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Rigesteration() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState : { errors },
  } = useForm();

  const {baseUrl} = useContext(AuthContext);
  const [isLoding , setIsLoding] =useState(false);


  const onSubmit = (data)=>{
    // console.log(data);
    setIsLoding(true)

    axios.post(`${baseUrl}/Users/Register` , data)
    .then((response)=> {
      // console.log(response); 
      navigate("/verfiyEmail")
      localStorage.setItem('userToken', response.data.token);
      setIsLoding(false)
      toast.success("Cheak Your Email")
    })
    .catch((error)=> {
      // console.log(error?.response?.data?.message);
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

              <form className='form px-5 m-auto mt-4' onSubmit={handleSubmit(onSubmit)}>
                <h2>Register</h2>
                <p>Welcome Back! Please enter your details</p>

                <div className='row'>

      {/* ************************* for input userName ***************************** */}
                  <div className='col-sm-6'>
                    <div className='form-group position-relative mt-4'>
                      <i className="fa-solid icon fa-user"></i>
                      <input className='form-control ps-5'
                          placeholder= 'Enter your Name' 
                          type="text" 
                          {...register("userName" , {
                            required: true,
                            pattern : /^[A-Za-z][A-Za-z0-9_]{7,29}$/
                          })}
                      />

                      {errors.userName && errors.userName.type === "required" && (
                        <span className='text-danger mt-4'>userName is required</span>
                      )}

                      {errors.userName && errors.userName.type === "pattern" && (
                        <span className='text-danger mt-4'>The userName must contain characters and end with numbers without spaces. </span>
                      )}

                    </div>
                  </div>

      {/* ************************* for input email ************************* */}
                  <div className='col-sm-6'>
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
                  </div>

                </div>

                <div className='row'>

      {/* ************************* for input country ***************************** */}
                  <div className='col-sm-6'>
                    <div className='form-group position-relative mt-4'>
                      <i className="fa-solid icon fa-earth-americas"></i>
                        <input className='form-control ps-5' 
                          placeholder= 'Country' 
                          type="text" 
                          {...register("country" , {
                            required: true,
                          })}
                        />
    
                      {errors.country && errors.country.type === "required" && (
                      <span className='text-danger mt-4'>Country is required</span>
                      )}

                    </div>
                  </div>

      {/* ************************* for input phone number ************************* */}
                  <div className='col-sm-6'>
                    <div className='form-group mt-4 position-relative'>
                      <i className="fa icon fa-lock"></i>
                      <input className='form-control ps-5' 
                        placeholder='phoneNumber' 
                        type="number" 
                        {...register("phoneNumber" , {
                          required : true,
                          pattern : /^01[0-2,5]{1}[0-9]{8}$/
                        })}
                      />

                      {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                      <span className='text-danger mt-4'>phoneNumber is required</span>
                      )}

                      {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
                      <span className='text-danger mt-4'> Invaild phone number</span>
                      )}

                    </div>
                  </div>

                </div>

                <div className='row'>

      {/* ************************* for input password ***************************** */}
                  <div className='col-sm-6'>
                    <div className='form-group mt-4 position-relative'>
                      <i className="fa icon fa-lock"></i>

                      <input
                          className='form-control ps-5' 
                          placeholder=' New Password' 
                          id="password"
                          type="password"
                          {...register("password", {
                          required: "Password is requird",
                          pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
                          })}
                        />
                      { 
                        errors.password && 
                        <span className='text-danger'>
                        {errors.password.message}</span>
                      }

                      {errors.password && errors.password.type === "pattern" && (
                        <span className='text-danger mt-4'>The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.</span>
                      )}

                    </div>
                  </div>

      {/* ************************* for input confirm password ************************* */}
                  <div className='col-sm-6'>
                    <div className='form-group mt-4 position-relative'>
                    
                      <i className="fa icon fa-lock"></i>
                      <input
                        className='form-control ps-5' 
                        placeholder='Confirm New Password' 
                        id="confirmNewPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: " confirm password is requird",
                            validate:{
                              checkNewPassConfirmationHandler:(value)=>{
                                const{password}=getValues();
                                return password === value || "Newpassword and ConfirmNewPassword doesn't match!!"
                              },                              
                            }
                          })
                        }
                        />
  
                      {errors.confirmPassword&&(<span className="text-danger">{errors.confirmPassword?.message}</span>)}
                      
                    </div>
                  </div>

                </div>


                <div className='rigester text-end mt-3'>
                  <Link to="/login">
                    Login
                  </Link>
                </div>

                <div className='form-group mt-4'>
                  <button className='btn w-100 text-white'> 
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Register"}
                  </button>
                </div>

              </form>
          </div>

          </div>
      </div>
    </>
  )
}
