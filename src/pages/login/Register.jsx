import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
  const { signUp, profileUpdate, setLoading, googleSignIn } = useContext(AuthContext)
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = (data) => {
    console.log(data);
    if (data.password.length < 6) {
      return toast.warning("password should have at least 6 characters", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }
    if (data.password !== data.confirm) {
      return toast.warning("password didn't match", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    }

    signUp(data.email, data.password)
      .then((result) => {
        profileUpdate(result.user, data.name)
          .then((result) => {
            
            navigate(from, { replace: true });
            Swal.fire({
              title: 'Account created successfully',
              showClass: {
                  popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
              }
          })
          })
          .catch((error) => {
            setLoading(false)
            toast.error(error.message, {
              position: "top-right",
              autoClose: 4000,
              theme: "light",
            });
          });
      })
  };

  const handleLogInWithGoogle = ()=> {
    googleSignIn()
      .then(() => {
        navigate(from, { replace: true })
        
        Swal.fire({
          title: 'Account created successfully',
          showClass: {
              popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
          }
        })
      })
      .catch(error => console.log(error));
  }
    return (
        <div className="max-w-5xl mx-auto">
        <div className="flex justify-center">
  
          {/* Image */}
          <img className="w-full hidden lg:block h-fit" src="https://img.freepik.com/free-photo/truth-concept-arrangement-with-balance_23-2149051293.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=sph" alt="" />
  
          {/* Login Form */}
          <div className="w-full bg-[url('https://img.freepik.com/free-photo/truth-concept-arrangement-with-balance_23-2149051293.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=sph')] bg-no-repeat bg-cover bg-center lg:bg-none bg-lightDark flex justify-center items-center h-screen lg:h-auto px-5">
            <div className="max-w-sm mx-auto">
              <h2 className="text-4xl font-semibold mb-10">Sign up to <span className="text-secondary">Legalmate</span></h2>

              <form onSubmit={handleSubmit(onSubmit)} >
                {/* Full Name */}
                <input 
                className="h-12 w-full outline-none focus:border-b-4 focus:border-primary  px-3 text-dark bg-white" 
                type="text"
                placeholder="Full Name: "
                {...register("name")} 
                />

                {/* Image */}
                <input 
                className="h-12 w-full outline-none focus:border-b-4 bg-white focus:border-primary px-3 text-dark mt-5" 
                type="text"
                placeholder="Image URL: "
                {...register("image")} 
                />
    
                {/* Email */}
                <input 
                className="h-12 w-full outline-none focus:border-b-4 bg-white focus:border-primary  px-3 text-dark mt-5" 
                type="email"
                placeholder="*Email: "
                {...register("email", { required: true })} 
                />
                {errors.email && <span className='text-sm text-red-500 ml-1'>Email is required</span>}
    
                {/* Password */}
                <input 
                className="h-12 w-full outline-none focus:border-b-4 bg-white focus:border-primary  px-3 text-dark mt-5" 
                type="password"
                placeholder="*Password: "
                {...register("password", { required: true })} 
                />
                {errors.password && <span className='text-sm text-red-500 ml-1'>Password is required</span>}

                {/* Confirm Password */}
                <input 
                className="h-12 w-full outline-none focus:border-b-4 bg-white focus:border-primary  px-3 text-dark mt-5" 
                type="password"
                placeholder="*Confirm Password: "
                {...register("confirm", { required: true})} 
                />
                {errors.confirm && <span className='text-sm text-red-500 ml-1'>Confirm Password is required</span>}

                {/* user type" */}
                <div className='mt-5'>
                  <span className='pr-5'>I am a: </span>
                  <input 
                  className='outline-none cursor-pointer' 
                  type="radio" 
                  name="role"
                  id="client"
                  value="client"
                  {...register("role", { required: true })}
                  />
                  <label className='pl-2 pr-5' htmlFor="client">Client</label>

                  <input 
                  className='outline-none cursor-pointer' 
                  type="radio" 
                  name="role"
                  id="attorney"
                  value="attorney"
                  {...register("role", { required: true })}
                  />
                  <label className='pl-2' htmlFor="attorney">Attorney</label>
                </div>
                {errors.role && <span className='text-sm text-red-500 ml-1'>User Role is required</span>}


                {/* Submit */}
                <input 
                className="h-12 w-full outline-none  px-3 font-bold cursor-pointer bg-white hover:bg-primary hover:text-white text-primary duration-300 mt-5"
                type="submit"
                value="Signup"
                />
    
                {/* Sign up */}
                <p className='mt-2 text-end text-gray'>Already have an account? <Link className='text-primary' to='/login'>Sign in</Link></p>
              </form>
  
              {/* Divider */}
              <div className='flex items-center gap-3 mx-5 my-5'>
                <span className='border-t w-full block'></span>
                <span>OR</span>
                <span className='border-t w-full block'></span>
              </div>
  
              {/* Sign in with Google */}
              <button
                 onClick={handleLogInWithGoogle}
                className="flex items-center justify-center gap-5 bg-white text-black w-full h-12 duration-300"
              >
                <img
                  className="w-8"
                  src="https://i.ibb.co/0f4JQNf/google.png"
                  alt="Google"
                />
                <p>Sign up with Google</p>
              </button>
            </div>
          </div>
  
          
          
        </div>
      </div>
    );
};

export default Register;