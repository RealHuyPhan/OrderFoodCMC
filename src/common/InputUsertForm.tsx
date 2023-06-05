import { FaUserAlt } from "react-icons/fa";

interface InputUsertFormProps {
  type?: string;
  placeholder?: string;
}

export const InputUsertForm = ({
  type,
  placeholder,
}: InputUsertFormProps): JSX.Element => {
  return (
    <div className="w-full flex h-11 ">
      <div className="flex items-center w-full h-full border-[1px] justify-start">
        <div className="flex w-11/12 h-full items-center ">
          <div className="w-2/12 flex justify-center">
            <FaUserAlt />
          </div>

          <input
            type={type}
            placeholder={placeholder}
            className=" border-none focus:outline-0 "
          />

          
        </div>
      </div>
    </div>
  );
};

export default InputUsertForm;
