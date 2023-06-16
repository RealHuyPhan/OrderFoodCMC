import HeadNav from '../../common/HeadNav'
import defaultStore from '../../assets/defaultFoodStore.png'
import { FaMoneyBillWave } from 'react-icons/fa'
// import PrimaryButton from '../../common/PrimaryButton'
// import { useParams } from 'react-router-dom'
import defaultAva from '../../assets/defaultAva.png'


export default function Foods() {
    // const { id } = useParams();

    const handleOrder = () => {
        console.log('Order')
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
                        <form className='flex-1'>
                            <h2 className='font-semibold text-3xl my-1'>Combo Kimbap chiên và 1 gà rán</h2>
                            <p>Combo gồm 12 miếng kimbap chiên và 1 gà rán (Tùy chọn đùi hoặc cánh..)</p>
                            <div className='my-3'>Component reate star</div>
                            <div className='flex'>
                                <FaMoneyBillWave className="text-3xl text-blue-600" />
                                <p className='ml-3'>: 72 000vnđ</p>
                            </div>

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
            </div>
        </div>
    )
}
