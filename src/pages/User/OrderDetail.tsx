import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import HeadNav from "../../common/HeadNav";
import axios from 'axios';
import { IFood, IOrder, IStore } from './type';
import defaultImg from '../../assets/defaultFoodStore.png'
import { FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import PrimaryButton from '../../common/PrimaryButton';
import { ToastContainer, toast } from 'react-toastify';
import { Rating } from '@mui/material';


function OrderDetail() {
    const [modal, setModal] = useState(false);
    const [foodSelected, setFoodSelected] = useState<number>();
    const [order] = useState<IOrder>()
    const [store, setStore] = useState<IStore>();
    const [food, setFood] = useState<IFood>();
    const [note, setNote] = useState<string>('')
    const { id } = useParams();
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;
    const userId = getData.id



    const [value, setValue] = useState<number | null>(0)


    const [comment, setComment] = useState<string | any>();

    // const handleRating = () => {
    //     const formData = new FormData();
    //     formData.append(
    //         "data",
    //         JSON.stringify({
    //             user: userId,
    //             rate: value,
    //             food: foodSelected
    //         })

    //     )
    //     fetch(`http://localhost:1337/api/rates`, {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //             Authorization: `Bearer ${jwt}`,
    //         },
    //         body: formData
    //     })
    // }

    const handleAddComment = () => {
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                user: userId,
                food: foodSelected,
                comment: comment
            })
        );
        fetch(`http://localhost:1337/api/comments`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: formData
            }
        ).then(() => {
            successToast();
            toggleModal();

        }).catch((err) => {
            console.log("Error")
        })
    }






    const successToast = () => {
        toast.success("Đặt hàng thành công", {
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

    const handleSubmit = (e: any) => {
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                user: userId,
                orders: id,
                food: foodSelected,
                note: note
            })
        );

        fetch(`http://localhost:1337/api/order-items`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: formData
            }
        ).then(() => {
            successToast();
            toggleModal();

        }).catch((err) => {
            console.log("Error", err)
        })
    }






    useEffect(() => {
        (async () => {
            const data = await axios.get(`http://localhost:1337/api/orders/${id}?populate=*`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            const ida = data.data.data.attributes.store.data.id


            await axios.get(`http://localhost:1337/api/stores/${ida}?populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((res) => {
                setStore(res.data.data)

            }).catch(() => {
                console.log('err')
            })
        })

            ();

    }, [foodSelected, id, jwt, order?.attributes.store.data.id])

    const toggleModal = async (id?: number) => {
        if (id) {
            await axios.get(`http://localhost:1337/api/foods/${id}?populate[0]=comments&populate[1]=comments.user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((res) => {
                setFood(res.data.data)
                console.log(res.data.data)

            }).catch((err) => {
                console.log(err)

            })
        }
        setModal(!modal)
    }

    if (modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal")
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
            <div className="mt-20">
                <h1 className='w-full text-center font-bold text-3xl pt-4'>{order?.attributes.title}</h1>
                <div className='mt-10 relative'>
                    <div className='w-full'>
                        <div className='flex'>
                            <div className='flex-1 justify-center flex'>
                                <img src={defaultImg} alt="" className='w-96' />
                            </div>
                            <form className='flex-1'>
                                <h2 className='font-semibold text-3xl my-1'>{store?.attributes.storeName}</h2>
                                <div className='my-3 flex'>
                                    Rate
                                </div>
                                <div className='flex'>
                                    <FaMoneyBillWave className="text-3xl text-blue-600" />
                                    <p className='ml-3'>: 72 000vnđ</p>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className='ml-20 mt-10 flex items-center font-bold text-lg'>Xem thêm các món ăn</div>
                    <div className='mt-5 grid grid-cols-3 gap-7 mx-5'>
                        {
                            store && store?.attributes.foods.data.map((food) => (
                                <button onClick={() => {
                                    toggleModal(food.id);
                                    setFoodSelected(food.id)
                                }} key={food.id} className='flex border-[1px] h-24 items-center'>
                                    <div className='ml-3'>
                                        <img src={defaultImg} alt="No Food img founded" className='w-16 h-16' />
                                    </div>
                                    <div className='ml-5'>
                                        <h3 className='font-medium text-lg'>{food.attributes.foodName}</h3>
                                        <p className='text-xs'>{food.attributes.price} vnd</p>
                                        <div>
                                            Component star reate
                                        </div>
                                    </div>
                                </button>
                            ))
                        }
                        {modal && (
                            <div className="modal">
                                <div className="overlay">
                                    <div className="modal-content">
                                        <div className='mb-3 font-bold'>
                                            Chi tiết sản phẩm
                                        </div>
                                        <button className="close-modal" onClick={() => toggleModal()}>
                                            <AiFillCloseCircle />
                                        </button>

                                        {food &&
                                            <div className='flex'>
                                                <img src={defaultImg} alt="" className=' h-36 mr-4' />
                                                <div className='ml-2'>
                                                    <h3 className='font-bold text-2xl'>{food.attributes.foodName}</h3>
                                                    <p className='text-lg'>{food.attributes.price} vnđ</p>
                                                    <p className='my-[2px] flex'>
                                                        <Rating
                                                            value={value}
                                                            onChange={(e, newValue) => {
                                                                setValue(newValue)
                                                            }}
                                                            onClick={handleRating}
                                                        />
                                                    </p>
                                                    <input type="text"
                                                        className='rounded-sm mb-1 focus:outline-none pl-2 w-full'
                                                        placeholder='Note'
                                                        value={note}
                                                        name="note"
                                                        onChange={(e) => setNote(e.target.value)}
                                                    />
                                                    <PrimaryButton
                                                        height={30}
                                                        width={75}
                                                        fontsize={14}
                                                        fontWeight={700}
                                                        onClick={handleSubmit}>
                                                        Đặt hàng
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        }

                                        <h2 className='font-semibold my-1'>
                                            Bình luận và đánh giá
                                        </h2>
                                        <div className='w-full'>
                                            <textarea
                                                placeholder='Thêm bình luận'
                                                className='w-full focus:outline-none px-3 pt-1 rounded-md'
                                                value={comment}
                                                name="comment"
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                            <div className='flex w-full justify-end'>
                                                <button onClick={handleAddComment} className='bg-blue-400 items-center flex w-20 justify-center font-bold text-sm h-7 rounded-md'>
                                                    Bình luận
                                                </button>
                                            </div>
                                        </div>
                                        <h2 className="my-1 font text-gray-500">Tất cả bình luận</h2>
                                        <div className='h-36 overflow-hidden overflow-y-scroll'>
                                            {
                                                food && food.attributes.comments.data.map((comment: any) => (
                                                    <div key={comment.id} className='flex items-center mb-5'>
                                                        <img src={defaultImg} alt="" className='w-14 h-14' />
                                                        <div className="ml-4">
                                                            <h3 className='font-semibold'>{comment.attributes.user.data.attributes.username}</h3>
                                                            <p className='text-sm'>{comment.attributes.comment}</p>
                                                            <div className='flex gap-2'>
                                                                <img src={defaultImg} alt="" className='w-16' />
                                                                <img src={defaultImg} alt="" className='w-16' />
                                                                <img src={defaultImg} alt="" className='w-16' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default OrderDetail