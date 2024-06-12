import React from 'react';

interface ReviewProps {
  username: string;
  message: string;
}

const Review: React.FC<ReviewProps> = ({ username, message }) => {
  return (
    <div className="flex justify-center items-center px-4 w-full">
      <div className="w-full hover:shadow-lg rounded-lg border">
        <div className="flex justify-center items-start flex-col p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="icon icon-tabler icon-tabler-quote rotate-180 text-sky-500"
            viewBox="0 0 24 24"
          >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <path
              d="M10 11H6a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5M19 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5"
            ></path>
          </svg>

          <div className="flex justify-center items-start flex-col text-left gap-5">
            <p className="italic text-sm md:text-base">{message}</p>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">{username}</h3>
            </div>
          </div>
        </div>
        <div className="bg-sky-500 p-0.5 rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default Review;
