import { useState, useEffect } from 'react';
import HeadNav from '../../common/HeadNav'
import defaultFood from '../../assets/default_food_img.png'
import axios from 'axios';
import { format, parseISO } from "date-fns";


export default function Histories() {
    const [histories, setHistories] = useState<[]>([])
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;
    const userId = getData.id

    useEffect(() => {
        const getHistoryOrders = () => {
            axios.get(`http://localhost:1337/api/users/${userId}?populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }).then((res) => {
                setHistories(res.data.order_items)
            }).catch((err) => {
                console.log(err)
            })
        }
        getHistoryOrders()
    }, [jwt, userId])

    return (
        <div>
            <HeadNav />
            <div className='mt-28 relative'>
                <div className='w-full'>
                    <h1 className='font-semibold text-4xl mb-7 flex items-center justify-center'>Đơn hàng</h1>
                    <div className='flex items-center'>
                        <h2 className='font-semibold ml-5'></h2>
                    </div>
                </div>
            </div>
            <div className='mt-5 grid grid-cols-3 gap-7 mx-5'>
                {histories && histories.map((history) => (
                    <div key={history.id} className='flex border-[1px] h-24 items-center'>
                        <div className='ml-3'>
                            <img src={defaultFood} alt="No Food img founded" className='w-16 h-16' />
                        </div>
                        <div className='ml-5'>
                            <h3 className='font-medium text-lg'>{history.note ? history.note : "Note"}</h3>
                            <p className='text-xs'>{history.quantity}</p>
                            <p className='text-xs'>{format(
                                parseISO(history.publishedAt),
                                "MMMM dd, yyyy"
                            )}</p>
                            <div>
                                Component star rate
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
