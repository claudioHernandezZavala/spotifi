import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
const CountryTracks = () => {
  const [country, setCountry] = useState("second");
  const [loading, setloading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  console.log(country);
  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_ZwRTJPcEUOAAgJZOSNj2RxgNdIaR0"
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, [country]);
  if (isFetching && loading)
    return <Loader title={"Loading songs around you"} />;
  if(error&&country) return <Error/>

  return <div className="flex flex-col">
    <h2 className="font-bold text-white text-left mt-4 mb-10">
        Around you    <span className="font-black">{country}</span>
    </h2>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {
            data?.map((song,i)=>(
                <SongCard
                key={song.key}
                activeSong={activeSong}
                song={song}
                i={i}
                data={data}
                isPlaying={isPlaying}
                
                
                />
            ))
        }
    </div>
  </div>;
};

export default CountryTracks;
