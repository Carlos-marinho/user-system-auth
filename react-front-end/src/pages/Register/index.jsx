import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")    
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await api.post('/register', {
                username: username,
                password: password
            })
            if (res.status === 201) {
                alert('User sucessfully created')
                navigate('/login')
            } 
            
        } catch (err) {
            alert("Error on register user")
        };
    };

    return ( 
        <div className="flex min-h-screen justify-center items-center">
            <div className="w-full mx-2.5 sm:mx-auto sm:max-w-lg ">
                <div className="flex flex-col items-center rounded-lg bg-slate-200 border border-gray-200 py-4 space-y-8">
                    <h1 className="text-2xl font-bold">Register</h1>

                    <form className="flex flex-col w-full gap-y-3 px-1 sm:px-2 items-center" onSubmit={handleSubmit}>
                        <input className="w-10/12 mx-1 px-3 py-2 rounded-md" onChange={(e) => {setUsername(e.currentTarget.value)}} placeholder="Enter a username" type="text" />
                        <input className="w-10/12 mx-1 px-3 py-2 rounded-md" onChange={(e) => {setPassword(e.currentTarget.value)}} placeholder="Password" type="password" />
                        <input value="Sign Up" type="submit" className="mt-2 px-10 py-2 border bg-blue-300 hover:bg-blue-900 hover:text-white cursor-pointer rounded-lg w-fit transition duration-300 ease-in-out"/>
                    </form>
                    <Link to="/login" className="text-black hover:text-blue-600">Have already an account? Click here to Sign In!</Link>
                </div>
            </div>
        </div>
    );
}
 
export default Register;