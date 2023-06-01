interface AuthButtonProps {
    height: number;
    width: number;
    fontsize: number;
    fontWeight: number;
    children: React.ReactNode;
    onClick: () => void;
}

export const AuthButton = ({
    height,
    width,
    fontsize,
    fontWeight,
    onClick,
    children
}: AuthButtonProps): JSX.Element => {
    return (
        <button style={{ width: `${width}px`, height: `${height}px`, fontSize: `${fontsize}px`, fontWeight: `${fontWeight}` }}
            onClick={onClick}
            className="rounded-2xl bg-[#FFCB45] text-[#1D1D1D]">
            {children}
        </button>
    )
}

export default AuthButton;