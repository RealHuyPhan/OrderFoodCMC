import HeadNav from '../../common/HeadNav'
import defaultImg from '../../assets/defaultFoodStore.png'
import { useEffect, useState } from 'react'
import { IOrder } from './type'
import axios from 'axios';
import ListOrder from './ListOrder';

export default function Orders() {
    const [orders, setOrders] = useState<IOrder>();
    const [storeSelected, setStoreSelected] = useState();
    const [orderId, setOrderId] = useState();

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
        <div>
            <HeadNav />
            <div className='mt-24 flex'>
                <div className='flex-1'>
                    <h1 className='text-center font-semibold text-xl'>Đơn tạo</h1>
                    {orders && orders.map((order: IOrder) => (
                        <form onClick={() => {
                            setStoreSelected(order.attributes.store.data.id)
                        }} key={order.id} className='flex mt-4 cursor-pointer'>
                            <img src={defaultImg} alt="" className='w-32 ml-8' />
                            <div className='items-center w-full ml-5'>
                                <div>
                                    <label className='font-bold text-lg'>{order.attributes.title}</label>
                                    <p className='font-light text-sm'>Đã khởi tạo từ ngày: {order.attributes.createdAt}</p>
                                </div>
                            </div>
                        </form>
                    ))
                    }

                </div>
                <div className='flex-1'>
                    <ListOrder storeId={storeSelected} />
                </div>
            </div>
        </div>
    )
}
