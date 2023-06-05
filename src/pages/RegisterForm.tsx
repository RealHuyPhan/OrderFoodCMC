import InputNormal from "../common/InputNormal";
import LoginButton from "../common/LoginButton";
import InputHasEyes from "../common/InputHasEyes";
import { ImCheckboxUnchecked } from "react-icons/im";

export default function RegisterForm() {
  return (
    <div className="m-0 p-0 bg-black flex justify-center">
      <div className="w-[400px] h-[1000px] mt-14 mb-10 bg-white flex flex-col items-center justify-center">
        <img className="w-2/3 " src="src\assets\cmc.png" alt="" />

        <div className="w-4/5 h-1/2 mt-4 ">
          <div className="w-full h-4/5 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex">
                <p className="text-[14px] font-normal">Họ và tên</p>
                <p className="text-red-500">*</p>
              </div>
              <InputNormal></InputNormal>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex">
                <p className="text-[14px] font-normal">Ngày tháng năm sinh</p>
                <p className="text-red-500">*</p>
              </div>
              <InputNormal></InputNormal>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex">
                <p className="text-[14px] font-normal">Số điện thoại</p>
                <p className="text-red-500">*</p>
              </div>
              <InputNormal></InputNormal>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex">
                <p className="text-[14px] font-normal">Nhập tên đăng nhập</p>
                <p className="text-red-500">*</p>
              </div>
              <InputNormal></InputNormal>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex">
                <p className="text-[14px] font-normal">Nhập mật khẩu</p>
                <p className="text-red-500">*</p>
              </div>
              <InputHasEyes></InputHasEyes>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex">
                <p className="text-[14px] font-normal">Xác nhận mật khẩu</p>
                <p className="text-red-500">*</p>
              </div>
              <InputHasEyes></InputHasEyes>
            </div>
          </div>

          <div className="w-full flex h-1/5">
              <div className="w-1/12 flex items-center">
                <ImCheckboxUnchecked />
              </div>

              <div className="flex justify-center items-center ">
                <p className="">Đồng ý với</p>
                <p className="text-[rgb(0,103,213)]">Điều khoản dịch vụ</p>
              </div>
          </div>
        </div>

        <div className="w-4/5 h-1/4 flex items-center">
          <div className="w-full h-2/3 flex flex-col">
            <div className="flex-1 flex items-start">
              <LoginButton fontsize={16} fontWeight={400}>
                Đăng ký
              </LoginButton>
            </div>
            <div className="flex-1 flex justify-center items-start">
              <div className="w-2/3 h-2/4 flex justify-center items-center ">
                <p>Đã có tài khoản?</p>
                <p className="text-[rgb(0,103,213)]">Đăng nhập</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
