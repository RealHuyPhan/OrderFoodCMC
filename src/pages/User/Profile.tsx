import HeadNav from "../../common/HeadNav";
import { useEffect, useState } from "react";
import { IUser } from "./type";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import imgbg from "../../assets/profilebg.jpg";

//Responsive lại profile ngày 4/7/2023
//Css lại profile ngày 7/7/2023
function Profile() {
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState<IUser>();
  const getData = JSON.parse(localStorage.getItem("user") || "{}");
  const jwt = getData.jwt;
  const id = getData.id;
  const [isGetData, setIsGetData] = useState(true);
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const initialEdit = {
    fullName: undefined,
    dob: undefined,
    phone: undefined,
  };
  const [edit, setEdit] = useState<{
    fullName?: string;
    dob?: string;
    phone?: number;
  }>(initialEdit);

  const getProfile = () => {
    axios
      .get(`http://localhost:1337/api/users/${id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setProfile(res.data as IUser);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsGetData(false);
      });
  };

  const BackButton = () => {
    getProfile();
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const editUser = async () => {
    const url = `http://localhost:1337/api/users/${id}`;
    try {
      if (edit.fullName || edit.dob || edit.phone) {
        const res = await axios.put(url, edit, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (res) {
          successToast();
          setEdit(initialEdit);
          //   navigate(-1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserChange = ({ target }: any) => {
    const { name, value } = target;
    setEdit((currentEdit) => ({
      ...currentEdit,
      [name]: value,
    }));
  };

  const handlePreviewImage = (e: any) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);
    setImage(file);
  };

  useEffect(() => {
    getProfile();
    editUser();
  }, [jwt, id]);

  if (isGetData) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>404 not found</p>;
  }

  const successToast = () => {
    toast.success("Cập nhật thông tin Thành công", {
      position: "top-center",
      autoClose: 5000,
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

  return (
    <>
      <ToastContainer
        position="top-center"
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

      <HeadNav />

      <div
        style={{ backgroundImage: `url(${imgbg})` }}
        className="mt-20 grid place-items-center bg-no-repeat bg-cover bg-center min-h-[calc(100vh-80px)]"
      >
        <div className="md:p-7 flex justify-center items-center md:overflow-hidden w-1/2 h-full md:w-full p-3">
          <div className="md:flex ">
            <div className="md:w-1/3 md:p-4 mb-3 md:mb-0">
              <div className=" bg-[#1C9AD6] rounded-2xl flex flex-col items-center text-white p-4 text-center h-full gap-3">
                <div className="w-full flex flex-col items-center">
                  <div className="relative group">
                    <img
                      src={`http://localhost:1337${profile.avatar.url}`}
                      alt=""
                      className="opacity-100 backface-hidden rounded-full group-hover:opacity-30 h-32 w-32 "
                    />
                    <button className="absolute top-0 left-0 right-0 bottom-0 h-32 w-32 test-base rounded-full hidden group-hover:block text-white">Edit</button>
                  </div>
    
                  <p className="w-full text-base overflow-hidden ">
                    {profile.fullName}
                  </p>
                </div>

                <div className="border-[1px] w-full bg-black "></div>

                <div className="w-full text-start overflow-hidden ">
                  <div>
                    <p>Ngày sinh: {profile.dob}</p>
                  </div>
                  <div>
                    <p title={profile.fullName}>
                      Tên đầy đủ: {profile.fullName}
                    </p>
                  </div>
                  <div>Số điện thoại: +{profile.phone}</div>
                </div>

                <div className="flex justify-center w-full items-center ">
                  <button
                    className="border-[1px]  hover:bg-[#1C9AD6] hover:text-white text-black bg-white w-24 rounded-2xl text-center"
                    onClick={() => {
                      toggleModal();
                      setEdit({
                        dob: profile.dob,
                        fullName: profile.fullName,
                        phone: profile.phone,
                      });
                    }}
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 md:p-4">
              <div className="flex items-center flex-col bg-[#1C9AD6] rounded-2xl p-4 gap-3 h-full">
                <div>
                  <p className="leading-8 text-center text-white font-semibold">
                    Mã QR của bạn
                  </p>
                  {profile.qrcode &&
                    profile.qrcode.map((qr) => {
                      return (
                        <img
                          key={qr.id}
                          src={`http://localhost:1337${qr.url}`}
                          alt="qr code"
                          className="md:w-52 md:h-52   bg-white"
                        />
                      );
                    })}
                </div>

                <button className="border-[1px]  hover:bg-[#1C9AD6] hover:text-white text-black bg-white px-2 py-1  rounded-2xl text-center">
                  Thay mã QR
                </button>

                <div className="border-[1px] w-full bg-black"></div>

                <div className="flex justify-between w-full gap-4 md:gap-0">
                  <button className="border-[1px]  hover:bg-[#1C9AD6] hover:text-white text-black bg-white rounded-2xl text-center px-2 py-1 ">
                    Đổi mật khẩu
                  </button>

                  <button
                    onClick={handleLogout}
                    className="border-[1px]  hover:bg-[#1C9AD6] hover:text-white text-black bg-white rounded-2xl text-center px-2 py-1"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content w-2/3 h-2/3 bg-white">
              <div className="flex justify-center text-2xl  text-slate-950 mt-5 mb-5">
                Cập nhật thông tin tài khoản
              </div>

              <div className="flex flex-col w-full h-2/3">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-slate-950 ">Họ và tên</div>

                  <input
                    type="text"
                    className="w-full pl-2 h-8 text-slate-950"
                    placeholder="VD:Nguyễn Văn A..."
                    name="fullName"
                    value={edit.fullName || ""}
                    onChange={handleUserChange}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-slate-950 ">Ngày sinh</div>
                  <input
                    type="date"
                    className="w-full pl-2 h-8 text-slate-950"
                    placeholder="VD:01/01/2001"
                    name="dob"
                    value={edit.dob || ""}
                    onChange={handleUserChange}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-slate-950 ">Số điện thoại</div>
                  <input
                    type="number"
                    className="w-full pl-2 h-8 text-slate-950"
                    placeholder="VD:0123456789"
                    name="phone"
                    value={edit.phone || ""}
                    onChange={handleUserChange}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-2 h-8  ">
                <button
                  onClick={editUser}
                  className="text-slate-950 w-20   border-[2px] h-full rounded-lg hover:bg-black bg-white hover:text-white"
                >
                  Lưu
                </button>
                <button
                  onClick={BackButton}
                  className="text-slate-950 w-20  border-[2px] h-full rounded-lg hover bg-white hover:bg-black hover:text-white"
                >
                  Trở lại
                </button>
              </div>

              <button
                className="close-modal text-xl hover:text-black text-slate-400 "
                onClick={BackButton}
              >
                x
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
