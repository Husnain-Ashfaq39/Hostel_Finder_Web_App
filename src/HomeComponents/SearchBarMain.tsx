import { useForm, FieldValues } from "react-hook-form";

interface Props {
  handleOnSubmit: (data: Object) => void;
}


const SearchBarMain = (props:Props) => {
  const {handleOnSubmit}=props;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    handleOnSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit((data)=>{})}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          {...register("search", { required: true })}
          type="search"
          id="default-search"
          className="block outline-none shadow-md w-full p-4 ps-7 text-sm text-gray-900 border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:white dark:white dark:placeholder-gray-400 dark:black dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-300 ease-in-out"
          placeholder="Explore available hostels..."
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBarMain;
