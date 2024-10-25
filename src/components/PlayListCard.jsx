import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PlayListCard = ({ item }) => {
  return (
    <Link href={'/'} className='rounded-md p-3 flex flex-col gap-2 hover:bg-highlight'>
        <Image 
            src={item.images[0].url}
            alt={item.description}
            width={180}
            height={180}
            priority
        />
        <div className='font-normal text-base'>{item.name}</div>
        <div className='text-sm text-subdued'>{item.description}</div>
    </Link>
  )
}

export default PlayListCard;