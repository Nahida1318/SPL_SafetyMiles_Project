
// import './signup.css';

// // function SignUp() {
// //   return (
// //     <form>
// //       <div className="text-center mb-3">
// //         <p>Sign up with:</p>
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
// //         <input type="text" id="registerName" className="form-control" />
// //         <label className="form-label" htmlFor="registerName">Name</label>
// //       </div>
// //       <div className="form-outline mb-4">
// //         <input type="text" id="registerUsername" className="form-control" />
// //         <label className="form-label" htmlFor="registerUsername">Username</label>
// //       </div>
// //       <div className="form-outline mb-4">
// //         <input type="email" id="registerEmail" className="form-control" />
// //         <label className="form-label" htmlFor="registerEmail">Email</label>
// //       </div>
// //       <div className="form-outline mb-4">
// //         <input type="password" id="registerPassword" className="form-control" />
// //         <label className="form-label" htmlFor="registerPassword">Password</label>
// //       </div>
// //       <div className="form-outline mb-4">
// //         <input type="password" id="registerRepeatPassword" className="form-control" />
// //         <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
// //       </div>
// //       <div className="form-check d-flex justify-content-center mb-4">
// //         <input className="form-check-input me-2" type="checkbox" id="registerCheck" defaultChecked />
// //         <label className="form-check-label" htmlFor="registerCheck">
// //           I have read and agree to the terms
// //         </label>
// //       </div>
// //       <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
// //     </form>
// //   );
// // }

// // export default SignUp;

// import  { useState } from 'react';
// // import './SignupForm.css';

// function SignUp() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [personalInfo, setPersonalInfo] = useState('');
//     const [message, setMessage] = useState('');

//     async function createUser(userData) {
//       const response = await fetch('http://localhost:5001/api/incident/user/new', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(userData),
//       });
  
//       if (!response.ok) {
//           throw new Error('Failed to create user');
//       }
  
//       return response.json();
//   }
  

//   const handleSubmit = async (event) => {
//     event.preventDefault();  // Prevent default form submission behavior
//     try {
//         const response = await createUser({ email, password, personalInfo });
//         setMessage('User created successfully!');
//         console.log('User created:', response);
//         // Optionally, redirect the user to a different page
//         // For example: window.location.href = '/signin';
//     } catch (error) {
//         setMessage('Error creating user. Please try again.');
//         console.error('Error creating user:', error);
//     }
// };

// return (
//     <div className="form-container">
//         <form onSubmit={handleSubmit}>
//             <label>Email:
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>Password:
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>Personal Info:
//                 <textarea
//                     value={personalInfo}
//                     onChange={(e) => setPersonalInfo(e.target.value)}
//                     required
//                 />
//             </label>
//             <button type="submit">Sign Up</button>
//         </form>
//         {message && <p>{message}</p>}
//     </div>
// );
// }
// export default SignUp;




















import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './signup.css';
import { isValidEmail, isValidPassword } from './validation'; // Import the validation functions
import './UserInterface';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
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

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Here we can just log the successful input data or navigate to another page
        // console.log('Email:', email);
        // console.log('Password:', password);

        try {
            const response = await fetch('http://localhost:5001/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }); 

            const data = await response.json();
            if (data.success) {
                // Optionally, save the user data to localStorage or context
                localStorage.setItem('email', email);
                localStorage.setItem('user_id', data.user.id);
                navigate('/userInterface', { state: { user: data.user } });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to sign up. Please try again.');
        }
        
        // For example, navigate to a different route
        // navigate('/UserInterface');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
                <p>Sign up with:</p>
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

            <label className="form-label" htmlFor="signupEmail">Email</label>
            {error && <p className="text-center text-danger">{error}</p>}
            <div className="form-outline mb-4">
                <input
                    type="email"
                    id="signupEmail"
                    name="email"
                    placeholder='Enter your email address'
                    className="form-control"
                    value={email}
                    onChange={handleInput}
                    required
                />
                {/* <label className="form-label" htmlFor="signupEmail">Email</label> */}
            </div>
            <label className="form-label" htmlFor="signupPassword">Password</label>
            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="signupPassword"
                    name="password"
                    placeholder='Enter your password'
                    className="form-control"
                    value={password}
                    onChange={handleInput}
                    required
                />
                {/* <label className="form-label" htmlFor="signupPassword">Password</label> */}
            </div>

            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder='Confirm Password'
                    className="form-control"
                    value={confirmPassword}
                    onChange={handleInput}
                    required
                />
                {/* <label className="form-label" htmlFor="confirmPassword">Confirm Password</label> */}
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
            <div className="text-center">
                <p>Already a member? <Link to="/signin">Sign in</Link></p>
            </div>
        </form>
    );
}

export default SignUp;
