import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const CardSkeleton = () => {
  return (
    <>

    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow  transition-transform transform hover:scale-105">
        <a href="#">
          <Skeleton height={200} width={371}/>
        </a>
        <div className="p-5">
            
                <Skeleton/>
            
            <Skeleton/>
            {/* Last details section */}
            <div className='inline-flex space-x-5'>
            <Skeleton/>
            <Skeleton/>
            

            </div>
        </div>
    </div>
    </>
  )
}

export default CardSkeleton