import HeadNav from '../../common/HeadNav'
import defaultStore from '../../assets/defaultFoodStore.png'
import { FaMoneyBillWave } from 'react-icons/fa'
import defaultAva from '../../assets/defaultAva.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function Foods() {
    const [detailFood, setDetailFood] = useState();
    const { id } = useParams()
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;
    const [isGetData, setIsGetData] = useState(true);

    


    useEffect(() => {
        const getDetailFood = () => {
            axios.get(`http://localhost:1337/api/foods/${id}?populate[0]=comments&populate[1]=comments.user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((res) => {
                setDetailFood(res.data.data)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsGetData(false)
            })
        }
        getDetailFood();
    }, [jwt, id])

    console.log(detailFood)

    if (isGetData) {
        return <p>Loading...</p>
    }

    if (!detailFood) {
        return <p>404 not found</p>
    }

    return (
        <div>
            <HeadNav />
            <div className='mt-28 relative'>
                <div className='w-full'>
                    {detailFood && <div className='flex'>
                        <div className='flex-1 justify-center flex'>
                            <img src={defaultStore} alt="" className='w-96' />
                        </div>
                        <form className='flex-1'>
                            <h2 className='font-semibold text-3xl my-1'>{detailFood.attributes.foodName}</h2>
                            <p>{detailFood.attributes.description}</p>
                            <div className='my-3'>Component reate star</div>
                            <div className='flex'>
                                <FaMoneyBillWave className="text-3xl text-blue-600" />
                                <p className='ml-3'>: 72 000vnđ</p>
                            </div>

                        </form>
                    </div>
                    }
                </div>
                <div className='ml-20 mt-10 flex items-center font-bold text-lg'>Bình luận</div>
                <div>
                    <form>
                        <div className='float-left w-2/5 bg-blue-100 ml-20 rounded-md pl-3 pt-2'>
                            <textarea placeholder='Viết bình luận của bạn ở đây' className='bg-transparent w-full focus:outline-none' />
                        </div>
                    </form>
                    {
                        detailFood && detailFood.attributes.comments.data.map((comment: any) => (
                            <div key={comment.id} className='float-right w-2/5'>
                                <form className='flex mt-2'>
                                    <div>
                                        <img src={defaultAva} alt="Avatar" className='w-11 h-11 rounded-full shadow-xl' />
                                    </div>
                                    <div className='ml-4'>
                                        <div className='flex'>
                                            <p className='font-semibold'>
                                                {comment.attributes.user.data.attributes.username}
                                            </p>
                                        </div>
                                        <p>{comment.attributes.comment}</p>
                                    </div>
                                </form>
                                <div className='flex'>
                                    <img src={defaultStore} alt="" className='w-20 h-20 m-2' />
                                    <img src={defaultStore} alt="" className='w-20 h-20 m-2' />
                                    <img src={defaultStore} alt="" className='w-20 h-20 m-2' />
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
