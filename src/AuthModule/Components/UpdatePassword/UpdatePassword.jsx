
import { useForm } from 'react-hook-form'
import logo from '../../../assets/images/4 3.png'
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext.jsx';

export default function UpdatePassword({handleClose}) {

  const {
    register,
    handleSubmit,
    getValues,
    formState : { errors },
  } = useForm();
  
  const [isLoding , setIsLoding] =useState(false)
  const {requstHeaders , baseUrl} = useContext(AuthContext)



  // ************** to update password ************
  const onSubmit = (data)=>{
    // console.log(data);
    setIsLoding(true)

    axios.put( `${baseUrl}/Users/ChangePassword` , data , {
      headers : requstHeaders
    })

    .then((response)=> {
      handleClose()
      // console.log(response);
      // toast.success("Password Updated Successfully");
    })
    .catch((error)=> { 
      // console.log(error?.response?.data?.message);
      error(error?.response?.data?.message);
      setIsLoding(false)
  })
};

  return (
    <>
          <div className=" d-flex justify-content-center align-items-center">
          
          <div className="caption w-75 bg-white">
              <div className='imageLogo text-center'>
                <img className='w-75' src= {logo} alt="" />
              </div>

              <form className='form m-auto mt-' onSubmit={handleSubmit(onSubmit)}>
                <h2>Change your password</h2>
                <p>Enter your details below</p>


                <div className='form-group mt-4 position-relative'>
                  <i className="fa icon fa-lock"></i>
                  
                  <input className='form-control ps-5' 
                          placeholder='Old Password' 
                          type="password" 
                          {...register("oldPassword" , {
                            required : true,
                            pattern : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/
                          })}
                  />

                  {errors.oldPassword && errors.oldPassword.type === "required" && (
                  <span className='text-danger mt-4'>Password is required</span>
                  )}

                  {errors.oldPassword && errors.oldPassword.type === "pattern" && (
                      <span className='text-danger mt-4'>Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long</span>
                  )}

                </div>

                <div className='form-group mt-4 position-relative'>
                  <i className="fa icon fa-lock"></i>
                  
                  <input
                      className='form-control ps-5' 
                      placeholder=' New Password' 
                      id="password"
                      type="password"
                      {...register("newPassword", {
                      required: "Please Enter New Password",
                      pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
                      })}
                    />
                    
                    {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}

                </div>

                <div className='form-group mt-4 position-relative'>
                  
                  <i className="fa icon fa-lock"></i>
                  <input
                    className='form-control ps-5' 
                    placeholder='Confirm New Password' 
                    id="confirmNewPassword"
                    type="password"
                    {...register("confirmNewPassword", {
                        required: "Please confirm your password",
                        validate:{
                          checkNewPassConfirmationHandler:(value)=>{
                            const{newPassword}=getValues();
                            return newPassword === value || "Newpassword and ConfirmNewPassword doesn't match!!"
                          },                              
                        }
                      })
                    }
                    />

                    {errors.confirmNewPassword&&(<span className="text-danger">{errors.confirmNewPassword?.message}</span>)}

                  </div>

                <div className='form-group mt-4'>
                  <button className='btn w-100 text-white'>
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Change Password"}
                  </button>
                </div>

              </form>
          </div>

          </div>

  
    </>
  )
}
