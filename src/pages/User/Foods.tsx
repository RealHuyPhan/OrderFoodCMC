import HeadNav from "../../common/HeadNav";
import defaultStore from "../../assets/defaultFoodStore.png";
import { FaMoneyBillWave } from "react-icons/fa";
import PrimaryButton from "../../common/PrimaryButton";
import { useParams } from "react-router-dom";
import defaultAva from "../../assets/defaultAva.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFood } from "./type";

export default function Foods() {
  const { id } = useParams();
  const [food, setFood] = useState<IFood>();
  const getData = JSON.parse(localStorage.getItem("user") || "{}");
  const jwt = getData.jwt;
  const [isGetData, setIsGetData] = useState(true);

  const getFood = () => {
    axios
      .get(`http://localhost:1337/api/foods/${id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setFood(res.data.data as IFood);
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsGetData(false);
      });
  };

  useEffect(() =>{
    getFood();
  },[jwt,id])

  if(isGetData) {
    return <p>Loading...</p>
  }

  if(!food) {
    return <p>404 not found</p>
  }


  const handleOrder = () => {
    console.log("Order");
  };
  return (
    <div>
      <HeadNav />
      <div className="mt-28 relative">
        <div className="w-full">
          <div className="flex">
            <div className="flex-1 justify-center flex">
              <img src={food.attributes.foodImage ? `http://localhost:1337${food.attributes.foodImage.data[0].attributes.url}` :defaultStore} alt="" className="w-96" />
            </div>
            <form className="flex-1">
              <h2 className="font-semibold text-3xl my-1">{food.attributes.foodName}
              </h2>
              <p>{food.attributes.description}</p>
              
              <div className="my-3">Component reate star</div>
              <div className="flex">
                <FaMoneyBillWave className="text-3xl text-blue-600" />
                <p className="ml-3">{food.attributes.price}</p>
              </div>
              <div className="my-4">
                <button className="border-[1px] border-solid w-6 h-6 font-bold">
                  -
                </button>
                <input
                  type="number"
                  className="w-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button className="border-[1px] border-solid w-6 h-6 font-bold ">
                  +
                </button>
              </div>
              <PrimaryButton
                width={96}
                height={32}
                fontWeight={600}
                fontsize={16}
                onClick={handleOrder}
              >
                Đặt hàng
              </PrimaryButton>
            </form>
          </div>
        </div>
        <div className="ml-20 mt-10 flex items-center font-bold text-lg">
          Bình luận
        </div>
        <div className="">
          <div className="float-left w-2/5 bg-blue-100 ml-20 rounded-md pl-3 pt-2">
            <textarea
              placeholder="Viết bình luận của bạn ở đây"
              className="bg-transparent w-full focus:outline-none"
            />
          </div>
          <div className="float-right w-2/5">
            <form>
              <div>
                <img
                  src={defaultAva}
                  alt="Avatar"
                  className="w-11 h-11 rounded-full shadow-xl"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
