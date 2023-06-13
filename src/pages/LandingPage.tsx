import HeadNav from "../common/HeadNav"
import bg_top from '../assets/bg_top.png'
import food_top from '../assets/food_top.png'
import PrimaryButton from "../common/PrimaryButton"
import option1 from '../assets/option1.png'
import option2 from '../assets/option2.png'
import option3 from '../assets/option3.png'
import bg_bottom from '../assets/bg_bottom_img.png'
import footer from '../assets/footer.png'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { RiFacebookFill } from 'react-icons/ri'
import { GiNoodles } from 'react-icons/gi'



function LandingPage() {
    const handleClick = () => {
        console.log("Clicked")
    }
    return (
        <>
            <HeadNav />
            <div style={{ backgroundImage: `url(${bg_top})` }} className="mt-20 bg-no-repeat bg-cover bg-center">
                <div className="w-full flex">
                    <div className="w-full relative min-h-[1px] flex">
                        <div className="w-full relative flex">
                            <div className="flex relative w-full flex-wrap content-start">
                                <div className="w-1/2">
                                    <div className="w-full relative flex h-full items-center pl-9">
                                        <div className=" p-[30px] relative w-full flex-wrap">
                                            <div className="font-bold text-4xl">
                                                <div className="inline">
                                                    <label className="mt-1">
                                                        <span className="">
                                                            Đặt cơm với chỉ vài nút click
                                                        </span>
                                                        <span className="text-justify ml-2 text-white">
                                                            CMC Food Order
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="text-white font-extralight text-lg my-2">
                                                Chỉ cần ngồi một chỗ, bạn có thể đặt cơm từ trước mà không cần phải hỏi: Hôm nay ăn gì?
                                            </div>
                                            <div>
                                                <PrimaryButton
                                                    width={105}
                                                    height={33}
                                                    fontWeight={700}
                                                    fontsize={14}
                                                    onClick={handleClick}>
                                                    Đặt cơm ngay
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="w-full relative flex">
                                        <div className="content-center items-center flex p-[10px] relative w-full flex-wrap">
                                            <img src={food_top} alt="" className="max-w-full h-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 px-7">
                <div>
                    <div className="flex items-center justify-center">
                        <p className="text-[#FFCB45]">
                            Chung tôi hoạt động ra sao
                        </p>
                    </div>
                    <div className="flex items-center justify-center mt-2 mb-5">
                        <p className="font-extrabold text-xl">What We Serve</p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <div className="w-1/2 flex items-center justify-center text-center">
                            <p className="text-slate-600">Chúng tôi sẽ cập nhật các cửa hàng và đồ ăn hàng ngày, ai cũng có thể
                                vote để chọn đồ ăn, tránh ăn những đồ ăn mà mình không thích trong hôm đó.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap w-full gap-5  mt-9">
                        <div className="flex-[30%]">
                            <div className="flex items-center justify-center">
                                <img src={option1} alt="option" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-2xl my-4">Dễ dàng chọn lựa</h3>
                                <p className="text-sm text-slate-600">Cửa hàng và đồ ăn sẽ được cập nhật hàng ngày</p>
                            </div>
                        </div>
                        <div className="flex-[30%]">
                            <div className="flex items-center justify-center">
                                <img src={option2} alt="option" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-2xl my-4">Tiết kiệm thời gian</h3>
                                <p className="text-sm text-slate-600">Bạn có thể đặt đồ ăn cho ngày hôm sau bất cứ lúc nào</p>
                            </div>
                        </div>
                        <div className="flex-[30%]">
                            <div className="flex items-center justify-center">
                                <img src={option3} alt="option" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-2xl my-4">Order thân thiện</h3>
                                <p className="text-sm text-slate-600">Với những đồ ăn mà bạn không thích, bạn có thể rate sao để tránh lần sau order lại những món đó</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div style={{ backgroundImage: `url(${bg_bottom})` }} className="mt-20 bg-no-repeat bg-cover bg-center h-48">
                    <div className="flex justify-center items-center h-[60%]">
                        <h3 className="font-extrabold text-2xl text-[#FFFFFF]">Đăng nhập để sử dụng dịch vụ của chúng tôi</h3>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-[#FFFFFF] font-medium">Bạn chưa có tài khoản?</p>
                    </div>
                    <div className="flex justify-center mt-1">
                        <PrimaryButton
                            width={105}
                            height={33}
                            fontWeight={700}
                            fontsize={14}
                            onClick={handleClick}>
                            Đăng ký ngay
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <footer style={{ backgroundImage: `url(${footer})` }} className="flex justify-around bg-no-repeat bg-cover bg-top mt-20 h-[300px] w-full">
                <div className="mt-20 flex justify-around w-full px-7">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 flex gap-2 items-center">
                            <div>Đặt cơm CMC</div>
                            <GiNoodles className="text-[#FAA41A] text-3xl"/>
                        </h3>
                        <p>Được thực hiện bởi 2 thành viên thực tập</p>
                        <div className="flex mt-5 gap-6">
                            <div className="rounded-full bg-white h-9 w-9 justify-center items-center flex">
                                <AiOutlineInstagram className="h-5 w-5" />
                            </div>
                            <div className="rounded-full bg-[#FFCB45] h-9 w-9 justify-center items-center flex">
                                <RiFacebookFill className="h-5 w-5" />
                            </div>
                            <div className="rounded-full bg-white h-9 w-9 justify-center items-center flex">
                                <AiOutlineTwitter className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Hợp tác với</h3>
                        <p>Nguyễn Chí Tiến</p>
                        <br />
                        <p>Nguyễn Văn Hải</p>
                        <br />
                        <p>CMC</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Điều khoản</h3>
                        <p>FAQ</p>
                        <br />
                        <p>Privacy</p>
                        <br />
                        <p>Shipping</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Liên hệ</h3>
                        <p className="mb-5">+84 385 107 196</p>
                        <p>huyphansy226@gmail.com</p>
                        <br />
                        <p>trunghieu140299@gmai.com</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default LandingPage