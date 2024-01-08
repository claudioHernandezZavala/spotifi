import {Link} from 'react-router-dom'

const DetailsHeader = ({artistId,artistData,songData}) => 
{
  const artist=artistData?.attributes;
  let artistImageUrl = ""
  let artistName = ""
  let genresName = ""
  if(artistId){
     artistImageUrl = artist?.artwork?.url;
     artistName = artist?.name
     genresName = artist?.genreNames[0]
  }
  console.log("Artist url")
  console.log(artistImageUrl)
return (
  <div className='relative w-full flex flex-col'>
    <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28'/>
      <div className='absolute inset-0 flex items-center'>
        {/* image of artist or song */}
        <img
        alt='art'
          src={artistId?artistImageUrl:songData?.images?.coverart}
        className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
        />
        {/* name of artist or song */}
        <div className='ml-5'>
          <p className='font-bold sm:text-3xl text-xl text-white'>
            {artistId?artistName:songData?.title}
          </p>
          {!artistId&&(
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
            <p className='text-base text-gray-400 mt-2'>
              {songData?.subtitle}
            </p>
            </Link>
          )}
          <p className='text-base text-gray-400 mt-2'>
              {artistId?genresName:songData?.genres?.primary}
          </p>

        </div>

      </div>
      <div className='w-full sm:h-44 h-24'/>
  </div>
)
}

export default DetailsHeader;
