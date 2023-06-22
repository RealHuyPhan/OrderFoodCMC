import HeadNav from '../../common/HeadNav'
import defaultFood from '../../assets/default_food_img.png'
import { BsSearch } from 'react-icons/bs'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListStore() {
    const [value, setValue] = useState<number | undefined>(0);
    const [q, setQ] = useState<any>()
    const [searchInput, setSearchInput] = useState<string>("")

    const getData = JSON.parse(localStorage.getItem("user") || '{}');
    const jwt = getData.jwt;

    useEffect(() => {
        const handleSearch = () => {
            const url = "http://localhost:7700/indexes/store/search"
            axios.post(url,
                {
                    q: searchInput,
                    limit: 5
                },
                {
                    headers: {
                        Authorization: "Bearer masterKey",
                        "Content-Type": "application/json"
                    }
                }
            ).then((res) => {
                setQ(res)
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
        handleSearch();
    }, [jwt, searchInput])

    return (
        <div>
            <HeadNav />
            <div className='mt-28 relative'>
                <div className='w-full'>
                    <h1 className='font-semibold text-4xl mb-7 flex items-center justify-center'>List cửa hàng</h1>
                    <div className='flex items-center justify-center'>
                        <div className='flex items-center w-2/3 h-12 border-[1px] rounded-full'>
                            <BsSearch className="m-4" />
                            <input
                                type="text"
                                placeholder='Search'
                                className='w-full focus:outline-none'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10 grid grid-cols-3 gap-7 mx-5'>
                {
                    q && q.data.hits.map((list: any) => (
                        <Link to={`${list.id}/foods`}
                            key={list.id}
                            className='flex border-[1px] h-24 items-center'>
                            <div className='ml-3'>
                                <img src={defaultFood} alt="No Food img founded" className='w-16 h-16' />
                            </div>
                            <div className='ml-5'>
                                <h3 className='font-medium text-lg'>
                                    {list.storeName}
                                </h3>
                                <p className='text-xs'>Cách đây 0.6km</p>
                                <div>
                                    Rate star
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
