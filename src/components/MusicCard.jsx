"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Dots from "../../public/assets/Dots";
import msToMinutesAndSeconds from "@/utils/time";
import Play from "../../public/assets/Play";
import dynamic from "next/dynamic";
const Dropdown = dynamic(() => import("./Dropdown"), { ssr: false });

const MusicCard = ({ music, order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    console.log("Selected:", option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="group text-subdued grid grid-cols-custom-layout px-4 gap-x-4 border border-transparent h-14 items-center max-2xl:grid-cols-custom-layout-md hover:bg-hoverBackgroundColor rounded">
        <span className="text-base group-hover:hidden">{order + 1}</span>
        <span className="text-white hidden group-hover:block">{<Play />}</span>
        <Image
          src={music.track.album.images[0].url}
          alt={music.track.album.name}
          width={40}
          height={40}
          className=""
        />
        <div className="">
          <div className="text-white text-base overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
            {music.track.name}
          </div>
          <div className="text-subdued hover:text-white text-sm overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
            {music.track.album.artists.map((artist) => artist.name).join(", ")}
          </div>
        </div>
        <div className="text-sm overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
          {music.track.album.name}
        </div>
        <div className="text-sm max-2xl:hidden">
          {music.track.album.release_date}
        </div>
        <div className="flex flex-nowrap gap-x-2 justify-between relative">
          <div className="text-sm text-ellipsis whitespace-normal line-clamp-1">
            {msToMinutesAndSeconds(music.track.duration_ms)}
          </div>
          <button
            type="button"
            className="flex justify-center items-center"
            id="menu-button"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
            
          >
            <Dots />
          </button>
          {isOpen && (
          <div className="absolute mt-2 right-0 bg-white border rounded shadow-md" ref={dropdownRef}>
            <Dropdown onSelect={handleSelect}  />
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default MusicCard;

