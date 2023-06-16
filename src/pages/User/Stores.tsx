import HeadNav from '../../common/HeadNav'
import defaultStore from '../../assets/defaultFoodStore.png'
import { FaMoneyBillWave } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IStore } from './type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"

export default function Stores() {
    const [modal, setModal] = useState(false)
    const [store, setStore] = useState<IStore>();
    const { id } = useParams();
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;
    const personic = getData.id
    const [isGetData, setIsGetData] = useState(true)

    const successToast = () => {
        toast.success("Cập nhật thông tin Thành công", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };


    const [title, setTitle] = useState<string>();
    const handleSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                title,
                personic: personic,
                store: id
            })
        );

        fetch(`http://localhost:1337/api/orders`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: formData
            }
        ).then((res) => {
            successToast();
            toggleModal();

        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const getStore = () => {
            axios.get(`http://localhost:1337/api/stores/${id}?populate[0]=image&populate[1]=foods.foodImage`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((res) => {
                setStore(res.data.data as IStore)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsGetData(false)
            })
        }
        getStore()
    }, [jwt, id])

    if (isGetData) {
        return <p>Loading...</p>
    }

    if (!store) {
        return <p>404 not found</p>
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal");
    }


    return (
        <div>
            <HeadNav />
            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='mt-28 relative'>
                <div className='w-full'>
                    <div className='flex'>
                        <div className='flex-1 justify-center flex'>
                            <img src={defaultStore} alt="" className='w-96' />
                        </div>
                        <div className='flex-1'>
                            <h2 className='font-semibold text-3xl my-1'>{store.attributes.storeName}</h2>
                            <p>8 Ng. 66 Đ.Hồ Tùng Mậu, P.Mai Dịch, Cầu Giấy, Hà Nội</p>
                            <div className='my-3'>Component reate star</div>
                            <div className='flex'>
                                <FaMoneyBillWave className="text-3xl text-blue-600" />
                                <p className='ml-3'>: 30.000 vnđ to 120.000 vnđ</p>
                            </div>
                            <button onClick={toggleModal} className='underline'>Thêm cửa hàng vào đơn hàng</button>
                            {modal && (
                                <div className="modal">
                                    <div className="overlay">
                                        <div className="modal-content">
                                            <h2 className="flex justify-center items-center border-b-[2px] pb-2">
                                                Tạo đơn mới
                                            </h2>
                                            <form className='w-full' onSubmit={handleSubmit}>
                                                <div className='flex w-full justify-center'>
                                                    <input
                                                        type="text"
                                                        placeholder='Nhập tiêu đề..'
                                                        className='w-3/4 pl-3 focus:outline-none mt-2'
                                                        value={title}
                                                        name="title"
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                </div>
                                                <p className='mt-5'>Xác nhận thêm bánh mì ông gì đó vào cửa hàng</p>
                                                <div className='flex w-full justify-center '>
                                                    <button
                                                        type='submit'
                                                        className='mt-8 bg-blue-400 h-10 w-20 rounded-full'>
                                                        Xác nhận
                                                    </button>
                                                </div>

                                            </form>

                                            <button className="close-modal" onClick={toggleModal}>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className="flex justify-center"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <h2 className='font-semibold ml-5 mt-5'>Các món ăn trong cửa hàng:</h2>
                    </div>
                </div>
            </div>
            <div className='mt-5 grid grid-cols-3 gap-7 mx-5'>
                {store.attributes.foods.data.map(food => (
                    <Link to={`${food.id}`} key={food.id} className='flex border-[1px] h-24 items-center'>
                        <div className='ml-3'>
                            <img src={defaultStore} alt="No Food img founded" className='w-16 h-16' />
                        </div>
                        <div className='ml-5'>
                            <h3 className='font-medium text-lg'>{food.attributes.foodName}</h3>
                            <p className='text-xs'>Cách đây 0.6km</p>
                            <div>
                                Component star reate
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
