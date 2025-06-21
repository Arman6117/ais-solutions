"use server";

export async function fetchYouTubeDetails(videoId: string) {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_DATA_API;
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch video details");
  }

  const data = await res.json();

  return data.items?.[0]; // Return the first video item
}
