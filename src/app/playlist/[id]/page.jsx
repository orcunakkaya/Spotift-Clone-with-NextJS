import React from "react";
import getToken from "@/api/auth/getToken";
import { getPlayList } from "@/api/spotify/getPlayList";
import MusicCard from "@/components/MusicCard";
import Time from "../../../../public/assets/Time";
import PlaylistPagesHeader from "@/components/PlaylistPagesHeader";
const Home = async ({ params }) => {
  const token = await getToken();
  const response = await getPlayList(token, params.id);
  const playList = await response.tracks.items.filter(
    (item) => item.track !== null
  );

  return (
    <div className="text-white">
      <PlaylistPagesHeader
        playlist={{
          title: response?.name ?? "",
          playListImage: response?.images[0]?.url ?? "",
          playListCount: playList.length ?? 0,
          hiddenOptions: true,
        }}
        type={"playlist"}
        name={response?.owner?.display_name ?? ""}
      />
      <div className="text-subdued px-4 gap-x-4 grid grid-cols-custom-layout h-8 items-center max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm border border-transparent border-b-hoverBackgroundColor mb-4">
        <span>#</span>
        <div className="text-sm">Başlık</div>
        <div></div>
        <div className="text-sm max-xl:hidden">Albüm</div>
        <div className="max-2xl:hidden text-sm">Eklenme Tarihi</div>
        <div className="flex relative items-center">
          <div className="absolute left-2">
            <Time />
          </div>
        </div>
      </div>
      {playList.map((music, index) => (
        <MusicCard
          key={index}
          music={{
            image: music?.track?.album?.images[0]?.url ?? "",
            name: music?.track?.name,
            artistName: music?.track?.album?.artists
              .map((artist) => artist.name)
              .join(", "),
            albumName: music?.track?.album?.name,
            duration_ms: music?.track?.duration_ms,
            release_date: music?.track?.album?.release_date,
          }}
          order={index}
        />
      ))}
    </div>
  );
};

export default Home;
