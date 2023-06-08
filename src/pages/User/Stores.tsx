import HeadNav from '../../common/HeadNav'
import defaultStore from '../../assets/defaultFoodStore.png'
import { FaMoneyBillWave } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IStore } from './type';


export default function Stores() {
    const [store, setStore] = useState<IStore>();
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;
    const [isGetData, setIsGetData] = useState(true)

    const { id } = useParams();

    const getStore = () => {
        axios.get(`http://localhost:1337/api/stores/${id}?populate[0]=image&populate[1]=foods.foodImage`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => {
            setStore(res.data.data as IStore)
            console.log(res.data.data,"check store")
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsGetData(false)
        })
    }


    useEffect(() => {
        getStore();
    }, [jwt, id])

    if (isGetData) {
        return <p>Loading...</p>
    }

    if (!store) {
        return <p>404 not found</p>
    }

    return (
        <div>
            <HeadNav />
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
                            <img src={food.attributes.foodImage ? `http://localhost:1337${food.attributes.foodImage.data[0].attributes.url}` : defaultStore} alt="No Food img founded" className='w-16 h-16' />
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
