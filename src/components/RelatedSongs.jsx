import SongBar from "./SongBar";
const RelatedSongs = ({
  data,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
  artistId,
  activeSong
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song,i) => (
        <SongBar key={`${song.key}-${artistId}`} song={song} i={i} activeSong={activeSong}handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} isPlaying={isPlaying}/>
      ))}
    </div>
  </div>
);

export default RelatedSongs;
