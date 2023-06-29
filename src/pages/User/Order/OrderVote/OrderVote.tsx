import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IStore } from '../../type';
import defaultImg from '../../../../assets/defaultFoodStore.png'


function OrderVote({ orderId }) {
    const [title, setTitle] = useState<string | any>();
    const [stores, setStores] = useState<IStore>();
    const [modal, setModal] = useState(false)
    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;

    console.log(orderId)

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                title: title,
                order: orderId
            })
        );
        fetch(`http://localhost:1337/api/votes`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: formData
            })
    }


    useEffect(() => {
        axios.get(`http://localhost:1337/api/stores`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => {
            setStores(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [jwt])



    console.log(stores)

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal")
    } else {
        document.body.classList.remove("active-modal");
    }
    return (
        <>
            <button onClick={toggleModal} className='bg-slate-300 w-28 h-11 font-bold rounded-md ml-3'>
                Tạo vote
            </button>
            {modal && (
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <h2 className="flex justify-center items-center border-b-[2px] pb-2">
                                Tạo vote
                            </h2>
                            <form className='w-full'
                                onSubmit={handleSubmit}
                            >
                                <div className='flex w-full justify-center'>
                                    <input
                                        type="text"
                                        placeholder='Nhập tiêu đề..'
                                        className='w-3/4 pl-3 focus:outline-none mt-2'
                                        value={title}
                                        name="title"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className='flex w-full justify-center '>
                                    <button
                                        type='submit'
                                        className='mt-8 bg-blue-400 h-10 w-20 rounded-full'>
                                        Xác nhận
                                    </button>
                                </div>

                            </form>

                            <button className="close-modal" onClick={toggleModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="flex justify-center"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='w-full'>
                <div className='mx-9 h-96 overflow-y-scroll '>
                    {stores && stores.map((store: any) => (
                        <div key={store.id} className='flex h-20 items-center border-[1px] my-3 rounded-lg'>
                            <div className='flex items-center justify-between w-full mx-6'>
                                <div className='flex'>
                                    <input type="checkbox"  className='mr-2' />
                                    <p>{store.attributes.storeName}</p>
                                </div>
                                <div className='flex items-center'>
                                    {/* <p className='mr-3 font-semibold'>2 people vote this</p> */}
                                    <img src={defaultImg} alt="No Food img founded" className='w-14 h-14' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default OrderVote