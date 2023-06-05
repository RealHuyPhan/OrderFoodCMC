
interface InputNormalProps {
  type?: string;
  placeholder?: string;
}

export const InputNormal = ({
  type,
  placeholder,
}: InputNormalProps): JSX.Element => {
  return (
    <div className="w-full flex h-11 ">
      <div className="flex items-center w-full h-full border-[1px] justify-center">
        <div className="flex w-11/12 h-full items-center ">
          <input
            type={type}
            placeholder={placeholder}
            className="w-full border-none focus:outline-0 "
          />
        </div>
      </div>
    </div>
  );
};

export default InputNormal;
