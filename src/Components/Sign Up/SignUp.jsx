import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";


const SignUp = () => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');



    const handleSignUp = (e) =>{
        e.preventDefault();
        // console.log(e.target.email.value);

        // email and password
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);
        // before sending request
        // reset error and status
        setErrorMessage('');
        setSuccess(false);

        if(password.length < 6){
            setErrorMessage('Password should be 6 characters');
        }

        // sending request
        // create user with email and password1
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            setSuccess(true);
        })
        .catch(error =>{
            console.log('Error = ',error.message);
            setErrorMessage(error.message);
            setSuccess(false);
        })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
            <h1 className="text-2xl text-accent ">Sign up now</h1>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-accent">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-accent">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover text-accent">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary ">Login</button>
                </div>
            </form>
            {/* if you have error then */}
            {
                errorMessage && <p className="text-red-500 p-5">{errorMessage} This email address is already used.</p>
            }
            {
                success && <p className="text-accent">Successfully Singed Up</p>
            }
        </div>
    );
};

export default SignUp;