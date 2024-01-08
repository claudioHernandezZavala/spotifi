import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery
} from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {  id: artistId } = useParams();
  const { data: artistData, isFetching: isFetchingArtistDetails,error } =
    useGetArtistDetailsQuery(artistId);
    console.log(artistData)


  if (isFetchingArtistDetails)return <Loader title={"Searching Artist information..."}/>
  if(error) return <Error/>
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData.data[0]} />
     
      <p className="text-white text-2xl p-4">
        {
          artistData.data[0]?.attributes?.artistBio
        }
      </p>
    </div>
  );
};

export default ArtistDetails;
