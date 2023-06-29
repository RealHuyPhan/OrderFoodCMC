import React from 'react'
import defaultImg from '../../../../assets/defaultFoodStore.png'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Rating } from '@mui/material';
import PrimaryButton from '../../../../common/PrimaryButton';

function OrderItem({ store, toggleModal, setFoodSelected, modal, food,
    handleRating, setValue, value, note, setNote, handleSubmit, comment,
    setComment, handleAddComment }) {
    return (
        <div className='mt-5 grid grid-cols-3 gap-7 mx-5'>
            {
                store?.attributes?.foods.data.map((food: any) => (
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
                                                    handleRating(newValue || 0)
                                                    setValue(newValue)
                                                }}
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
    )
}

export default OrderItem