import { BiCookie } from 'react-icons/bi'

export default function HeadNav() {
    return (
        <div className="bg-white fixed top-0 right-0 left-0 flex justify-around h-20 shadow-md">
            <div className='text-2xl font-semibold flex items-center gap-2'>
                <BiCookie />
                <button>Đặt cơm CMC</button>
            </div>
            <div className="flex items-center gap-4 font-medium">
                <button>
                    Trang chủ
                </button>
                <button>
                    Tất cả đơn hàng
                </button>
                <button>
                    Đồ ăn
                </button>
                <button>
                    Cửa hàng
                </button>
                <button>
                    Đồ đã đặt
                </button>
                <button>
                    Profile
                </button>
                <button>
                    Giỏ hàng
                </button>
            </div>
        </div>
    )
}
