import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiCookie } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import cmclogo from "../assets/cmclogo.png";
import defaultAva from "../assets/defaultAva.png";
import defaultFood from "../assets/defaultFoodStore.png";
import { storeUser } from "../helper";

interface Stores {
  id: number;
  attributes: {
    storeName: string;
  };
}

export default function HeadNav() {
  const initialUser = { password: "", identifier: "" };
  const [user, setUser] = useState(initialUser);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const getData = JSON.parse(localStorage.getItem("user") || "{}");
  const jwt = getData.jwt;
  const [votemodal, setVoteModal] = useState(false);
  const [stores, setStores] = useState<Stores[]>([]);
  const [storeIdSelected, setStoreIdSelected] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [open, setOpen] = useState(false);
  const personic = getData.id;

  const handleOnClick = (storeId: number) => {
    setStoreIdSelected(storeId !== storeIdSelected ? storeId : undefined);
  };

  const successToast = () => {
    toast.success("Đăng nhập thành công", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleLogout = () => {
    localStorage.setItem("user", "");
    navigate("/");
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  }

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          successToast();
          setModal(!modal);
          storeUser(data);
          navigate("/");
          setUser(initialUser);
        }
      }
    } catch (err) {
      console.log("Fail to login!");
    }
  };

  useEffect(() => {
    const getStores = () => {
      axios
        .get(`http://localhost:1337/api/stores?populate=*`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          setStores(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return getStores();
  }, [jwt]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleVoteModal = () => {
    setVoteModal(!votemodal);
  };

  const BackButton = () => {
    toggleVoteModal();
  };

  if (modal && votemodal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        title,
        personic: personic,
        store: storeIdSelected,
      })
    );

    fetch(`http://localhost:1337/api/orders`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    })
      .then(() => {
        successToast();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white fixed top-0 right-0 left-0 flex justify-between h-20 shadow-md z-20 px-20">
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="text-2xl font-semibold flex items-center gap-2 w-1/2">
        <BiCookie />
        <Link to={"/"}>Đặt cơm CMC</Link>
      </div>
      <div className="flex items-center gap-4 font-medium">
        {jwt ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                toggleVoteModal();
              }}
            >
              Tạo đơn
            </button>

            {votemodal && (
              <div className="modal overflow-hidden">
                <div className="overlay flex justify-center items-center ">
                  <form
                    onSubmit={handleSubmit}
                    className="w-4/5 py-5 px-4 h-5/6 bg-white flex flex-col justify-between"
                  >
                    <div className="flex justify-center text-2xl text-slate-950 ">
                      Tạo đơn hàng
                    </div>
                    <hr className="w-full bg-black mt-2 mb-2"></hr>
                    <div className="flex flex-col w-full">
                      <div className="flex-1 flex flex-col justify-center mb-4">
                        <div className="text-slate-950 ">Tiêu đề đơn hàng</div>
                        <input
                          type="text"
                          className="w-full pl-2 h-8 text-slate-950"
                          placeholder="VD:Tên đơn..."
                          name="fullName"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="flex h-10 items-center w-full border-[1px] rounded-full">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full pl-3 focus:outline-none rounded-2xl"
                        />
                        <BsSearch className="m-4 cursor-pointer" />
                      </div>
                    </div>

                    {/* Thêm scroll cho danh sách cửa hàng */}
                    <div className="overflow-hidden overflow-y-scroll p-2 mt-2 mb-2 grid grid-cols-4 gap-7 border-[1px] border-rgb(0 0 0 1) ">

                      {stores &&
                        stores.map((store) => (
                          <div
                            key={store.id}
                            // Thêm thuộc tính flex flex-col để độ dài ảnh và tiltle bằng nhau
                            className={`h-60 flex flex-col border-2 group ease-in-out duration-300 cursor-pointer overflow-hidden ${
                              storeIdSelected === store.id
                                ? "border-blue-500"
                                : ""
                            }`}
                            onClick={() => handleOnClick(store.id)}
                          >
                            <div className="relative flex-1 ">
                              <img
                                src={defaultFood}
                                alt="No Food img founded"
                                className="object-cover w-full h-full group-hover:scale-110"
                              />

                              <div className="flex items-center justify-end absolute top-2 right-2">
                                <input
                                  type="checkbox"
                                  checked={storeIdSelected === store.id}
                                  className="w-4 h-4 accent-blue-500 pointer-events-none"
                                />
                              </div>
                            </div>

                            <div className="flex-1 text-start group-hover:font-semibold px-2 py-1">
                              {/* giới hạn 1 dòng cho các thẻ h3,p và div bằng whitespace-nowrap và truncate.Đồng thời thêm tiltle ở trong thẻ h3 */}
                              <h3 title={store.attributes.storeName} className="font-medium text-lg leading-6 overflow-hidden whitespace-nowrap truncate">
                                {store.attributes.storeName}
                              </h3>
                              <p className="text-xs my-1 overflow-hidden whitespace-nowrap truncate">Cách đây 0.6km </p>
                              <div className="leading-5 overflow-hidden whitespace-nowrap truncate">Component star rate</div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center h-8 ">
                      <button
                        onClick={BackButton}
                        className="text-slate-950 w-20   border-[2px] h-full rounded-lg hover:bg-black bg-white hover:text-white"
                      >
                        Trở lại
                      </button>
                      <button
                        type="submit"
                        className="text-slate-950 w-20  border-[2px] h-full rounded-lg hover bg-white hover:bg-black hover:text-white"
                      >
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <Link to={"/stores"}>Cửa hàng</Link>
            <Link to={"/orders"}>Tất cả đơn hàng</Link>
            <Link to={"/vote"}>Vote</Link>
            <Link to={"/histories"}>Giỏ hàng</Link>
            <div>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((old) => !old);
                }}
                src={defaultAva}
                className="cursor-pointer w-10 h-10 rounded-full shadow-xl"
              />
            </div>
            {open && (
              <div
                // ref={menuRef}
                className="bg-white p-4 w-30 shadow-2xl absolute top-[86%] right-[6%] rounded-lg"
              >
                <ul>
                  <Link
                    to={"/profile"}
                    className="w-full flex p-2 text-lg cursor-pointer rounded hover:bg-blue-50"
                  >
                    Profile
                  </Link>
                  <li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-50">
                    Setting
                  </li>
                  <li
                    onClick={handleLogout}
                    className="p-2 text-lg cursor-pointer rounded hover:bg-blue-50"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button onClick={toggleModal}>Đăng nhập</button>
          </div>
        )}
        {modal && (
          <div className="modal">
            <div className="overlay">
              <div className="modal-content">
                <div className="flex justify-center">
                  <img src={cmclogo} alt="" className="h-36 w-80" />
                </div>

                <button className="close-modal" onClick={toggleModal}>
                  <AiFillCloseCircle />
                </button>
                <div className="mt-8">
                  <p>Email</p>
                  <div className="bg-white h-10 flex justify-center items-center">
                    <FaUserAlt className="ml-3" />
                    <input
                      type="text"
                      placeholder="Email"
                      className="w-full pl-3 focus:outline-none"
                      name="identifier"
                      value={user.identifier}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p>Password</p>
                  <div className="bg-white h-10 flex justify-center items-center">
                    <RiLockPasswordFill className="ml-3" />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full pl-3 focus:outline-none"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mt-3 w-full">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="h-3 " />
                      <div>
                        <p>Lưu tài khoản</p>
                      </div>
                    </div>
                    <button>
                      <p>Quên mật khẩu</p>
                    </button>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    onClick={handleLogin}
                    className="w-full h-10 items-center bg-[#1676F3]  flex justify-center"
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="mt-8">
                  <div className="flex justify-center">
                    Chưa có tài khoản?{" "}
                    <Link to={"/register"} className="text-[#1676F3] ml-1">
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
