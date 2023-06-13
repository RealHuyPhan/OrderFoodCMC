import HeadNav from '../../common/HeadNav'
import defaultImg from '../../assets/defaultFoodStore.png'

export default function Orders() {
    return (
        <div>
            <HeadNav />
            <div className='mt-24 flex'>
                <div className='flex-1'>
                    <h1 className='text-center font-semibold text-xl'>Đơn tạo</h1>
                    <form className='flex mt-4'>
                        <img src={defaultImg} alt="" className='w-32 ml-8' />
                        <div className='items-center w-full ml-5'>
                            <div>
                                <label className='font-bold text-lg'>Đơn hàng ngày 22/6</label>
                                <p className='font-light text-sm'>Đã khởi tạo từ ngày: 20/6</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='flex-1'>
                    <h1 className='text-center font-medium text-xl'>Chi tiết đơn đặt</h1>
                    <form>

                    </form>
                </div>
            </div>
        </div>
    )
}
