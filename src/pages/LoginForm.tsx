import InputUsertForm from "../common/InputUsertForm";
import { BsFillCheckSquareFill } from "react-icons/bs";
import LoginButton from "../common/LoginButton";
import InputPasswordForm from "../common/InputPasswordForm";

export default function LoginForm() {
  return (
    <div className="m-0 p-0 flex justify-center">
      <div className="w-[400px] h-[800px] mt-14 mb-10 bg-white flex flex-col items-center">
        <img className="w-2/3 " src="src\assets\cmc.png" alt="" />
        <div className="w-1/3 h-20 flex justify-center items-center">
          <p className="text-xl">Welcome back</p>
        </div>

        <div className="w-4/5 h-1/3 ">
          <div className="w-full h-4/5 bg-white flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-[14px] font-normal">Tên đăng nhập</p>
              <InputUsertForm></InputUsertForm>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-[14px] font-normal">Mật khẩu</p>
              <InputPasswordForm></InputPasswordForm>
            </div>
          </div>

          <div className="w-full flex justify-between h-1/5 ">
            <div className="flex justify-between items-start w-2/5">
              <BsFillCheckSquareFill />
              <div className="w-4/5 flex justify-start">
                <p className="items-end leading-4 text-[14px] font-normal text-slate-500">
                  Lưu tài khoản
                </p>
              </div>
            </div>

            <div className="flex justify-end w-2/5">
              <p className="items-end leading-4 text-[14px] font-semibold">
                Quên mật khẩu?
              </p>
            </div>
          </div>
        </div>

        <div className="w-4/5 h-1/3 flex items-center">
          <div className="w-full h-2/3 flex flex-col">
            <div className="flex-1 flex items-center">
              <LoginButton fontsize={16} fontWeight={400}>
                Đăng nhập
              </LoginButton>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-2/3 h-3/4 flex justify-center items-center">
                <p>Tạo tài khoản</p>
                <p className="text-[rgb(0,103,213)]">Đăng ký</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
