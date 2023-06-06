import axios from "axios";
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { storeUser } from "../helper";

import { Link } from 'react-router-dom'
import { BiCookie } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import cmclogo from "../assets/cmclogo.png"
import { FaUserAlt } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'

export default function HeadNav() {
    const initialUser = { password: "", identifier: "" };
    const [user, setUser] = useState(initialUser);
    const [modal, setModal] = useState(false);

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


    // Button open modal
    const toggleModal = () => {
        setModal(!modal);
    }

    if (modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal")
    }



    return (
        <div className="bg-white fixed top-0 right-0 left-0 flex justify-around h-20 shadow-md z-20">
            <div className='text-2xl font-semibold flex items-center gap-2'>
                <BiCookie />
                <Link to={"/"}>Đặt cơm CMC</Link>
            </div>
            <div className="flex items-center gap-4 font-medium">
                <Link to={"/"}>
                    Trang chủ
                </Link>
                <Link to={'/list-order'}>
                    Tất cả đơn hàng
                </Link>
                <button>
                    Vote
                </button>
                <Link to={'/list-food'}>
                    Cửa hàng
                </Link>
                <Link to={'/profile'}>
                    Profile
                </Link>
                <Link to={'/history-order'}>
                    Giỏ hàng
                </Link>
                <button onClick={toggleModal}>
                    Đăng nhập
                </button>
                {modal && (
                    <div className="modal">
                        <div className="overlay">
                            <div className="modal-content">
                                <div className='flex justify-center'>
                                    <img src={cmclogo} alt="" className='h-36 w-80' />
                                </div>

                                <button className="close-modal" onClick={toggleModal}>
                                    <AiFillCloseCircle />
                                </button>
                                <div className='mt-8'>
                                    <p>Email</p>
                                    <div className='bg-white h-10 flex justify-center items-center'>
                                        <FaUserAlt className="ml-3" />
                                        <input type="text"
                                            placeholder='Email'
                                            className='w-full pl-3 focus:outline-none'
                                            name='identifier'
                                            value={user.identifier}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <p>Password</p>
                                    <div className='bg-white h-10 flex justify-center items-center'>
                                        <RiLockPasswordFill className="ml-3" />
                                        <input type="password"
                                            placeholder='Password'
                                            className='w-full pl-3 focus:outline-none'
                                            name='password'
                                            value={user.password}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center justify-between mt-3 w-full'>
                                        <div className='flex items-center gap-2'>
                                            <input type="checkbox" className='h-3 ' />
                                            <div>
                                                <p>Lưu tài khoản</p>
                                            </div>
                                        </div>
                                        <button>
                                            <p>Quên mật khẩu</p>
                                        </button>
                                    </div>
                                </div>
                                <div className='mt-10'>
                                    <button
                                        onClick={handleLogin}
                                        className='w-full h-10 items-center bg-[#1676F3]  flex justify-center'>
                                        Đăng nhập
                                    </button>
                                </div>
                                <div className='mt-8'>
                                    <div className='flex justify-center'>Chưa có tài khoản? <Link to={'/register'} className='text-[#1676F3] ml-1'>Đăng ký</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
