import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
const TopCharts = () => {
 
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching && loading)
    return <Loader title={"Loading Top charts"} />;
  if(error&&country) return <Error/>

  return <div className="flex flex-col">
    <h2 className="font-bold text-white text-left mt-4 mb-10">
      Discover top charts 
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

export default TopCharts;
