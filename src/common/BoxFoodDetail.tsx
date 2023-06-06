interface BoxFoodDetailProps
{
    tiltle?:string;
    imgUrl?:string;
    money?:string;
    children?: React.ReactNode;
}

export const BoxFoodDetail = (
    {
        tiltle,
        imgUrl,
        money,
        children
    }: BoxFoodDetailProps):JSX.Element =>{
        return (
            <div className="w-[360px] h-[100px] flex rounded-md bg-white border-[2px]">
                <div className="w-1/3">
                    <img className="w-full h-full bg-center bg-no-repeat bg-cover" alt="Img" src={imgUrl}/>
                </div>

                <div className="w-2/3 flex flex-col justify-start">
                    {children}
                    <p className="ml-2">{tiltle}</p>
                    <p className="ml-2">{money}</p>
                </div>
            </div>
        )
    }

export default BoxFoodDetail;