import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import HeadNav from "../../../common/HeadNav";
import axios from 'axios';
import { IFood, IOrder, IStore } from '../type';
import { ToastContainer, toast } from 'react-toastify';
import OrderVote from './OrderVote/OrderVote';
import OrderItem from './OrderItem/OrderItem';


function OrderDetail() {
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState<number | null>(0)
    const [foodSelected, setFoodSelected] = useState<number>();
    const [order, setOrder] = useState<IOrder>()
    const [store, setStore] = useState<IStore>([]);
    const [food, setFood] = useState<IFood>();
    const [note, setNote] = useState<string>('')
    const { id } = useParams();
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;
    const userId = getData.id

    const [comment, setComment] = useState<string | any>();

    const handleRating = (newValue: number) => {
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                user: userId,
                rate: newValue,
                food: foodSelected
            })

        )
        fetch(`http://localhost:1337/api/rates`, {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            body: formData
        })
    }

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

        }).catch(() => {
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
            setOrder(data.data.data)
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

    }, [foodSelected, id, jwt])

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
                <div className='mt-10 relative'>
                    <div className='pt-3 flex items-center text-2xl justify-center'>
                        <h1 className='font-bold mr-2 '>Tên đơn:</h1> <p>{order?.attributes.title}</p>
                    </div>
                    {
                        store?.attributes?.foods?.data ?
                            (<OrderItem
                                store={store}
                                toggleModal={toggleModal}
                                setFoodSelected={setFoodSelected}
                                modal={modal}
                                food={food}
                                handleRating={handleRating}
                                setValue={setValue}
                                value={value}
                                setNote={setNote}
                                note={note}
                                handleSubmit={handleSubmit}
                                comment={comment}
                                setComment={setComment}
                                handleAddComment={handleAddComment}
                            />) : (<OrderVote orderId={id}/>)
                    }
                </div>
            </div >
        </>
    )
}

export default OrderDetail

