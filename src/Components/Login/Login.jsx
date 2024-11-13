import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const emailRef = useRef();


    

    const handleLogin = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset status
        setSuccess(false);

        // login user
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);

            if(!result.user.emailVerified){
                setLoginError('please verify your email address.')
            }
            else{
                setSuccess(true);
            }
            // setSuccess(true);
        })
        .catch(error =>{
            console.log('Error', error.message);
            setLoginError(error.message);

        })
    }

    const forgetPassword = () => {
        console.log('get me email address', emailRef.current.value);
        const emailValue = emailRef.current.value;
        if(!emailValue){
            console.log('Please provide a valid email address');
        }
        else{
            sendPasswordResetEmail(auth, emailValue)
            .then(() => {
                alert('password Reset email sent, please check your email')
            })
        }
    }

    return (
        <div className="hero max-w-lg mx-auto">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                <h1 className="text-2xl text-accent font-bold text-center">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" ref={emailRef} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    <label onClick={forgetPassword} className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                
                {
                    success && <p className="text-accent">User Login Successfull</p>
                }
                {
                    loginError && <p className="text-red-700">User Login Unsuccessful</p>
                }

                <p>New to this website? please <Link to='/signUp'>Sign Up</Link></p>
                </div>
            </div>
            </div>
    );
};

export default Login;