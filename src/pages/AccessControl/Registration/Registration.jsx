import React, { useContext, useRef, useState } from 'react';
import { HiHand } from 'react-icons/hi';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProviders';
import { HashLoader } from 'react-spinners';


const Registration = () => {
    const [Error, setError] = useState('');

    const [spinner, setSpinner] = useState(false);

    const ref = useRef(null);
    const navigate = useNavigate();

    const { emailRegister, googleLogin, githubLogin, logout } = useContext(AuthContext);

    const handleRegistration = (e) => {
        setSpinner(true);
        e.preventDefault();
        setError('');

        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            setError("Your Password Can't be less than 6 character!!!");
            ref.current.focus();
            return
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
            setError("Please add at least one capital and small letter and one number");
            ref.current.focus();
            return
        }

        emailRegister(email, password, name, photoUrl)
            .then(result => {
                const user = result.user;
                navigate('/login');
                logout();
                setSpinner(false);
            })
            .catch(error => {
                setError(error.message.split('(')[1].split(')')[0].split('/')[1])
                console.log(error.message);
                setSpinner(false);
            })

        console.log(name, photoUrl, email, password);
    }

    const googleRegister = () => {
        setSpinner(true);
        googleLogin()
            .then(result => {
                const user = result.user;
                logout();
                navigate('/login');
                setSpinner(false);
            })
            .catch(error => {
                console.log(error.message);
                setSpinner(false);
            })
    }

    const githubRegister = () => {
        setSpinner(true);
        githubLogin()
            .then(result => {
                const user = result.user;
                logout();
                navigate('/login');
                setSpinner(false);
            })
            .catch(error => {
                console.log(error.message);
                setSpinner(false);
            })
    }

    return (
        <div className='mb-12'>
            {spinner &&
                <div>
                    <div className='hidden lg:block absolute left-1/3 top-1/4'>
                        <HashLoader
                            color="#5b31d2"
                            size={400}
                        ></HashLoader>
                    </div>
                    <div className='lg:hidden absolute left-1/4 top-1/4'>
                        <HashLoader
                            color="#5b31d2"
                            size={200}
                        ></HashLoader>
                    </div>
                </div>
            }
            <div className='flex justify-center items-center gap-2 lg:bg-slate-800 pt-8  lg:py-12'>
                <div className='lg:mt-6'>
                    <h1 className='text-md lg:text-2xl lg:text-yellow-300 text-center font-extrabold tracking-wide'>Hello! WE WAS WAITING FOR YOU</h1>
                    <div className='hidden lg:block border lg:border-white w-3/4 mx-auto my-3'></div>
                </div>
                <HiHand className='text-yellow-300 text-3xl'></HiHand>
            </div>

            <section className='mt-8 lg:my-24 flex justify-center px-4 lg:custom-container'>
                <div className='bg-[#e5e7f18e] shadow-lg shadow-slate-400 p-2'>
                    <div className='bg-[#f7f8ff]  p-8 flex flex-col-reverse lg:grid lg:grid-cols-3 items-center rounded-lg shadow-2xl'>
                        <div className='text-center lg:border-r-2 lg:pr-10 grid'>
                            <h1 className='text-4xl text-slate-600 font-bold tracking-wide'>Already Have An Account?</h1>
                            <p className='text-slate-400 font-medium mt-4'>
                                We Are Grateful
                                <br />
                                To Have You With Us
                                <br />
                                Please Login!
                            </p>
                            <Link to={'/login'} className="btn rounded-full mx-auto mt-6 lg:mt-12 btn-wide">SIGN IN</Link>
                        </div>

                        <div className='col-span-2 px-20 justify-center text-center'>
                            <h1 className='text-4xl text-slate-600 font-bold tracking-wide'>Create Account</h1>
                            <div className='flex gap-2 justify-center items-center my-6'>
                                <button onClick={googleRegister} className='w-12 h-12 hover:bg-slate-200 border-2 border-slate-700 rounded-full flex justify-center items-center'>
                                    <FaGoogle className='text-2xl text-slate-700'></FaGoogle>
                                </button>
                                <button onClick={githubRegister} className='w-12 h-12 hover:bg-slate-200 border-2 border-slate-700 rounded-full flex justify-center items-center'>
                                    <FaGithub className='text-2xl text-slate-700'></FaGithub>
                                </button>
                            </div>
                            <div>
                                <p>You can also signup with your Email</p>
                                <hr className='border-slate-400 w-3/4 mx-auto mt-2 mb-12' />
                            </div>

                            {/* Form Section */}
                            <form onSubmit={handleRegistration} className='grid w-full'>
                                <input type="text" name="name" id="name" placeholder='Name' required
                                    className='border border-slate-200 mb-6 outline-none px-6 py-3 rounded-lg shadow-inner bg-transparent'
                                />
                                <input type="text" name="photo" id="photo-url" placeholder='Photo URL' required
                                    className='border border-slate-200 mb-6 outline-none px-6 py-3 rounded-lg shadow-inner bg-transparent'
                                />
                                <input type="email" name="email" id="email" placeholder='Email' required
                                    className='border border-slate-200 mb-6 outline-none px-6 py-3 rounded-lg shadow-inner bg-transparent'
                                />
                                <input type="password" name="password" id="password" placeholder='Password' required ref={ref}
                                    className='border border-slate-200 outline-none px-6 py-3 rounded-lg shadow-inner bg-transparent'
                                />
                                <p className='mt-5 text-error font-medium tracking-wider'>{Error}</p>
                                <input type="submit" value="SIGN UP" className="btn rounded-full mx-auto my-8 btn-wide" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Registration;