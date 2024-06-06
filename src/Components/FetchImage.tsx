import React, { useState, useEffect } from 'react';

function FetchImage() {
    const [imgurl, setImgUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = 'HD6H7V2ntuv92VFcSnG6EQ3t8OYVP4hsVXjkbZDVEr3dV1wZsOnliBif';
                const response = await fetch(`https://api.pexels.com/v1/search?query=hotel%20room&per_page=1&page=${Math.floor(Math.random() * 100) + 1}`, {
                    headers: {
                        Authorization: apiKey
                    }
                });
                const data = await response.json();
                setImgUrl(data.photos[0].src.original);
                console.log(data.photos[0].src.original); // Outputs the URL of the hotel room image
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <img src={imgurl} alt="" />
        </div>
    );
}

export default FetchImage;
