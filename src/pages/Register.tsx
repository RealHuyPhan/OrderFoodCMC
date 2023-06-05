import axios from "axios";
import { useState, ChangeEvent } from "react";

function Register() {
    const initialUser = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        phone: "",
        role: "Authenticated"
    }
    const [user, setUser] = useState(initialUser)

    const signUp = async () => {
        const url = `http://localhost:1337/api/auth/local/register`;
        try {
            if (user.username && user.email && user.password && user.phone) {
                const res = await axios.post(url, user)
                if (res) {
                    setUser(initialUser)
                    console.log('Completed register')
                }
            }
        } catch (err) {
            console.log('Fail to register')
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }))
    }

    return (
        <div>
            <div>Register</div>
            <div>
                <input type="email"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <input type="text"
                    placeholder="fullname"
                    name="fullname"
                    value={user.fullname}
                    onChange={handleChange}
                />
                <input type="text"
                    placeholder="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <input type="password"
                    placeholder="Password"
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                />
                <input type="phone"
                    placeholder="phone"
                    name='phone'
                    value={user.phone}
                    onChange={handleChange}
                />
                <button onClick={signUp}>Register</button>
            </div>
        </div>
    )
}

export default Register