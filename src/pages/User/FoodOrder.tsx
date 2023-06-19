import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeadNav from '../../common/HeadNav';
import defaultStore from '../../assets/defaultFoodStore.png'
import defaultAva from '../../assets/defaultAva.png'
import { FaMoneyBillWave } from 'react-icons/fa';
import { IFood } from './type';
import axios from 'axios';
import PrimaryButton from '../../common/PrimaryButton';



function FoodOrder() {
    const [food, setFood] = useState<IFood>();
    const { orderId, foodId } = useParams();
    console.log(orderId, 'order id')
    console.log(foodId, 'food id')
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;

    useEffect(() => {
        const getFood = () => {
            axios.get(`http://localhost:1337/api/foods/${foodId}?populate=*`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }).then((res) => {
                    setFood(res.data.data)
                }).catch((err) => {
                    console.log(err)
                })

        }

       
    }, [foodId, jwt])


    console.log('Food custom', food)


    return (
        <>
            <HeadNav />
            <aside className='mt-28 relative'>
                <div className='w-full'>
                    <div className='flex'>
                        <div className='flex-1 justify-center flex'>
                            <img src={defaultStore} alt="" className='w-96' />
                        </div>
                        <form className='flex-1'>
                            <h2 className='font-semibold text-3xl my-1'>{food?.attributes.foodName}</h2>
                            <p>{food?.attributes.description}</p>
                            <div className='my-3'>Component reate star</div>
                            <div className='flex mb-4'>
                                <FaMoneyBillWave className="text-3xl text-blue-600" />
                                <p className='ml-3'>: {food?.attributes.price} vnđ</p>
                            </div>
                            <PrimaryButton height={30} width={80} fontsize={14} fontWeight={700} onClick={() => alert("Ordered")}>
                                Đặt ngay
                            </PrimaryButton>

                        </form>
                    </div>
                </div>
                <div className='ml-20 mt-10 flex items-center font-bold text-lg'>Bình luận</div>
                <div>
                    <form>
                        <div className='float-left w-2/5 bg-blue-100 ml-20 rounded-md pl-3 pt-2'>
                            <textarea placeholder='Viết bình luận của bạn ở đây' className='bg-transparent w-full focus:outline-none' />
                        </div>
                    </form>
                    <div className='float-right w-2/5'>
                        <form className='flex mt-2'>
                            <div>
                                <img src={defaultAva} alt="Avatar" className='w-11 h-11 rounded-full shadow-xl' />
                            </div>
                            <div className='ml-4'>
                                <div className='flex'>
                                    <p>
                                        Username
                                    </p>
                                    Component star rate
                                </div>
                                <p>Bình luận này mang tính chất bình luận</p>
                            </div>
                        </form>
                        <div className='flex'>
                            <img src={defaultStore} alt="" className='w-20 h-20 m-2' />
                            <img src={defaultStore} alt="" className='w-20 h-20 m-2' />
                            <img src={defaultStore} alt="" className='w-20 h-20 m-2' />
                        </div>

                    </div>
                </div>
            </aside >
        </>
    )
}

export default FoodOrder