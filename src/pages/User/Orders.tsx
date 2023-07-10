import HeadNav from "../../common/HeadNav";
import defaultImg from "../../assets/defaultFoodStore.png";
import { useEffect, useState } from "react";
import { IOrder } from "./type";
import axios from "axios";
import { Link } from "react-router-dom";

//Import moment để format ngày tháng năm và giờ
import moment from "moment";

// Responsive phần Order ngày 4/7/2023
//Thêm điều kiện cho phần tiltle ngày 7/7/2023
export default function Orders() {
  const [orders, setOrders] = useState<IOrder | undefined>();
  const getData = JSON.parse(localStorage.getItem("user") || "{}");
  const jwt = getData.jwt;

  useEffect(() => {
    const getOrder = () => {
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
    getOrder();
  }, [jwt]);

  return (
    <>
      <HeadNav />
      <div className="mt-20 ">
        <h2 className="font-bold text-center text-2xl pt-3 ">Đơn đã tạo</h2>
        {/* Tạo responsive border cho danh sách đơn đã tạo */}
        <div className="bg-slate-200 border-[1px] px-6 md:border-none ">
          <div className="md:flex md:flex-wrap mx-[-5px] ">
            {orders &&
              orders.map((order: IOrder) => (
                <div
                  key={order.id}
                  className="px-[5px] py-2 w-full md:w-1/4  md:my-3"
                >
                  <Link
                    to={`${order.id}`}
                    className="relative bg-white rounded-md shadow-md flex md:block md:rounded-none "
                  >
                    <img
                      src={defaultImg}
                      alt=""
                      className="bg-no-repeat bg-contain bg-center md:border-x-2 h-32 w-32 md:h-auto md:w-auto rounded-lg md:rounded-none"
                    />
                    {/* Giới hạn 1 dòng cho các thẻ h4 và p */}
                    <div className="overflow-hidden whitespace-nowrap truncate">
                      <h4
                        title={order.attributes.title}
                        className="text-1xl font-bold m-2 overflow-hidden whitespace-nowrap truncate"
                      >
                        {order.attributes.title ? (
                          `${order.attributes.title}`
                        ) : (
                          <p className="text-slate-600">Null..</p>
                        )}
                      </h4>
                      <p
                        title={moment(order.attributes.createdAt).format("LLL")}
                        className="text-base font-normal m-2 overflow-hidden whitespace-nowrap truncate"
                      >
                        Đã khởi tạo từ ngày:{" "}
                        {moment(order.attributes.createdAt).format("LLL")}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
