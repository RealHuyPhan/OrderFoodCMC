import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IStore } from '../../type';
import defaultImg from '../../../../assets/defaultFoodStore.png'


function OrderVote({ orderId }) {
    const [stores, setStores] = useState<IStore>()
    const [modal, setModal] = useState(false);
    const [voteTitle, setVoteTitle] = useState<string>()
    const [storeIdSelected, setStoreIdSelected] = useState<number>();

    const getData = JSON.parse(localStorage.getItem("user") || "{}");
    const jwt = getData.jwt;
    const formData = new FormData();

    const handleOnClick = (storeId: number) => {
        setStoreIdSelected(storeId !== storeIdSelected ? storeId : undefined);
    };



    useEffect(() => {
        const getStore = () => {
            axios.get(`http://localhost:1337/api/stores`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }).then((res) => {
                setStores(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }


        getStore();
    }, [jwt])

    const handleCreateVote = (e: any) => {
        e.preventDefault();
        formData.append(
            "data",
            JSON.stringify({
                title: voteTitle,
                order: orderId
            })
        )

        fetch(`http://localhost:1337/api/votes`, {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            body: formData,
        }).then(() => {
            setModal(!modal);
        }).catch(() => {
            console.log('fail')
        })
    }


    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    return (
        <>
            <button onClick={toggleModal} className='bg-slate-300 w-28 h-11 font-bold rounded-md ml-3'>
                <p>Tạo vote</p>
            </button>
            <h3 className="text-center">{voteTitle}</h3>

            {/* Modal */}
            {modal && (<div className="modal">
                <div className="overlay">
                    <div className="modal-content bg-white">
                        <h2 className="flex  items-center pb-2 font-bold text-2xl text-[#1C9AD6]">
                            Tạo vote
                        </h2>
                        <div className='w-full'>
                            <div className='flex w-full justify-center'>
                                <input
                                    type="text"
                                    placeholder='Nhập tiêu đề..'
                                    className='w-4/5 pl-3 focus:outline-none mt-2 bg-slate-200'
                                    value={voteTitle || ""}
                                    // name="voteTitle"
                                    onChange={(e) => setVoteTitle(e.target.value)}
                                />
                            </div>
                            <div className='flex w-full justify-center gap-2'>
                                <button
                                    onClick={handleCreateVote}
                                    className='mt-8 bg-[#1C9AD6] h-10 w-20 rounded-xl'>
                                    Xác nhận
                                </button>
                                <button
                                    onClick={toggleModal}
                                    className='mt-8 bg-[#1C9AD6] h-10 w-20 rounded-xl'>
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}

            {stores && stores.map((store: any) => (
                <div key={store.id}

                    className={`w-full cursor-pointer ${storeIdSelected === store.id ? "border-blue-500" : ""}`}
                    onClick={() => handleOnClick(store.id)}
                >
                    <div className='mx-9'>
                        <div className='flex h-20 items-center border-[1px] my-3 rounded-lg'>
                            <div className='flex items-center justify-between w-full mx-6'>
                                <div className='flex'>
                                    <input type="checkbox"
                                        checked={storeIdSelected === store.id}
                                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                                        onChange={e => { }}
                                        className='mr-2 w-5' />
                                    <p title={store.attributes.storeName}>
                                        {store.attributes.storeName}
                                    </p>
                                </div>
                                <div className='flex items-center'>
                                    {/* <p className='mr-3 font-semibold'>2 people vote this</p> */}
                                    <img src={defaultImg} alt="No Food img founded" className='w-14 h-14  hover:scale-150' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default OrderVote