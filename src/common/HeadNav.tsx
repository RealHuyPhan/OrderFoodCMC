import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
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
import { useClickOutside } from "../hook/useClickOutSide";

interface Stores {
  id: number;
  attributes: {
    storeName: string;
  };
}

export default function HeadNav() {
  const linkMobile = [
    { name: "Cửa hàng", link: "/stores" },
    { name: "Tất cả đơn hàng", link: "/orders" },
    { name: "Giỏ hàng", link: "/histories" },
    { name: "Tài khoản", link: "/profile" },
  ];
  const menuRef = useRef<HTMLDivElement>(null);

  const [listLink, setListLink] = useState(linkMobile);
  const [openNav, setOpenNav] = useState(false);

  useClickOutside(menuRef, () => setOpen(false));

  const handleWindowChange = () => {
    const width = window.innerWidth;
    if (width > 768) {
      const pcMenu = linkMobile.filter((pc) => pc.link !== "/profile");
      setListLink(pcMenu);
    } else {
      setListLink(linkMobile);
    }
  };

  useEffect(() => {
    handleWindowChange();
    window.addEventListener("resize", handleWindowChange);
    return () => window.removeEventListener("resize", handleWindowChange);
  }, []);

  const initialUser = { password: "", identifier: "" };
  const [user, setUser] = useState(initialUser);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const getData = JSON.parse(localStorage.getItem("user") || "{}");
  const jwt = getData.jwt;
  const [voteModal, setvoteModal] = useState(false);
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

  const togglevoteModal = () => {
    setvoteModal(!voteModal);
  };

  const BackButton = () => {
    togglevoteModal();
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (voteModal) {
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
    <div className="bg-[#1C9AD6] text-white fixed top-0 right-0 left-0 flex md:justify-between h-20 shadow-md z-20 px-10">
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
      <div className="text-xl font-bold flex items-center gap-2 w-1/2">
        <BiCookie />
        <Link to={"/"}>Đặt cơm CMC</Link>
      </div>
      <div className="flex items-center font-medium">
        {jwt ? (
          <>
            <button
              onClick={() => setOpenNav(!openNav)}
              className="flex w-7 h-7 justify-center items-center absolute right-8 top-[27px] md:hidden text-black rounded-full"
            >
              <AiOutlineMenu />
            </button>

            <div className="flex">
              {voteModal && (
                <div className="modal overflow-hidden z-30">
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
                          <div className="text-slate-950 ">
                            Tiêu đề đơn hàng
                          </div>
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
                            className="w-full pl-3 focus:outline-none rounded-2xl text-black"
                          />
                          {/* CSS lại icon */}
                          <BsSearch className="m-4 text-black cursor-pointer" />
                        </div>
                      </div>

                      {/* Thêm scroll cho danh sách cửa hàng và responsive */}
                      <div className="overflow-hidden overflow-y-scroll p-2 my-2 md:grid md:grid-cols-4 md:gap-7 border-[1px] border-rgb(0 0 0 1) bg-slate-200 ">
                        {stores &&
                          stores.map((store) => (
                            <div className="py-2 md:py-0">
                              <div
                                key={store.id}
                                // Thêm thuộc tính flex flex-col để độ dài ảnh và tiltle bằng nhau
                                className={`h-32 w-full md:py-0 md:h-60 md:w-auto flex md:flex-col md:border-2 rounded-lg group ease-in-out duration-300 cursor-pointer overflow-hidden bg-white  ${
                                  storeIdSelected === store.id
                                    ? "border-blue-500 border-2 rounded-lg"
                                    : ""
                                }`}
                                onClick={() => handleOnClick(store.id)}
                              >
                                <div className="relative w-2/5 md:w-auto md:flex-1 ">
                                  <img
                                    src={defaultFood}
                                    alt="No Food img founded"
                                    className="object-cover rounded-lg md:rounded-none w-full h-full group-hover:scale-110"
                                  />

                                  <div className="flex items-center justify-end absolute top-2 right-2">
                                    <input
                                      type="checkbox"
                                      checked={storeIdSelected === store.id}
                                      className="w-4 h-4 accent-blue-500 pointer-events-none"
                                    />
                                  </div>
                                </div>

                                <div className="md:flex-1 w-3/5 md:w-auto text-start group-hover:font-semibold md:px-2 py-1 px-3 text-black ">
                                  {/* giới hạn 1 dòng cho các thẻ h3,p và div bằng whitespace-nowrap và truncate.Đồng thời responsive và thêm tiltle ở trong thẻ h3 */}
                                  <h3
                                    title={store.attributes.storeName}
                                    // responsive line-height cho màn hình 1440x900
                                    className="font-medium text-lg leading-6 xl:leading-[22px] overflow-hidden whitespace-nowrap truncate"
                                  >
                                    {store.attributes.storeName}
                                  </h3>
                                    {/* responsive line-heigt */}
                                  <p className="text-xs xl:leading-[12px] my-1 overflow-hidden whitespace-nowrap truncate">
                                    Cách đây 0.6km{" "}
                                  </p>
                                  <div className="leading-5 overflow-hidden whitespace-nowrap truncate">
                                    Component star rate
                                  </div>
                                </div>
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

              <ul
                // Update vị trí của menu modal
                className={`gap-1 bg-[#1C9AD6] md:flex absolute md:static md:pl-0  left-0 w-full ease-in ${
                  openNav ? "top-[79px]" : "top-[-490px]"
                }`}
              >
                <button
                  className="md:my-0 py-4 md:py-0 px-7 md:px-2 md:rounded-full cursor-pointer font-semibold list-none flex md:justify-center justify-start items-center"
                  onClick={() => {
                    togglevoteModal();
                    // Thêm sự kiện tắt Modal khi voteModal đã hiện
                    setOpenNav(!openNav);
                  }}
                >
                  Tạo đơn
                </button>
                {listLink.map((link, index) => (
                  <li
                    key={index}
                    className=" md:my-0 py-4 md:py-0 px-7 md:px-2 md:rounded-full cursor-pointer font-semibold list-none flex md:justify-center justify-start items-center"
                  >
                    <Link to={link.link} className="w-full duration-500">
                      {link.name}
                    </Link>
                  </li>
                ))}

                <div>
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((old) => !old);
                    }}
                    src={defaultAva}
                    className="md:block hidden cursor-pointer w-10 h-10 rounded-full shadow-xl"
                  />
                </div>
              </ul>

              {open && (
                // CSS lại phần avatar
                <div className="bg-white text-black p-4 w-30 shadow-2xl hidden md:block absolute top-[76%] right-[3%] rounded-lg ">
                  <ul>
                    <Link
                      to={"/profile"}
                      className="w-full flex p-2 text-lg cursor-pointer rounded "
                    >
                      Profile
                    </Link>
                    <li className="p-2 text-lg cursor-pointer rounded ">
                      Setting
                    </li>
                    <li
                      onClick={handleLogout}
                      className="p-2 text-lg cursor-pointer rounded "
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <button onClick={toggleModal}>Đăng nhập</button>
          </div>
        )}
        {modal && (
          <div className="modal">
            <div className="overlay">
              <div className="modal-content text-black">
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
