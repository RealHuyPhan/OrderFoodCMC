import axios from "axios";
import { useState, ChangeEvent } from "react";

import { Link } from "react-router-dom";

export default function RegisterForm() {
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
        <div className="m-0 p-0 bg-black flex justify-center">
            <div className="w-[400px] h-[1000px] mt-14 mb-10 bg-white flex flex-col items-center justify-center">
                <img className="w-2/3 " src="src\assets\cmc.png" alt="" />

                <div className="w-4/5 h-1/2 mt-4 ">
                    <div className="w-full h-4/5 flex flex-col">
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex">
                                <p className="text-[14px] font-normal">Họ và tên</p>
                                <p className="text-red-500">*</p>
                            </div>
                            <div className="w-full flex h-11 ">
                                <div className="flex items-center w-full h-full border-[1px] justify-center">
                                    <div className="flex w-11/12 h-full items-center ">
                                        <input
                                            type="text"
                                            placeholder="Full name"
                                            name="fullname"
                                            value={user.fullname}
                                            onChange={handleChange}
                                            className="w-full border-none focus:outline-0 "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex">
                                <p className="text-[14px] font-normal">Email</p>
                                <p className="text-red-500">*</p>
                            </div>
                            <div className="w-full flex h-11 ">
                                <div className="flex items-center w-full h-full border-[1px] justify-center">
                                    <div className="flex w-11/12 h-full items-center ">
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder="Email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className="w-full border-none focus:outline-0 "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex">
                                <p className="text-[14px] font-normal">Số điện thoại</p>
                                <p className="text-red-500">*</p>
                            </div>
                            <div className="w-full flex h-11 ">
                                <div className="flex items-center w-full h-full border-[1px] justify-center">
                                    <div className="flex w-11/12 h-full items-center ">
                                        <input
                                            type="phone"
                                            placeholder="phone"
                                            name='phone'
                                            value={user.phone}
                                            onChange={handleChange}
                                            className="w-full border-none focus:outline-0 "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex">
                                <p className="text-[14px] font-normal">Nhập tên đăng nhập</p>
                                <p className="text-red-500">*</p>
                            </div>
                            <div className="w-full flex h-11 ">
                                <div className="flex items-center w-full h-full border-[1px] justify-center">
                                    <div className="flex w-11/12 h-full items-center ">
                                        <input
                                            type="text"
                                            placeholder="User name"
                                            name="username"
                                            value={user.username}
                                            onChange={handleChange}
                                            className="w-full border-none focus:outline-0 "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex">
                                <p className="text-[14px] font-normal">Nhập mật khẩu</p>
                                <p className="text-red-500">*</p>
                            </div>
                            <div className="w-full flex h-11 ">
                                <div className="flex items-center w-full h-full border-[1px] justify-center">
                                    <div className="flex w-11/12 h-full items-center ">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name='password'
                                            value={user.password}
                                            onChange={handleChange}
                                            className="w-full border-none focus:outline-0 "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex">
                                <p className="text-[14px] font-normal">Xác nhận mật khẩu</p>
                                <p className="text-red-500">*</p>
                            </div>
                            <div className="w-full flex h-11 ">
                                <div className="flex items-center w-full h-full border-[1px] justify-center">
                                    <div className="flex w-11/12 h-full items-center ">
                                        <input
                                            type="password"
                                            placeholder="Confirm password"
                                            className="w-full border-none focus:outline-0 "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex h-1/5">
                        <div className="w-1/12 flex items-center">
                            <input type="checkbox" />                        </div>
                        <div className="flex justify-center items-center ">
                            <p className="">Đồng ý với</p>
                            <p className="text-[rgb(0,103,213)]">Điều khoản dịch vụ</p>
                        </div>
                    </div>
                </div>

                <div className="w-4/5 h-1/4 flex items-center">
                    <div className="w-full h-2/3 flex flex-col">
                        <div className="flex-1 flex items-start">
                            <button onClick={signUp} style={{ fontSize: `${24}px`, fontWeight: `${32}` }}
                                className="w-full h-1/2 rounded bg-[rgb(0,103,213)] text-white ">
                                Đăng ký
                            </button>
                        </div>
                        <div className="flex-1 flex justify-center items-start">
                            <div className="w-2/3 h-2/4 flex justify-center items-center ">
                                <p>Đã có tài khoản?</p>
                                <Link to={'/'} className="text-[rgb(0,103,213)]">Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}