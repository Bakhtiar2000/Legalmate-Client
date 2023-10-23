import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="max-w-5xl mx-auto">
        <div className="flex justify-center">
  
          {/* Image */}
          <img className="w-full hidden lg:block h-fit" src="https://img.freepik.com/free-photo/truth-concept-arrangement-with-balance_23-2149051293.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=sph" alt="" />
  
          {/* Login Form */}
          <div className="w-full bg-[url('https://img.freepik.com/free-photo/truth-concept-arrangement-with-balance_23-2149051293.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=sph')] bg-no-repeat bg-cover bg-center lg:bg-none bg-lightDark flex justify-center items-center h-screen lg:h-auto px-5">
            <div className="max-w-sm mx-auto">
              <h2 className="text-4xl font-semibold mb-10">Sign up to <span className="text-secondary">Legalmate</span></h2>

              {/* Full Name */}
              <input 
              className="h-12 w-full outline-none focus:border-b-4 focus:border-primary  px-3 text-dark mb-5" 
              type="text"
              placeholder="Full Name: "
              />

              {/* Image */}
              <input 
              className="h-12 w-full outline-none focus:border-b-4 focus:border-primary px-3 text-dark mb-5" 
              type="text"
              placeholder="Image URL: "
              />
  
              {/* Email */}
              <input 
              className="h-12 w-full outline-none focus:border-b-4 focus:border-primary  px-3 text-dark mb-5" 
              type="email"
              placeholder="Email: "
              />
  
              {/* Password */}
              <input 
              className="h-12 w-full outline-none focus:border-b-4 focus:border-primary  px-3 text-dark mb-5" 
              type="password"
              placeholder="Password: "
              />

              {/* Confirm Password */}
              <input 
              className="h-12 w-full outline-none focus:border-b-4 focus:border-primary  px-3 text-dark mb-5" 
              type="password"
              placeholder="Confirm Password: "
              />

              {/* Submit */}
              <input 
              className="h-12 w-full outline-none  px-3 font-bold cursor-pointer bg-white hover:bg-primary hover:text-white text-primary duration-300"
              type="submit"
              Value="Signup"
              />
  
              {/* Sign up */}
              <p className='mt-2 text-end text-gray'>Already have an account? <Link className='text-primary' to='/login'>Sign in</Link></p>
  
              {/* Divider */}
              <div className='flex items-center gap-3 mx-5 my-5'>
                <span className='border-t w-full block'></span>
                <span>OR</span>
                <span className='border-t w-full block'></span>
              </div>
  
              {/* Sign in with Google */}
              <button
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