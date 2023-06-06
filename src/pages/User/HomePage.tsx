import HeadNav from "../../common/HeadNav";
import PrimaryButton from "../../common/PrimaryButton";
import BigSizeSearch from "../../common/BigSizeSearch";
import BoxFoodDetail from "../../common/BoxFoodDetail";

export default function HomePage() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <div>
      <HeadNav />

      <div className="mt-20 w-full max-h-full flex justify-center">
        <div className="h-full w-4/5 bg-[#4A91ED]">
          <div className="w-full flex">
            <div className="w-1/3 p-7">
              <p className="font-bold text-2xl/[30px] mb-2 text-white">
                Vote cùng mọi người hoặc lựa chọn theo sở thích của bạn.
              </p>
              <PrimaryButton
                width={80}
                height={33}
                fontWeight={700}
                fontsize={14}
                onClick={handleClick}
              >
                Vote ngay
              </PrimaryButton>
            </div>

            <div className="w-2/3">
              <img
                className="w-full bg-center bg-no-repeat bg-cover"
                src="src\assets\Homepagemidimg.png"
                alt=""
              />
            </div>
          </div>

          <div className="w-full items-center flex justify-stretch">
            <div className="flex flex-1">
              <div className="h-1/2 w-full border-black  border-b-2"></div>
            </div>
            <div className="flex justify-center items-center flex-1">
              <p className="font-medium font-mono text-2xl/[30px]">
                ĂN GÌ HÔM NAY?
              </p>
            </div>
            <div className="flex flex-1">
              <div className="h-1/2 w-full border-black border-b-2"></div>
            </div>
          </div>

          <div className="mb-2 mt-2">
            <BigSizeSearch
              height={40}
              placeholder="Bạn muốn ăn gì nào?"
            ></BigSizeSearch>
          </div>

          <div className="w-full mb-4 grid grid-cols-2 grid-rows-3 pt-2 pb-2 pr-4 pl-4 items-center gap-x-3 gap-y-3">
            <div className="flex justify-center items-center">
              <BoxFoodDetail
                imgUrl="src\assets\food_top.png"
                tiltle="Trà sữa Royal"
                money="25000đ"
              ></BoxFoodDetail>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
