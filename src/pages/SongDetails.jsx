import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid, id: artistId } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song,i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  if (isFetchingSongDetails||isFetchingRelatedSongs)return <Loader title={"Searching song information..."}/>
  return (
    <div className="flex flex-col">
      <DetailsHeader artisId={artistId} songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base">Sorry No lyrics found!</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying ={isPlaying}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        artistId={artistId}
        activeSong={activeSong}
      />
    </div>
  );
};

export default SongDetails;
