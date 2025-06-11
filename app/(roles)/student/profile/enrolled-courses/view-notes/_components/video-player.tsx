type VideoPlayerProps = {
    videoUrl:string,
    title:string
}
const VideoPlayer = ({ videoUrl, title }:VideoPlayerProps) => {
    return (
      <div className=" aspect-video w-full rounded-lg overflow-hidden bg-black">
        <iframe
          src={videoUrl}
          title={title}
          className="w-full h-full"
         
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };
  export default VideoPlayer