import { Link } from 'react-router-dom'
import { BiCookie } from 'react-icons/bi'

export default function HeadNav() {
    return (
        <div className="bg-white fixed top-0 right-0 left-0 flex justify-around h-20 shadow-md z-20">
            <div className='text-2xl font-semibold flex items-center gap-2'>
                <BiCookie />
                <Link to={"/"}>Đặt cơm CMC</Link>
            </div>
            <div className="flex items-center gap-4 font-medium">
                <Link to={"/"}>
                    Trang chủ
                </Link>
                <Link to={'/list-order'}>
                    Tất cả đơn hàng
                </Link>
                <button>
                    Vote
                </button>
                <Link to={'/list-food'}>
                    Cửa hàng
                </Link>
                <Link to={'/profile'}>
                    Profile
                </Link>
                <Link to={'/history-order'}>
                    Giỏ hàng
                </Link>
                <button>
                    Đăng nhập
                </button>
            </div>
        </div>
    )
}
