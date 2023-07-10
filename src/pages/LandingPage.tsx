import HeadNav from "../common/HeadNav";
import bg_top from "../assets/bg_top.png";
import food_top from "../assets/food_top.png";
import PrimaryButton from "../common/PrimaryButton";
import option1 from "../assets/option1.png";
import option2 from "../assets/option2.png";
import option3 from "../assets/option3.png";
import bg_bottom from "../assets/bg_bottom_img.png";
import footer from "../assets/footer.png";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";
import { GiNoodles } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import defaultImg from "../assets/defaultFoodStore.png";
import { IOrder } from "./User/type";
import { useState, useEffect } from "react";
import axios from "axios";

function LandingPage() {
  const [orders, setOrders] = useState<IOrder>();

  const getData = JSON.parse(localStorage.getItem("user") || "{}");
  const jwt = getData.jwt;
  const navigate = useNavigate();
  const handleOrder = () => {
    navigate("/orders");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (jwt) {
      const getOrders = () => {
        axios
          .get(`http://localhost:1337/api/orders?populate=*`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
          .then((res) => {
            setOrders(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getOrders();
    }
  }, [jwt]);

  return (
    <>
      <HeadNav />
      <div
        style={{ backgroundImage: `url(${bg_top})` }}
        className="mt-[80px] bg-no-repeat bg-cover bg-center"
      >
        <div className="w-full md:flex">
          <div className="md:flex relative w-full md:flex-wrap content-start">
            <div className="md:w-1/2 w-full h-full">
              <div className="w-full relative flex h-full items-center md:pl-9">
                <div className=" p-[30px] relative w-full flex-wrap z-10">
                  <div className="font-bold md:text-4xl text-xl ">
                    <div className="inline">
                      <label className="mt-1">
                        <span className="">Đặt cơm với chỉ vài nút click</span>
                        <span className="text-justify ml-2 text-white">
                          CMC Food Order
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="md:text-lg text-base my-2 text-white text-shadow-[0_2px_0px_var(--tw-shadow-color)] shadow-indigo-500/50">
                    Chỉ cần ngồi một chỗ, bạn có thể đặt cơm từ trước mà không
                    cần phải hỏi: Hôm nay ăn gì?
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <PrimaryButton
                      width={105}
                      height={33}
                      fontWeight={700}
                      fontsize={14}
                      onClick={handleOrder}
                    >
                      Đặt cơm ngay
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-0 collapse md:visible">
              <div className="md:w-full md:relative md:flex">
                <div className="md:content-center md:items-center md:flex md:p-[10px] md:relative md:w-full md:flex-wrap">
                  <img
                    src={food_top}
                    alt=""
                    className="md:max-w-full md:h-auto "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {jwt ? (
        <div>
          <p className="font-bold text-2xl text-center mt-8">
            Đặt cơm ngày hôm nay
          </p>
          <div className="max-h-52 flex overflow-x-auto m-3 scrollbar-c-s-o scrollbar-ie-e-ff">
            {orders &&
              orders.map((order: IOrder) => (
                <Link
                  to={`/orders/${order.id}`}
                  key={order.id}
                  className="min-w-[230px] h-[150px] text-center bg-pink-500 mx-[2px] textOverImage"
                  data-title={order.attributes.title}
                  data-text={order.attributes.createdAt}
                >
                  <img src={defaultImg} alt="" className="w-full h-full" />
                </Link>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div className="py-2 md:px-0 md:mt-16 px-7">
            {/* Sửa trang giữa từ dòng py-2 */}
            <div>
              <div className="flex items-center justify-center">
                <p className="text-[#FFCB45] text-lg">
                  Chúng tôi hoạt động ra sao
                </p>
              </div>
              <div className="flex items-center justify-center mt-2 mb-5">
                <p className="font-extrabold text-xl">What We Serve</p>
              </div>
              <div className="flex items-center justify-center w-full">
                <div className=" md:w-1/2 flex items-center justify-center text-center">
                  <p className="text-slate-600 text-lg font-bold">
                    Chúng tôi sẽ cập nhật các cửa hàng và đồ ăn hàng ngày, ai
                    cũng có thể vote để chọn đồ ăn, tránh ăn những đồ ăn mà mình
                    không thích trong hôm đó.
                  </p>
                </div>
              </div>
              <div className="flex md:flex-row md:flex-wrap w-full flex-col gap-5 mt-9">
                <div className="md:flex-[30%] w-full flex-1">
                  <div className="flex items-center justify-center">
                    <img src={option1} alt="option" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-2xl my-4">
                      Dễ dàng chọn lựa
                    </h3>
                    <p className="text-base text-slate-600 font-semibold">
                      Cửa hàng và đồ ăn sẽ được cập nhật hàng ngày
                    </p>
                  </div>
                </div>
                <div className="md:flex-[30%] w-full flex-1">
                  <div className="flex items-center justify-center">
                    <img src={option2} alt="option" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-2xl my-4">
                      Tiết kiệm thời gian
                    </h3>
                    <p className="text-base text-slate-600 font-semibold">
                      Bạn có thể đặt đồ ăn cho ngày hôm sau bất cứ lúc nào
                    </p>
                  </div>
                </div>
                <div className="md:flex-[30%] w-full flex-1">
                  <div className="flex items-center justify-center">
                    <img src={option3} alt="option" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-2xl my-4">
                      Order thân thiện
                    </h3>
                    <p className="text-base text-slate-600 font-semibold">
                      Với những đồ ăn mà bạn không thích, bạn có thể rate sao để
                      tránh lần sau order lại những món đó
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div
              style={{ backgroundImage: `url(${bg_bottom})` }}
              className="mt-20 bg-no-repeat bg-cover bg-center h-48 text-center"
            >
              <div className="flex justify-center items-center h-[60%]">
                <h3 className="font-extrabold text-2xl text-[#FFFFFF]">
                  Đăng nhập để sử dụng dịch vụ của chúng tôi
                </h3>
              </div>
              <div className="flex justify-center">
                <p className="text-[#FFFFFF] font-medium">
                  Bạn chưa có tài khoản?
                </p>
              </div>
              <div className="flex justify-center mt-1">
                <PrimaryButton
                  onClick={handleRegister}
                  width={105}
                  height={33}
                  fontWeight={700}
                  fontsize={14}
                >
                  Đăng ký ngay
                </PrimaryButton>
              </div>
            </div>
          </div>
        </>
      )}

      <footer
        style={{ backgroundImage: `url(${footer})` }}
        className="flex bg-no-repeat bg-cover bg-top mt-20  w-full"
      >
        <div className="md:mt-14 md:flex md:pb-8 pt-2 md:justify-stretch w-full px-7 text-shadow-[0_2px_0px_var(--tw-shadow-color)] shadow-indigo-500/50">
          <div className="md:px-2">
            <h3 className="text-2xl font-bold mb-4 flex gap-2 items-center justify-center md:justify-normal">
              <div>Đặt cơm CMC</div>
              <GiNoodles className="text-[#FAA41A] text-3xl" />
            </h3>
            <p className="hidden md:block text-white text-lg ">
              Web đặt cơm dành cho mọi thành viên của gia đình CMC
            </p>
            <div className="flex my-5 gap-6 justify-center md:justify-normal">
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

          <div className="w-full border-[1px]  md:hidden"></div>

          <div className="md:px-2">
            <h3 className=" text-black text-2xl font-bold  my-5 md:mb-4 md:mt-0 ">
              Hợp tác với
            </h3>
            <div className="text-white text-lg font-sans">
              <p>Nguyễn Chí Tiến</p>
              <br className="hidden md:block" />
              <p>Nguyễn Văn Hải</p>
              <br className="hidden md:block" />
              <p>CMC</p>
            </div>
          </div>

          <div className="md:px-2">
            <h3 className="text-black text-2xl font-bold  my-5 md:mb-4 md:mt-0">
              Điều khoản
            </h3>
            <div className="text-white text-lg font-sans">
              <p>FAQ</p>
              <br className="hidden md:block" />
              <p>Privacy</p>
              <br className="hidden md:block" />
              <p>Shipping</p>
            </div>
          </div>

          <div className="md:px-2">
            <h3 className="text-black text-2xl font-bold  my-5 md:mb-4 md:mt-0">
              Thực hiện bởi
            </h3>
            <div className="text-white text-lg font-sans">
              <p>Phan Sỹ Huy</p>
              <br className="hidden md:block" />
              <p>Thái Trung Hiếu</p>
              <br className="hidden md:block" />
            </div>
          </div>
          <div className="md:px-2">
            <h3 className="text-2xl text-black font-bold my-5 md:mb-4 md:mt-0">
              Liên hệ
            </h3>
            <div className="text-white text-lg font-sans">
              <p>huyphansy226@gmail.com</p>
              <br className="hidden md:block" />
              <p>trunghieu140299@gmail.com</p>
              <br className="hidden md:block" />
              <p className="mb-5">SĐT:084 385 107 196</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;