import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import HeadNav from "../../common/HeadNav";
import axios from 'axios';
import { IFood, IOrder, IStore } from './type';
import defaultImg from '../../assets/defaultFoodStore.png'
import { FaMoneyBillWave, FaUserAlt } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import cmclogo from "../../assets/cmc.png"
import PrimaryButton from '../../common/PrimaryButton';


function OrderDetail() {
    const [modal, setModal] = useState(false);
    const [foodSelected, setFoodSelected] = useState();
    const [order, setOrder] = useState<IOrder>()
    const [store, setStore] = useState<IStore>();
    const [food, setFood] = useState<IFood>();
    const { id } = useParams();
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;


    useEffect(() => {

        axios.get(`http://localhost:1337/api/orders/${id}?populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        ).then((res) => {
            setOrder(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

        axios.get(`http://localhost:1337/api/stores/${order?.attributes.store.data.id}?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => {
            setStore(res.data.data)

        }).catch((err) => {
            console.log(err)
        })


        axios.get(`http://localhost:1337/api/foods/${foodSelected}?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => {
            setFood(res.data.data)

        }).catch((err) => {
            console.log(err)
        })

    }, [foodSelected, id, jwt, order?.attributes.store.data.id])

    const toggleModal = () => {
        setModal(!modal)
    }

    if (modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal")
    }



    return (
        <>
            <HeadNav />
            <div className="mt-20">
                <h1 className='w-full text-center font-bold text-3xl pt-4'>{order?.attributes.title}</h1>
                <div className='mt-10 relative'>
                    <div className='w-full'>
                        <div className='flex'>
                            <div className='flex-1 justify-center flex'>
                                <img src={defaultImg} alt="" className='w-96' />
                            </div>
                            <form className='flex-1'>
                                <h2 className='font-semibold text-3xl my-1'>{store?.attributes.storeName}</h2>
                                <div className='my-3'>Component reate star</div>
                                <div className='flex'>
                                    <FaMoneyBillWave className="text-3xl text-blue-600" />
                                    <p className='ml-3'>: 72 000vnđ</p>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className='ml-20 mt-10 flex items-center font-bold text-lg'>Xem thêm các món ăn</div>
                    <div className='mt-5 grid grid-cols-3 gap-7 mx-5'>
                        {
                            store && store?.attributes.foods.data.map((food) => (
                                <button onClick={() => {
                                    toggleModal();
                                    setFoodSelected(food.id)
                                }} key={food.id} className='flex border-[1px] h-24 items-center'>
                                    <div className='ml-3'>
                                        <img src={defaultImg} alt="No Food img founded" className='w-16 h-16' />
                                    </div>
                                    <div className='ml-5'>
                                        <h3 className='font-medium text-lg'>{food.attributes.foodName}</h3>
                                        <p className='text-xs'>{food.attributes.price} vnd</p>
                                        <div>
                                            Component star reate
                                        </div>
                                    </div>
                                </button>
                            ))
                        }
                        {modal && (
                            <div className="modal">
                                <div className="overlay">
                                    <div className="modal-content">
                                        <div className='mb-3'>
                                            Chi tiết sản phẩm
                                        </div>
                                        <button className="close-modal" onClick={toggleModal}>
                                            <AiFillCloseCircle />
                                        </button>

                                        {food &&
                                            <div className='flex'>
                                                <div className='flex'>
                                                    <img src={defaultImg} alt="" className=' h-36 mr-4' />
                                                </div>
                                                <div className='flex-1 '>
                                                    <h3 className='font-bold text-2xl'>{food.attributes.foodName}</h3>
                                                    <p className='text-lg'>{food.attributes.price} vnđ</p>
                                                    <p className='my-2'>Component Star rate</p>
                                                    <PrimaryButton
                                                        height={35}
                                                        width={75}
                                                        fontsize={14}
                                                        fontWeight={700}
                                                        onClick={
                                                            () => alert('123')
                                                        }
                                                    >
                                                        Đặt hàng
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        }

                                        <h2 className='font-semibold my-1'>
                                            Bình luận
                                        </h2>
                                        <div className='w-full'>
                                            <textarea placeholder='Thêm bình luận' className='w-full focus:outline-none px-3 pt-1 rounded-md' />
                                            <div className='flex w-full justify-end'>
                                                <button className='bg-blue-400 items-center flex w-20 justify-center font-bold text-sm h-7 rounded-md'>
                                                    Bình luận
                                                </button>
                                            </div>
                                        </div>
                                        <h2 className="my-1 font text-gray-500">Tất cả bình luận</h2>
                                        <div className='h-36 overflow-hidden overflow-y-scroll'>
                                            <div className='flex items-center mb-5'>
                                                <img src={defaultImg} alt="" className='w-14 h-14' />
                                                <div className="ml-4">
                                                    <h3 className='font-semibold'>username</h3>
                                                    <p className='text-sm'>Bình luận 1 mang tính chất bình luận 1 ở bình luận 1 xem bình luận 1</p>
                                                    <div className='flex gap-2'>
                                                        <img src={defaultImg} alt="" className='w-16' />
                                                        <img src={defaultImg} alt="" className='w-16' />
                                                        <img src={defaultImg} alt="" className='w-16' />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default OrderDetail