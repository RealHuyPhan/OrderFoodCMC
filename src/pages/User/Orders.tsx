import HeadNav from '../../common/HeadNav'
import defaultImg from '../../assets/defaultFoodStore.png'
import { useEffect, useState } from 'react'
import { IOrder } from './type'
import axios from 'axios';
import ListOrder from './ListOrder';
import { Link } from 'react-router-dom';

export default function Orders() {
    const [orders, setOrders] = useState<IOrder | undefined>();
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;

    useEffect(() => {
        const getOrder = () => {
            axios.get(`http://localhost:1337/api/orders?populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((res) => {
                setOrders(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        getOrder();
    }, [jwt])

    return (
        <>
            <HeadNav />
            <div className='mt-20'>
                <h2 className='font-bold text-center text-2xl pt-3 '>Đơn đã tạo</h2>
                <div className='mb-3 mx-6'>
                    <div className='flex flex-wrap mx-[-5px]'>
                        {orders && orders.map((order: IOrder) => (
                            <div key={order.id} className='px-[5px] w-1/4'>
                                <Link to={`${order.id}`} className='block relative mt-3 bg-white rounded-sm shadow-md'>
                                    <img src={defaultImg} alt="" className='bg-no-repeat bg-contain bg-center border-x-2' />
                                    <h4 className='text-1xl font-bold m-2 overflow-hidden '>
                                        {order.attributes.title}
                                    </h4>
                                    <p className='text-base font-normal m-2 overflow-hidden'>
                                        Đã khởi tạo từ ngày: {order.attributes.createdAt}
                                    </p>
                                </Link>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
