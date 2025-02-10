import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const url = import.meta.env.VITE_URL
const SignUp =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        setLoading(false);
      e.preventDefault();
      const trimEmail = email.trim();
      const trimPassword = password.trim();
      // Handle form submission here
      setError('');
      // 
      try {
        setLoading(true);
        if (!email || !password) {
            throw new Error('Please fill in all fields');
        }
        if (!EMAIL_REGEX.test(email)) {
          throw new Error('Invalid email address');
        }
        if (!PASSWORD_REGEX.test(password)) {
          throw new Error('Invalid password. Must contain at least 8 characters, including uppercase, lowercase, number, and special character');
        }
          const data = await fetch(url + "/api/tasksuser/signup", {
            method: 'POST',
            body: JSON.stringify({email:trimEmail, password:trimPassword}),
            headers: {
               "Content-type": "application/json"
            }
          })
          const resp = await data.json()
          console.log(data.ok)
          if (!data.ok){
            throw new Error(resp.message)
          }
        //   localStorage.setItem('comfyUser', JSON.stringify(resp))
          console.log(resp)
          navigate("/login")
          setEmail('');
          setPassword('');
        
      } catch (error) {
        console.log(error)
        setError(error.message)
      }
      setLoading(false);
      
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="mb-5 text-[1rem] font-semibold text-red-500">{error}</div>}
            <p className='mb-3'>Already have an account? click to<Link to="/login" className='text-blue-600 '> click to login</Link></p>
            <div className="flex items-center justify-between">
            <button
              disabled={loading}
                className={`px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed`}
                type="submit"
              >
                {loading? "Loading...": "signup"}
              </button>
            </div>
          </form>
        </div>
      </div>)
}

export default SignUp