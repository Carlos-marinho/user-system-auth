import { useEffect, useState } from "react";
import api from "../../services/api";

const Users = () => {
    const [allUsers,setAllUsers] = useState([])

    async function getUsers() {
        const token = localStorage.getItem('token')

        const {data : {users} } = await api.get('/users', {
            headers: {Authorization: `Bearer ${token}`}
        })
        setAllUsers(users)
    }

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token')

        console.log(userId)
        const userDelete = await api.delete(`/users/${userId}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        getUsers()
        console.log(userDelete)
    }
    
    useEffect(() => {
        getUsers();
    }, []);

    return ( 
        <div className="bg-blue-400 mx-auto min-w-fit w-[30%] px-10 py-4 rounded-lg mt-10">
            <h2 className="font-bold text-2xl text-center my-4">User List</h2>

            <ul className="bg-blue-100 p-2 rounded-lg">
                {allUsers.map((user) => (
                    <li className="flex justify-between items-center px-2 py-1" key={user.id}>
                        <div>
                            <p>Username: {user.username}</p>
                            <p>ID: {user.id}</p>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(user.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-700">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
     );
}
 
export default Users;