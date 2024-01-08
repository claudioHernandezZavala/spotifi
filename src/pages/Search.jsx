import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";
const Search = () => {
  const {searchTerm} = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const songs =data?.tracks?.hits?.map((song)=> song.track)
  if (isFetching )
    return <Loader title={"Loading Top charts"} />;
  if(error) return <Error/>

  return <div className="flex flex-col">
    <h2 className="font-bold text-white text-left mt-4 mb-10">
      Showing results for  <span className="font-black">{searchTerm}</span>
    </h2>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {
            songs?.map((song,i)=>(
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

export default Search;
