import SearchBarMain from "./SearchBarMain";
// Hero Section
const HeroSection = () => {
  const handleSubmit = (data: Object) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className=" w-96 ">
          {/* <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Last Minute Deals
          </h1> */}
          <h1 className="p-10 font-bold text-center mb-4 text-4xl font-MontserratBold ">
            Last Minute Deals
          </h1>
          <SearchBarMain handleOnSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
