import { useState, useEffect } from 'react'
import HeadNav from '../../common/HeadNav'
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import defaultImg from '../../assets/defaultFoodStore.png'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';



function Vote() {
    const [modal, setModal] = useState(false)
    const [votes, setVotes] = useState();
    const [orders, setOrders] = useState();
    const getData = JSON.parse(localStorage.getItem("user") || "{}");
    const jwt = getData.jwt;
    const [orderIdSelected, setOrderIdSelected] = useState<number>();
    const [title, setTitle] = useState<string | any>();
    const [newArr, setNewArr] = useState([]);






    const handleOnClick = (storeId: number) => {
        setOrderIdSelected(storeId !== orderIdSelected ? storeId : undefined);
    };



    useEffect(() => {
        const getVotes = () => {
            axios.get(`http://localhost:1337/api/votes?populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((res) => {
                setVotes(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }

        const getOrder = () => {
            axios.get(`http://localhost:1337/api/orders?populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((res) => {
                setOrders(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }

        getOrder();
        getVotes();
    }, [jwt])


    const handleVote = () => {
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                order: orderIdSelected,
                title: title
            })
        );
        fetch(`http://localhost:1337/api/votes`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: formData,
            }
        ).then(() => {
            successToast();
            toggleModal();

        }).catch((err) => {
            console.log("Error", err)
        })
    }

    const successToast = () => {
        toast.success("Vote thành công", {
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

    const toggleModal = async () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    let filteredItems = []
    if (orders) {
        filteredItems = orders.filter(function (el: any) {
            return el?.attributes?.vote?.data?.id == null
        })
        console.log(filteredItems)
    }



    return (
        <>
            <HeadNav />
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
            <div className='mt-20'>
                <div className='pt-4 pl-4'>
                    <button onClick={toggleModal} className='bg-slate-300 w-28 h-11 font-bold rounded-md'>
                        Tạo vote
                    </button>
                </div>
                {modal && (
                    <div className="modal z-50">
                        <div className="overlay flex justify-center items-center ">
                            <div
                                className="w-4/5 pt-5 pb-5 pr-4 pl-4 bg-white flex flex-col justify-between ">
                                <div className="flex justify-between text-2xl text-slate-950 ">
                                    <p>Tạo vote</p>
                                    <button
                                        onClick={toggleModal}>
                                        <AiFillCloseCircle />
                                    </button>
                                </div>

                                <hr className="w-full bg-black mt-2 mb-2"></hr>
                                <div className="flex flex-col w-full">
                                    <div className="flex-1 flex flex-col justify-center mb-4">
                                        <div className="text-slate-950 ">Tiêu đề vote</div>
                                        <input
                                            type="text"
                                            className="w-full pl-2 h-8 text-slate-950"
                                            placeholder="Vote"
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

                                <div className="h-70 overflow-hidden overflow-y-scroll p-2 mt-2 mb-2 grid grid-cols-4 gap-7 border-[1px] border-rgb(0 0 0 1) ">
                                    {
                                        filteredItems && filteredItems.map((order: any) => (
                                            <div
                                                key={order.id}
                                                className={`flex flex-col border-2 group ease-in-out duration-300 cursor-pointer overflow-hidden 
                                            ${orderIdSelected === order.id
                                                        ? "border-blue-500"
                                                        : ""
                                                    }`}
                                                onClick={() => handleOnClick(order.id)}
                                            >
                                                <div className="relative overflow-hidden">
                                                    <img
                                                        src={defaultImg}
                                                        alt="No Food img founded"
                                                        className="bg-no-repeat bg-contain bg-center group-hover:scale-110"
                                                    />
                                                    <div className="flex items-center justify-end absolute top-2 right-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={orderIdSelected === order.id}

                                                            // onChange={orderIdSelected}
                                                            className="w-4 h-4 accent-blue-500 pointer-events-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col text-start group-hover:font-semibold px-2 py-2">
                                                    <h3 className=" font-medium text-lg">
                                                        {order.attributes.title}
                                                    </h3>
                                                    <div className="">Component star rate</div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>



                                <div className="flex justify-between items-center h-8 ">
                                    <button
                                        onClick={toggleModal}
                                        className="text-slate-950 w-20   border-[2px] h-full rounded-lg hover:bg-black bg-white hover:text-white"
                                    >
                                        Trở lại
                                    </button>
                                    <button
                                        onClick={() => handleVote()}
                                        className="text-slate-950 w-20  border-[2px] h-full rounded-lg hover bg-white hover:bg-black hover:text-white">
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-3 ml-4'>
                <div>
                    <p className='font-bold'>Vote cho đơn hôm nay</p>
                    <h2 className='font-bold text-center text-2xl pt-3 '>Vote đã tạo</h2>
                    <div className='mb-3 mx-6'>
                        <div className='flex flex-wrap mx-[-5px]'>
                            {votes && votes.map((vote: any) => (
                                <Link to={`${vote.id}`} key={vote.id} className='px-[5px] w-1/4'>
                                    <div className='block mt-3 bg-white rounded-sm shadow-md'>
                                        <img src={defaultImg} alt="" className='bg-no-repeat bg-contain bg-center border-x-2' />
                                        <h4 className='text-1xl font-bold m-2 overflow-hidden '>
                                            {vote.attributes.title}
                                        </h4>
                                        <p className='text-base font-normal m-2 overflow-hidden pb-2'>
                                            {vote.attributes.createdAt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vote