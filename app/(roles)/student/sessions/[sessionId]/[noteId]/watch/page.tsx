import React from 'react'

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_DATA_API;

const videoId = "Cf1hKtrA9lg";
console.log(API_KEY);
fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    const video = data.items;
    console.log({
      video
    });
  }).catch((error) => console.log(error));


const WatchPage = () => {
  return (
    <div>WatchPage</div>
  )
}

export default WatchPage