import { AiOutlineEye } from "react-icons/ai";

interface InputHasEyesProps {
  type?: string;
  placeholder?: string;
}

export const InputHasEyes = ({
  type,
  placeholder,
}: InputHasEyesProps): JSX.Element => {
  return (
    <div className="w-full flex h-11 ">
      <div className="flex items-center w-full h-full border-[1px] justify-center">
        <div className="flex w-10/12 h-full items-center ">
          <input
            type={type}
            placeholder={placeholder}
            className="w-full border-none focus:outline-0 "
          />
        </div>

        <div className="w-1/12 flex justify-center">
          <AiOutlineEye />
        </div>
      </div>
    </div>
  );
};

export default InputHasEyes;
