import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import HeadNav from "../../common/HeadNav";
import axios from 'axios';
import { IOrder, IStore } from './type';
import defaultImg from '../../assets/defaultFoodStore.png'
import { FaMoneyBillWave } from 'react-icons/fa';


function OrderDetail() {
    const [order, setOrder] = useState<IOrder>()
    const [store, setStore] = useState<IStore>();
    const { id } = useParams();
    console.log(id, '123')
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;


    useEffect(() => {
        const getAll = () => {
            axios.get(`http://localhost:1337/api/orders/${id}?populate=*`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            ).then((res) => {
                setOrder(res.data.data)
                console.log(res.data.data, '1st?')
            }).catch((err) => {
                console.log(err)
            })

            axios.get(`http://localhost:1337/api/stores/${order?.attributes.store.data.id}?populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((res) => {
                setStore(res.data.data)
                console.log(res.data.data, '2nd:')
            }).catch((err) => {
                console.log(err)
            })
        }
        getAll();
    }, [id, jwt, order?.attributes.store.data.id])

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
                                <Link to={`/orders/${order?.id}/foods/${food.id}`} key={food.id} className='flex border-[1px] h-24 items-center'>
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
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail