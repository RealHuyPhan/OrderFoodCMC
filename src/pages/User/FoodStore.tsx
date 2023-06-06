import HeadNav from '../../common/HeadNav'
import defaultFood from '../../assets/default_food_img.png'
import defaultStore from '../../assets/defaultFoodStore.png'
import { FaMoneyBillWave } from 'react-icons/fa'
import SmallSizeSearch from '../../common/SmallSizeSearch'

export default function FoodStore() {
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
                            <h2 className='font-semibold text-3xl my-1'>Quán trà sữa của PI</h2>
                            <p>8 Ng. 66 Đ.Hồ Tùng Mậu, P.Mai Dịch, Cầu Giấy, Hà Nội</p>
                            <div className='my-3'>Component reate star</div>
                            <div className='flex'>
                                <FaMoneyBillWave className="text-3xl text-blue-600" />
                                <p className='ml-3'>: 30.000 vnđ to 120.000 vnđ</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold ml-5 mt-5'>Các món ăn trong cửa hàng:</h2>
                        <SmallSizeSearch placeholder='Tìm kiếm' width={200}></SmallSizeSearch>

                    </div>
                </div>
            </div>
            <div className='mt-5 grid grid-cols-3 gap-7 mx-5'>
                <div className='flex border-[1px] h-24 items-center'>
                    <div className='ml-3'>
                        <img src={defaultFood} alt="No Food img founded" className='w-16 h-16' />
                    </div>
                    <div className='ml-5'>
                        <h3 className='font-medium text-lg'>Quán trà sửa của PI</h3>
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
