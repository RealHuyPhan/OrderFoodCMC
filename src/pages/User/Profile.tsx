import HeadNav from "../../common/HeadNav";
import defaultAva from "../../assets/defaultAva.png";
import { useEffect, useState } from "react";
import { IUser } from "./type";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

function Profile() {
    const [modal, setModal] = useState(false);
    const [profile, setProfile] = useState<IUser>();
    const getData = JSON.parse(localStorage.getItem("user") || "{}");
    const jwt = getData.jwt;
    const id = getData.id;
    const [isGetData, setIsGetData] = useState(true);
    const initialEdit = {
        fullName: undefined,
        dob: undefined,
        phone: undefined,
    };
    const [edit, setEdit] = useState(initialEdit);
    const navigate = useNavigate();

    const getProfile = () => {
        axios
            .get(`http://localhost:1337/api/users/${id}?populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res) => {
                setProfile(res.data as IUser);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsGetData(false);
            });
    };


    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }


    const editUser = async () => {
        const url = `http://localhost:1337/api/users/${id}`;
        try {
            if (edit.fullName || edit.dob || edit.phone) {
                const res = await axios.put(url, edit, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                if (res) {
                    setEdit(initialEdit);
                    navigate(-1);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleUserChange = ({ target }: any) => {
        const { name, value } = target;
        setEdit((currentEdit) => ({
            ...currentEdit,
            [name]: value,
        }));
    };

    useEffect(() => {
        getProfile();
        editUser();
    }, [jwt, id]);

    if (isGetData) {
        return <p>Loading...</p>;
    }

    if (!profile) {
        return <p>404 not found</p>;
    }

    return (
        <>
            <HeadNav />
            <div className="mt-20">
                <div className="bg-[#292B2F] h-36 flex">
                    <div className="flex items-center gap-6 ml-16">
                        <img src={defaultAva} alt="" className="h-20 w-20 rounded-full" />
                        <div>
                            <p className="text-white font-bold">Change Your Profile</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#17181A] h-full text-white">
                <div className="flex gap-14">
                    <div className="mt-3 flex gap-14 ml-16 ">
                        <p>{profile.username}</p>
                        <p>#User</p>
                    </div>
                </div>
                <div className="ml-16 font-light text-2xl mt-6">
                    <p>About me</p>
                </div>
                <div className="flex  mt-3">
                    <div className="flex-1">
                        <p className="font-bold text-center">User Info</p>
                        <div className="mt-4 ml-16">
                            <div>
                                <p>{profile.dob}</p>
                            </div>
                            <div>
                                <p>Full name: {profile.fullName}</p>
                            </div>
                            <div>Phone: +{profile.phone}</div>
                        </div>

                        <div className="mt-4 ml-16 flex justify-between">
                            <div>
                                <button className="border-[1px] hover:bg-white hover:text-black flex justify-center items-center  w-16" onClick={toggleModal}>Edit</button>
                            </div>
                            {modal && (
                                <div className="modal">
                                    <div className="overlay">
                                        <div className="modal-content w-2/3 h-2/3 bg-white">
                                            <div className="flex justify-center text-2xl  text-slate-950 mt-5 mb-5">
                                                Cập nhật thông tin tài khoản
                                            </div>

                                            <div className="flex flex-col w-full h-2/3">
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <div className="text-slate-950 ">Họ và tên</div>

                                                    <input
                                                        type="text"
                                                        className="w-full pl-2 h-8 text-slate-950"
                                                        placeholder="VD:Nguyễn Văn A..."
                                                        name="fullName"
                                                        value={edit.fullName}
                                                        onChange={handleUserChange}
                                                    />
                                                </div>

                                                <div className="flex-1 flex flex-col justify-center">
                                                    <div className="text-slate-950 ">Ngày sinh</div>
                                                    <input
                                                        type="date"
                                                        className="w-full pl-2 h-8 text-slate-950"
                                                        placeholder="VD:01/01/2001"
                                                        name="dob"
                                                        value={edit.dob}
                                                        onChange={handleUserChange}
                                                    />
                                                </div>

                                                <div className="flex-1 flex flex-col justify-center">
                                                    <div className="text-slate-950 ">Số điện thoại</div>
                                                    <input
                                                        type="number"
                                                        className="w-full pl-2 h-8 text-slate-950"
                                                        placeholder="VD:0123456789"
                                                        name="phone"
                                                        value={edit.phone}
                                                        onChange={handleUserChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-2 h-8  ">
                                                <button
                                                    onClick={editUser}
                                                    className="text-slate-950 w-20   border-[2px] h-full rounded-lg hover:bg-black bg-white hover:text-white"
                                                >
                                                    Lưu
                                                </button>
                                                <button onClick={toggleModal} className="text-slate-950 w-20  border-[2px] h-full rounded-lg hover bg-white hover:bg-black hover:text-white">
                                                    Trở lại
                                                </button>
                                            </div>

                                            <button className="close-modal text-black" onClick={() => toggleModal()}>
                                                <AiFillCloseCircle />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-center">Change Password</p>
                        <div>
                            <div>
                                <p>Change password</p>
                                <input
                                    type="text"
                                    placeholder="Enter your new password"
                                    className="mt-4 bg-transparent border-[1px] border-solid h-10 rounded-lg p-4"
                                />
                            </div>
                            <div className="mt-4">
                                <p>Change your QR</p>
                                {profile.qrcode && profile.qrcode.map((qr) => {
                                    return (
                                        <img
                                            key={qr.id}
                                            src={`http://localhost:1337${qr.url}`}
                                            alt="qr code"
                                            className="w-48 h-48 bg-white"
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-52"></div>
            </div>
        </>
    );
}

export default Profile;