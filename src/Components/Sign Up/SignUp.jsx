import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const SignUp = () => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const handleSignUp = (e) =>{
        e.preventDefault();
        // console.log(e.target.email.value);




        // email and password
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;

        console.log(email, password, terms, name, photo);




        // before sending request
        // reset error and status
        setErrorMessage('');
        setSuccess(false);

        if(!terms){
            setErrorMessage('please accept terms and condition');
            return;
        }

        if(password.length < 6){
            setErrorMessage('Password should be 6 characters');
        }

        // password 6 digits check
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        // top thing means you have so you have to use ! means if u don't have then will give error
        if(!passwordRegex.test(password)){
            setErrorMessage('At least use one uppercase, one lowercase, one number, one special character');
            return;
        }



        // sending request
        // create user with email and password1
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            setSuccess(true);

            // send verification
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                console.log('verification email sent');
            })

            // update photo and profile name
            const profile = {
                displayName : name,
                photURL : photo
            }
            updateProfile(auth.currentUser, profile)
            .then(() => {
                console.log('User profile updated');
            })
            .catch(error => console.log('User profile update error'));

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
                        <span className="label-text text-accent">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-accent">Photo url</span>
                    </label>
                    <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-accent">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text text-accent">Password</span>
                    </label>
                    <input 
                    type={showPassword ? "text " : "password"} 
                    name="password"
                    placeholder="password" className="input input-bordered" required />
                    <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-4 top-12">
                        {
                            showPassword ? <FaEyeSlash /> : <FaEye />
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover text-accent">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label justify-start">
                            <input type="checkbox" name="terms" className="checkbox checkbox-accent" />
                            <span className="label-text ms-2">Accept term & condition</span>                     
                        </label>
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary ">Sign Up</button>
                </div>
            </form>
            {/* if you have error then */}
            {
                errorMessage && <p className="text-red-500 p-5">{errorMessage} This email address is already used.</p>
            }
            {
                success && <p className="text-accent">Successfully Singed Up</p>
            }
            <p>Already have an account <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default SignUp;