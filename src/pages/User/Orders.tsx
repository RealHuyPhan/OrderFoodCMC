import HeadNav from '../../common/HeadNav'
import defaultFood from '../../assets/default_food_img.png'

export default function Orders() {
    return (
        <div>
            <HeadNav />
            <div className='mt-28 relative'>
                <div className='w-full'>
                    <h1 className='font-semibold text-4xl mb-7 flex items-center justify-center'>Tất cả các đơn hàng</h1>
                    <div className='flex items-center'>
                        <h2 className='font-semibold ml-5'>Tất cả các đơn hàng người dùng đã đặt</h2>
                    </div>
                </div>
            </div>
            <div className='mt-5 grid grid-cols-3 gap-7 mx-5'>
                <div className='flex border-[1px] h-24 items-center'>
                    <div className='ml-3'>
                        <img src={defaultFood} alt="No Food img founded" className='w-20 h-20' />
                    </div>
                    <div className='ml-5'>
                        <h3 className='font-medium text-lg'>Quán trà sửa của PI</h3>
                        <p className='text-xs'>Cách đây 0.6km</p>
                        <div>
                            Component star reate
                        </div>
                        <div className='flex'>
                          Đặt bởi: <p className='font-bold'> Nguyễn Chí Tiến</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
