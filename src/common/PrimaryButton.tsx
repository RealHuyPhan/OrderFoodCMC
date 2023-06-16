interface PrimaryButtonProps {
    height: number;
    width: number;
    fontsize: number;
    fontWeight: number;
    children: React.ReactNode;
    onClick?: () => void;
}

export const PrimaryButton = ({
    height,
    width,
    fontsize,
    fontWeight,
    onClick,
    children
}: PrimaryButtonProps): JSX.Element => {
    return (
        <button style={{ width: `${width}px`, height: `${height}px`, fontSize: `${fontsize}px`, fontWeight: `${fontWeight}` }}
            onClick={onClick}
            className="rounded-2xl bg-[#FFCB45] text-[#1D1D1D]">
            {children}
        </button>
    )
}

export default PrimaryButton;