
// // import { Link } from "react-router-dom";
// // import './signin.css';





// // function SignIn() {
// //   return (
// //     <form>
// //       <div className="text-center mb-3">
// //         <p>Sign in with:</p>
// //         <button type="button" className="btn btn-link btn-floating mx-1">
// //           <i className="fab fa-facebook-f" />
// //         </button>
// //         <button type="button" className="btn btn-link btn-floating mx-1">
// //           <i className="fab fa-google" />
// //         </button>
// //         <button type="button" className="btn btn-link btn-floating mx-1">
// //           <i className="fab fa-twitter" />
// //         </button>
// //         <button type="button" className="btn btn-link btn-floating mx-1">
// //           <i className="fab fa-github" />
// //         </button>
// //       </div>
// //       <p className="text-center">or:</p>
// //       <div className="form-outline mb-4">
// //         <input type="email" id="loginName" className="form-control" />
// //         <label className="form-label" htmlFor="loginName">Email or username</label>
// //       </div>
// //       <div className="form-outline mb-4">
// //         <input type="password" id="loginPassword" className="form-control" />
// //         <label className="form-label" htmlFor="loginPassword">Password</label>
// //       </div>
// //       <div className="row mb-4">
// //         <div className="col-md-6 d-flex justify-content-center">
// //           <div className="form-check mb-3 mb-md-0">
// //             <input className="form-check-input" type="checkbox" id="loginCheck" defaultChecked />
// //             <label className="form-check-label" htmlFor="loginCheck">Remember me</label>
// //           </div>
// //         </div>
// //         <div className="col-md-6 d-flex justify-content-center">
// //           <a href="#!">Forgot password?</a>
// //         </div>
// //       </div>
// //       <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
// //       <div className="text-center">
// //         <p>Not a member? <Link to="/signup">Register</Link></p>
// //       </div>
// //     </form>
// //   );
// // }



// // export default SignIn;





















// import  { useState } from 'react';
// import { useNavigate, Link } from "react-router-dom";
// import './signin.css';

// function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await fetch('http://localhost:3000/user/signin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 // Optionally, save the user data to localStorage or context
//                 navigate('/userInterface', { state: { user: data.user } });
//             } else {
//                 setError(data.message);
//             }
//         } catch (err) {
//             setError('Failed to sign in. Please try again.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="text-center mb-3">
//                 <p>Sign in with:</p>
//                 <button type="button" className="btn btn-link btn-floating mx-1">
//                     <i className="fab fa-facebook-f" />
//                 </button>
//                 <button type="button" className="btn btn-link btn-floating mx-1">
//                     <i className="fab fa-google" />
//                 </button>
//                 <button type="button" className="btn btn-link btn-floating mx-1">
//                     <i className="fab fa-twitter" />
//                 </button>
//                 <button type="button" className="btn btn-link btn-floating mx-1">
//                     <i className="fab fa-github" />
//                 </button>
//             </div>
//             <p className="text-center">or:</p>
//             {error && <p className="text-center text-danger">{error}</p>}
//             <div className="form-outline mb-4">
//                 <input
//                     type="email"
//                     id="loginName"
//                     className="form-control"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <label className="form-label" htmlFor="loginName">Email or username</label>
//             </div>
//             <div className="form-outline mb-4">
//                 <input
//                     type="password"
//                     id="loginPassword"
//                     className="form-control"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <label className="form-label" htmlFor="loginPassword">Password</label>
//             </div>
//             <div className="row mb-4">
//                 <div className="col-md-6 d-flex justify-content-center">
//                     <div className="form-check mb-3 mb-md-0">
//                         <input className="form-check-input" type="checkbox" id="loginCheck" defaultChecked />
//                         <label className="form-check-label" htmlFor="loginCheck">Remember me</label>
//                     </div>
//                 </div>
//                 <div className="col-md-6 d-flex justify-content-center">
//                     <a href="#!">Forgot password?</a>
//                 </div>
//             </div>
//             <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
//             <div className="text-center">
//                 <p>Not a member? <Link to="/signup">Register</Link></p>
//             </div>
//         </form>
//     );
// }

// export default SignIn;











import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './signin.css';
import { isValidEmail, isValidPassword } from './validation'; // Import the validation functions
import './UserInterface';
import './SignUp';


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (!isValidEmail(email)) {
            setError('Invalid email format.');
            return;
        }

        if (!isValidPassword(password)) {
            setError('Password must be at least 6 characters long.');
            return;
        }


        // try {
        //     const response = await fetch('http://localhost:3000/user/signin', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email, password }),
        //     });

        //     const data = await response.json();
        //     if (data.success) {
        //         // Optionally, save the user data to localStorage or context
        //         navigate('/userInterface', { state: { user: data.user } });
        //     } else {
        //         setError(data.message);
        //     }
        // } catch (err) {
        //     setError('Failed to sign in. Please try again.');
        // }
        // Here we can just log the successful input data or navigate to another page

        try {
            const response = await fetch('http://localhost:5001/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                localStorage.setItem('email', email);
                localStorage.setItem('user_id', data.user.id);
                //localStorage.getItem('email');
                // Authentication successful, navigate to userInterface
                navigate('/userInterface');
            } else {
                // Authentication failed, display error message
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to sign in. Please try again.');
        }







        
        // For example, navigate to a different route
        // navigate('/userInterface');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
                <p>Sign in with:</p>
                {/* <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f" />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google" />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter" />
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github" />
                </button> */}
            </div>
            {/* <p className="text-center">or:</p> */}
            {error && <p className="text-center text-danger">{error}</p>}

            <label className="form-label" htmlFor="loginName">Email or username</label>
            <div className="form-outline mb-4">
                <input
                    type="email"
                    id="loginName"
                    name="email" // Add name attribute
                    placeholder='Enter your email address'
                    className="form-control"
                    value={email}
                    onChange={handleInput} // Use handleInput function
                    required
                />
                {/* <label className="form-label" htmlFor="loginName">Email or username</label> */}
            </div>

            <label className="form-label" htmlFor="loginPassword">Password</label>
            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="loginPassword"
                    name="password" // Add name attribute
                    placeholder='Enter your password'
                    className="form-control"
                    value={password}
                    onChange={handleInput} // Use handleInput function
                    required
                />
                {/* <label className="form-label" htmlFor="loginPassword">Password</label> */}
            </div>
            <div className="row mb-4">
                {/* <div className="col-md-6 d-flex justify-content-center">
                    <div className="form-check mb-3 mb-md-0">
                        <input className="form-check-input" type="checkbox" id="loginCheck" defaultChecked />
                        <label className="form-check-label" htmlFor="loginCheck">Remember me</label>
                    </div>
                </div> */}
                {/* <div className="col-md-6 d-flex justify-content-center">
                    <a href="#!">Forgot password?</a>
                </div> */}
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
            <div className="text-center">
                <p>Not a member? <Link to="/signup">Register</Link></p>
            </div>
        </form>
    );
}

export default SignIn;
