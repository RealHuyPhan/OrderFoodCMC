interface LoginButtonProps {
    fontsize: number;
    fontWeight: number;
    children: React.ReactNode;
}

export const LoginButton = ({
    fontsize,
    fontWeight,
    children
}: LoginButtonProps): JSX.Element => {
    return (
        <button style={{ fontSize: `${fontsize}px`, fontWeight: `${fontWeight}` }}
            className="w-full h-1/2 rounded bg-[rgb(0,103,213)] text-white ">
            {children}
        </button>
    )
}

export default LoginButton;