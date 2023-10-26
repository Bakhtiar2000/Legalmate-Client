import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

const Login = () => {
  
  const { signIn, setLoading, googleSignIn } = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [type, setType] = useState('password');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    signIn(data.email, data.password)
        .then(() => {
            navigate(from, { replace: true })
             
            Swal.fire({
              title: 'Account login successful',
              showClass: {
                  popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
              }
          })
        })
        .catch(error => {
          console.log(error);
            setLoading(false)
            error.message == "Firebase: Error (auth/user-not-found)."?
            toast.error("User Not Found", {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
            }):
            error.message == "Firebase: Error (auth/invalid-email)."?
            toast.error("Invalid Mail Provided", {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
            }):
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
            });
        })
    };

    const handleLogInWithGoogle = ()=> {
      googleSignIn()
        .then(() => {
          navigate(from, { replace: true })
          
          Swal.fire({
            title: 'Account login successful',
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
        <img className="w-full hidden lg:block" src="https://img.freepik.com/free-photo/truth-concept-arrangement-with-balance_23-2149051293.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=sph" alt="" />

        {/* Login Form */}
        <div className="w-full bg-[url('https://img.freepik.com/free-photo/truth-concept-arrangement-with-balance_23-2149051293.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=sph')] bg-no-repeat bg-cover bg-center lg:bg-none bg-lightDark flex justify-center items-center h-screen lg:h-auto px-5">
          <div className="mx-auto">
            <h2 className="text-4xl font-semibold mb-10">Login to <span className="text-secondary">Legalmate</span></h2>

           <form onSubmit={handleSubmit(onSubmit)} >
            {/* Email */}
            <input 
            className="h-12 w-full outline-none px-3 text-dark bg-white" 
            type="email"
            placeholder="Email: "
            {...register("email", { required: true })} 
            />
            {errors.email && <span className='text-sm text-red-400 ml-1'>Email is required</span>}

            {/* Password */}
            <div className="h-12 w-full  bg-white px-3 flex justify-between items-center mt-5">
              <input 
              className="flex-1 outline-none text-dark bg-white" 
              type={type}
              placeholder="Password: "
              {...register("password", { required: true })} 
              />

              {/* Eye */}
              <div className='cursor-pointer text-black' onClick={() => setType(type === 'password' ? 'text' : 'password')}>
                  {
                      type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                  }
              </div>
            </div>
            {errors.password && <span className='text-sm text-red-400 ml-1'>Password is required</span>}

            {/* Submit */}
            <input 
            className="h-12 w-full outline-none  px-3 font-bold cursor-pointer bg-white hover:bg-primary hover:text-white text-primary duration-300 mt-5"
            type="submit"
            value="Login"
            />

            {/* Sign up */}
            <p className='mt-2 text-end text-gray'>New to Legalmate? <Link className='text-primary' to='/register'>Sign Up</Link></p>
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
              <p>Sign in with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;