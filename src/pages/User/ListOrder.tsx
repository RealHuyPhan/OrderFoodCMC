import { useEffect, useState } from 'react'
import defaultImg from '../../assets/defaultAva.png'
import { IFood } from './type'
import axios from 'axios'
import PrimaryButton from '../../common/PrimaryButton'

export default function ListOrder({ storeId }: { storeId: number }) {
    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    let decrementCounter = () => setCounter(counter - 1);
    if (counter <= 0) {
        decrementCounter = () => setCounter(1);
    }

    const [food, setFood] = useState<IFood>()
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;

    const [isGetData, setIsGetData] = useState(true)

    const getFood = () => {
        axios.get(`http://localhost:1337/api/stores/${storeId}?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => {
            setFood(res.data.data as IFood)
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsGetData(false)
        })
    }

    useEffect(() => {
        getFood();
    }, [jwt, storeId])

    if (isGetData) {
        return <p>Loading...</p>
    }

    if (!food) {
        return <p>404 not found</p>
    }

    return (
        <div className='h-[480px] border-[1px] overflow-y-scroll'>
            <h1 className='text-center font-medium text-xl'>Chi tiết đơn đặt</h1>
            {food && food.attributes.foods.data.map((food: any) => (
                <div key={food.id} className='flex mt-4'>
                    <img src={food ? food.attributes.foodimages : defaultImg} alt="" className='w-32 ml-8' />
                    <div className='items-center w-full ml-5'>
                        <div>
                            <label className='font-bold text-lg'>{food.attributes.foodName}</label>
                            <p className='font-light text-sm'>Price: {food.attributes.price}</p>
                        </div>
                        <div className='my-4 flex items-center'>
                            <button onClick={decrementCounter} className='border-[1px] border-solid w-6 h-6 font-bold'>
                                -
                            </button>
                            <input value={counter} type="number" className='border-[1px] border-solid w-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                            <button onClick={incrementCounter} className='border-[1px] border-solid w-6 h-6 font-bold mr-3'>
                                +
                            </button>
                            <PrimaryButton height={30} width={70} fontsize={14} fontWeight={500}>Đặt hàng</PrimaryButton>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
