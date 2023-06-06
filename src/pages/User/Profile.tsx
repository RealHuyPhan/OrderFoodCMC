import HeadNav from "../../common/HeadNav"
import defaultAva from '../../assets/defaultAva.png'
import qrcode from '../../assets/qrcode.png'

function Profile() {
    return (
        <>
            <HeadNav />
            <div className="mt-20">
                <div className="bg-[#292B2F] h-36 flex">
                    <div className="flex items-center gap-6 ml-16">
                        <img src={defaultAva} alt="" className="h-20 w-20 rounded-full" />
                        <p className="text-white font-bold">Change Your Profile</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#17181A] h-full text-white">
                <div className="flex gap-14">
                    <div className="mt-3 flex gap-14 ml-16 ">
                        <p>Realhuyp</p>
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
                                <p>DOB: 22/06/2000</p>
                            </div>
                            <div>
                                <p>Full name: Phan Sy Huy</p>
                            </div>
                            <div>
                                Phone: +84 123 456 789
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-center">Change Password</p>
                        <div>
                            <div>
                                <p>Change password</p>
                                <input type="text" placeholder="Enter your new password" className="mt-4 bg-transparent border-[1px] border-solid h-10 rounded-lg p-4" />
                            </div>
                            <div className="mt-4">
                                <p>Change your QR</p>
                                <img src={qrcode} alt="qr code" className="w-48 h-48 bg-white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-52">
                </div>
            </div>
        </>
    )
}

export default Profile