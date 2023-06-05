import axios from "axios";
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { storeUser } from "../helper";



const initialUser = { password: "", identifier: "" };
function Login() {
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }))
    }

    const handleLogin = async () => {
        const url = `http://localhost:1337/api/auth/local`
        try {
            if (user.identifier && user.password) {
                const { data } = await axios.post(url, user);
                if (data.jwt) {
                    storeUser(data)
                    setUser(initialUser)
                    console.log('Success')
                }
            }
        } catch (err) {
            console.log('Fail to login!')
        }
    }



    return (
        <div>
            <h1>Login form</h1>
            <div>
                <input type="text" placeholder="Username"
                    name='identifier'
                    value={user.identifier}
                    onChange={handleChange}
                />
                <input type="password" placeholder="Password"
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                />
                <button onClick={handleLogin}
                >Submit</button>
            </div>
        </div>
    )
}

export default Login