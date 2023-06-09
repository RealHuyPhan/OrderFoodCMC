import HeadNav from "../../common/HeadNav";
import defaultAva from "../../assets/defaultAva.png";
import qrcode from "../../assets/qrcode.png";
import { useEffect,useState } from "react";
import { IUser } from "./type";
import axios from "axios";

function Profile() {
  
  const [profile,setProfile] = useState<IUser>();
  const getData=JSON.parse(localStorage.getItem("user") || "{}")
  const jwt =getData.jwt;
  const id =getData.id;
  const [isGetData,setIsGetData] =useState(true);


  const getProfile = () => {
    axios.get(`http://localhost:1337/api/users/${id}?populate=*`,{
      headers: {
        Authorization:`Bearer ${jwt}`,
      },
    })
    .then((res) =>{
      setProfile(res.data as IUser);
      console.log(res.data)
    })
    .catch((err) =>{
      console.log(err);
    })
    .finally(() =>{
      setIsGetData(false)
    });
  };

  useEffect(() =>{
    getProfile();
  },[jwt,id])


  if(isGetData) {
    return <p>Loading...</p>
  }

  if(!profile) {
    return <p>404 not found</p>
  }

  return (
    <>
      <HeadNav />
      <div className="mt-20">
        <div className="bg-[#292B2F] h-36 flex">
          <div className="flex items-center gap-6 ml-16">
            
            <img src={defaultAva} alt="" className="h-20 w-20 rounded-full" />
            <div>
              <p className="text-white font-bold">Change Your Profile</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#17181A] h-full text-white">
        <div className="flex gap-14">
          <div className="mt-3 flex gap-14 ml-16 ">
            <p>{profile.username}</p>
            <p>#User</p>
          </div>
        </div>
        <div className="ml-16 font-light text-2xl mt-6">
          <p>About me</p>
        </div>
        <div className="flex  mt-3">
          <div className="flex-1">
            <p className="font-bold text-center">User Info</p>
            <div className="mt-4 ml-16">
              <div>
                <p>{profile.dob}</p>
              </div>
              <div>
                <p>Full name: {profile.fullName}</p>
              </div>
              <div>Phone: +{profile.phone}</div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-center">Change Password</p>
            <div>
              <div>
                <p>Change password</p>
                <input
                  type="text"
                  placeholder="Enter your new password"
                  className="mt-4 bg-transparent border-[1px] border-solid h-10 rounded-lg p-4"
                />
              </div>
              <div className="mt-4">
                <p>Change your QR</p>
                {profile.qrcode.map(((qr) => {
                  return <img key={qr.id}
                  src={`http://localhost:1337${qr.url}`}
                  alt="qr code"
                  className="w-48 h-48 bg-white"
                />
                }))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-52"></div>
      </div>
    </>
  );
}

export default Profile;
