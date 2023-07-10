import HeadNav from '../../common/HeadNav'
import defaultFood from '../../assets/default_food_img.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'

//Render giỏ hàng ngày 4/7/2023
//Setting kiểu dữ liệu cho IHistory
interface IHistory{
    map(arg0: (history: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    histories:{
        id: number
        "note":never;
        createdAt:Date;
    }[]

}

export default function Histories() {
    const [histories, setHistories] = useState<IHistory>()
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

    console.log(histories)


    return (
        <div>
            <HeadNav />
            <div className='mt-28 relative'>
                <div className='w-full'>
                    <h1 className='font-semibold text-4xl mb-7 flex items-center justify-center'>Đơn hàng</h1>
                    <div className='flex items-center'>
                        <h2 className='font-semibold ml-5'>Các đơn hàng bạn đã đặt:</h2>
                    </div>
                </div>
            </div>
            <div className='mt-5 grid grid-cols-3 gap-7 mx-5'>
                <div className='flex border-[1px] h-24 items-center'>
                    <div className='ml-3'>
                        <img src={defaultFood} alt="No Food img founded" className='w-16 h-16' />
                    </div>
                    <div className='ml-5'>
                        {histories &&
                            histories.map((history:any) =>(
                                    <div key={history.id} className='font-medium text-lg'>
                                        {history.note}
                                        <p className='text-sm'>
                                             Đã khởi tạo từ:{moment(history.createdAt).format('LLL')}
                                        </p>
                                    </div>
                                )
                            )
                        }
                        
                        <p className='text-xs'>Cách đây 0.6km</p>
                        <div>
                            Component star reate
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
