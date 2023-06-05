import { FaLock } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

interface InputPasswordFormProps {
  type?: string;
  placeholder?: string;
}

export const InputPasswordForm = ({
  type,
  placeholder,
}: InputPasswordFormProps): JSX.Element => {
  return (
    <div className="w-full flex h-11 ">
      <div className="flex items-center w-full h-full border-[1px] justify-start">
        <div className="flex w-11/12 h-full items-center ">
          <div className="w-2/12 flex justify-center">
            <FaLock />
          </div>

          <input
            type={type}
            placeholder={placeholder}
            className=" border-none focus:outline-0 "
          />
        </div>
        <div className="w-1/6 flex justify-center">
          <AiOutlineEye />
        </div>
      </div>
    </div>
  );
};

export default InputPasswordForm;
