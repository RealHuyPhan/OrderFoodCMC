import { useEffect, useState } from 'react'
import defaultImg from '../../assets/defaultAva.png'
import { IFood } from './type'
import axios from 'axios'
import PrimaryButton from '../../common/PrimaryButton'


export default function ListOrder({ storeId }: { storeId: number, }) {

    const [food, setFood] = useState<IFood>()
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;
    const user = getData.user
    const [isGetData, setIsGetData] = useState(true);

    const [cart, setCart] = useState()


    const handleOrderItem = (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                // note,
                user: user,
                food: food?.id

            })
        );
        fetch(`http://localhost:1337/api/order-items`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: formData
            }
        )
    }

    const getFood = () => {
        axios.get(`http://localhost:1337/api/stores/${storeId}?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => {
            setFood(res.data.data as IFood)
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

    const addToCart = (food) => {
        setCart(food)
    }

    // const removeFromCart = (food) => {
    //     let hardCopy = [...cart];
    //     hardCopy = hardCopy.filter((cartItem => cartItem.id !== food.id))
    //     setCart(hardCopy)
    // }


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
                            {/* <button value="remove"
                                // onClick={() => removeFromCart(food)} 
                                className='border-[1px] border-solid w-6 h-6 font-bold'>
                                -
                            </button>
                            <input type='number' className='border-[1px] border-solid w-10 flex justify-center'
                            />
                            <button onClick={() => increaseCount()} className='border-[1px] border-solid w-6 h-6 font-bold mr-3'>
                                +
                            </button> */}
                            <PrimaryButton
                                height={30}
                                width={70}
                                fontsize={14}
                                fontWeight={500}
                                onClick={() => addToCart(food.id)}

                            >
                                Đặt hàng
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
