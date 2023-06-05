import React from "react";

function LandingPage() {
  return (
    <div className="h-[2000px]">
      <div className="h-[580px] w-full relative top-0 right-0 left-0 flex flex-col items-center">
        
        <div className="top-0 h-14 w-4/5 fixed flex justify-between z-10">
          <div className="w-44 flex justify-start items-center">
            <div className="h-full w-12 flex items-center justify-center ">
              <img className="" src="../src/assets/Chef-hat.jpg" alt="" />{" "}
              {/*Notice*/}
            </div>

            <div className="h-full w-22 flex items-center font-bold text-lg ">
              Đặt cơm CMC
            </div>
          </div>

          <div className="w-48 flex justify-between items-center">
            <div className="">Đăng ký</div>

            <div className="">Đăng nhập</div>
          </div>
        </div>

        <div className="bg-[url('../src/assets/topbg.png')] bg-cover bg-no-repeat w-full h-[480px] bg-center relative mt-14 flex justify-stretch ">
          
          <div className="flex-1 flex justify-center items-center">
            <div className="w-[270px] h-44 mt-9 flex flex-col">

              <div className="inline flex-1">
                <label className="mt-1">
                  <span className="text-2xl font-bold mr-2">
                    Đặt cơm chỉ với vài nút click
                  </span>
                  <span className="text-2xl font-bold text-white">CMC food order</span>
                </label>
              </div>

              <div className="flex-1 text-xs font-normal pt-6 text-white">Chỉ cần ngồi một chỗ bạn đã có thể đặt cơm từ trước mà không cần phải hỏi:"Hôm nay ăn gì?"</div>
              <div className="flex-1">3</div>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="bg-[url('../src/assets/imgfood_bg-remove.png')] w-4/5 h-4/5 bg-cover bg-no-repeat bg-center z-[5]"></div>
          </div>

        </div>

        
        


      </div>

      <div className="h-[600px] w-full bg-black" ></div>
    </div>


  );
}

export default LandingPage;
