import { text } from '@fortawesome/fontawesome-svg-core';
import { BsSearch } from 'react-icons/bs'

interface SearchProps
{
    height?:number;
    width?:number;
    fontsize?:number;
    fontWeight?:number;
    placeholder?:string;
    type?:string;
}

export const BigSizeSearch = (
{
    height,
    width,
    fontsize,
    fontWeight,
    placeholder,
    type,
}: SearchProps):JSX.Element =>{
    return(
        <div className='flex items-center justify-center'>
                        <div className='flex items-center w-2/3 h-12 border-[1px] rounded-full bg-gray-200'>
                            <BsSearch className="m-4" />
                            <input type={type} placeholder={placeholder} style={{ width: `${width}px`, height: `${height}px`, fontSize: `${fontsize}px`, fontWeight: `${fontWeight}px` }}
                            className=" bg-gray-200 text-[#1D1D1D]"/>
                        </div>
                    </div>
    )
}

export default BigSizeSearch;  