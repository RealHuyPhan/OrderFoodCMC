import axios from "axios";
import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

//FIX Register ngày 13/7/2023
export default function RegisterForm() {
  const [checkRules, setcheckRules] = useState(false);
  const [error, setError] = useState(false);
  const initialUser = {
    username: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "Authenticated",
  };
  const [user, setUser] = useState(initialUser);

  const handleSetCheckRules = () => {
    setcheckRules(!checkRules);
  };

  //Sử dụng checkrules để xem box "Đồng ý với điều khoản" đã được check chưa?
  //Kiểm tra xem các trường được điền đầy đủ chưa?
  const checkSignUp = () => {
    if (user.fullname.length != 0 && user.username.length !=0 && user.phone.length != 0 && user.password.length != 0 && user.email.length != 0) {
      if(checkRules == true) { signUp() }

    } 
    else { 
      setError(true)
    }
  };

  const signUp = async () => {
    const url = `http://localhost:1337/api/auth/local/register`;
    try {
      {
        if (
          user.fullname &&
          user.username &&
          user.email &&
          user.password &&
          user.phone
        ) {
          const res = await axios.post(url, user);
          if (res) {
            setUser(initialUser);
          }
        }
      }
    } catch (err) {
      console.log("Fail to register");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <div className="relative top-0 right-0 left-0 bottom-0 m-0 p-0 h-screen w-screen flex justify-center items-center bg-gradient-to-r from-violet-500 to-blue-500 ">
      <div className="md:w-2/3 w-auto h-auto flex flex-col bg-white md:px-10 md:py-4 px-4 py-2 justify-center">
        <div className="flex flex-col md:gap-4 ">
          <div className="w-full flex justify-center">
            <img className="w-44" src="src\assets\cmc.png" alt="" />
          </div>

          <div className="w-full md:grid md:grid-cols-2 md:grid-rows-3 md:gap-x-3 md:gap-y-4 ">
            <div className="pr-2 md:py-2">
              <div className="flex">
                <p className="text-[16px] pl-2 font-normal">Họ và tên</p>
                <p className="text-red-500">*</p>
              </div>

              <div className="flex h-11 border rounded-full">
                <input
                  maxLength={30}
                  type="text"
                  placeholder="Nguyễn Văn A..."
                  name="fullname"
                  value={user.fullname}
                  onChange={handleChange}
                  className="w-full h-full rounded-full px-3 border-none focus:outline-0 "
                />
              </div>
              {/* Kiểm tra đã điền trong trường chưa */}
              {error&&user.fullname.length<=0 ? (
                <label className="text-red-400 pl-2" htmlFor="">
                  Không được để trống trường này
                </label>
              ) : (
                ""
              )}
            </div>

            <div className="pr-2 md:py-2">
              <div className="flex">
                <p className="text-[16px] pl-2 font-normal">Tên người dùng</p>
                <p className="text-red-500">*</p>
              </div>

              <div className="flex h-11 border rounded-full">
                <input
                  maxLength={30}
                  type="text"
                  placeholder="NguyenVanA123..."
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full h-full rounded-full px-3 border-none focus:outline-0 "
                />

              </div>
              {error&&user.username.length<=0 ? (
                <label className="text-red-400 pl-2" htmlFor="">
                  Không được để trống trường này
                </label>
              ) : (
                ""
              )}
            </div>

            <div className="pr-2 md:py-2">
              <div className="flex">
                <p className="text-[16px] pl-2 font-normal">Email</p>
                <p className="text-red-500">*</p>
              </div>

              <div className="flex h-11 border rounded-full">
                <input
                  maxLength={40}
                  pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                  type="text"
                  placeholder="NguyenVanA123@gmail.com..."
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full h-full rounded-full px-3 border-none focus:outline-0 "
                />
              </div>
              {error&&user.email.length<=0 ? (
                <label className="text-red-400 pl-2" htmlFor="">
                  Không được để trống trường này
                </label>
              ) : (
                ""
              )}
            </div>

            <div className="pr-2 md:py-2">
              <div className="flex">
                <p className="text-[16px] pl-2 font-normal">Số điện thoại</p>
                <p className="text-red-500">*</p>
              </div>

              <div className="flex h-11 border rounded-full">
                <input
                  type="number"
                  placeholder="VD:0123456.."
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full h-full rounded-full px-3 border-none focus:outline-0 "
                />
              </div>
              {error&&user.phone.length<=0 ? (
                <label className="text-red-400 pl-2" htmlFor="">
                  Không được để trống trường này
                </label>
              ) : (
                ""
              )}
            </div>

            <div className="pr-2 md:py-2">
              <div className="flex">
                <p className="text-[16px] pl-2 font-normal">Nhập mật khẩu</p>
                <p className="text-red-500">*</p>
              </div>

              <div className="flex h-11 border rounded-full">
                <input
                  maxLength={30}
                  type="password"
                  placeholder="VD:123abc..."
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full h-full px-3 rounded-full border-none focus:outline-0 "
                />
              </div>
              {error&&user.password.length<=0 ? (
                <label className="text-red-400 pl-2" htmlFor="">
                  Không được để trống trường này
                </label>
              ) : (
                ""
              )}
            </div>

            <div className="pr-2 md:py-2">
              <div className="flex">
                <p className="text-[16px] pl-2 font-normal">
                  Xác nhận mật khẩu
                </p>
                <p className="text-red-500">*</p>
              </div>

              <div className="flex h-11 border rounded-full">
                <input
                  maxLength={30}
                  type="password"
                  placeholder="VD:123abc..."
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full h-full rounded-full px-3 border-none focus:outline-0 "
                />
              </div>
              {error&&user.password.length<=0 ? (
                <label className="text-red-400 pl-2" htmlFor="">
                  Không được để trống trường này
                </label>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex">
            <input
              className="mr-1"
              type="checkbox"
              onClick={handleSetCheckRules}
            />
            <div className="flex gap-1">
              <p>
                Đồng ý với
                <a className="ml-1 text-[rgb(0,103,213)] cursor-pointer hover:opacity-70">
                  Điều khoản dịch vụ
                </a>
              </p>
            </div>
          </div>

          <div className="flex w-full justify-start">
            <button
              style={{ fontSize: `${24}px`, fontWeight: `${32}` }}
              className="md:w-1/3 py-1 rounded bg-[rgb(0,103,213)] text-white w-full md:mt-1 mt-0 hover:opacity-70"
              onClick={checkSignUp}
            >
              Đăng ký
            </button>
          </div>

          <div className="flex w-full justify-start">
            <p>
              Đã có tài khoản?
              <Link
                to={"/"}
                className="text-[rgb(0,103,213)] cursor-pointer hover:opacity-70"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
