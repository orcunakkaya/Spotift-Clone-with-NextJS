import { getPlaylist } from '@/actions/actions';
import MusicCard from '@/components/MusicCard';
import Time from '../../../../public/assets/Time';
import PlaylistPagesHeader from '@/components/PlaylistPagesHeader';

export const revalidate = 0;

const Home = async ({ params }) => {
    const playList = await getPlaylist({id: params.id});
  
    return (
        <div className='text-white'>
        <PlaylistPagesHeader playlist={playList} />
        <div className='text-subdued px-4 gap-x-4 grid grid-cols-custom-layout h-8 items-center max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm border border-transparent border-b-hoverBackgroundColor mb-4'>
            <span>#</span>
            <div className='text-sm'>Başlık</div>
            <div></div>
            <div className='text-sm max-xl:hidden'>Albüm</div>
            <div className='max-2xl:hidden text-sm'>Eklenme Tarihi</div>
            <div className='flex relative items-center'><div className='absolute left-2'><Time /></div></div>
        </div>
        {
            playList.songs.map((music, index) => (
                <MusicCard key={index} music={music} order={index} />
            ))
        }
    </div>
    )
}

export default Home