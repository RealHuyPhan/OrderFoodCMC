import HeadNav from '../common/HeadNav'
import defaultFood from '../assets/default_food_img.png'
import BigSizeSearch from '../common/BigSizeSearch'

export default function ListFood() {
    return (
        <div>
            <HeadNav />
            <div className='mt-28 relative'>
                <div className='w-full'>
                    <h1 className='font-semibold text-4xl mb-7 flex items-center justify-center'>List cửa hàng</h1>
                    <BigSizeSearch placeholder='Tìm kiếm' width={1100}></BigSizeSearch>
                </div>
            </div>
            <div className='mt-10 grid grid-cols-3 gap-7 mx-5'>
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
