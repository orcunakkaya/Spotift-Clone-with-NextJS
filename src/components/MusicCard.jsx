"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Dots from "../../public/assets/Dots";
import msToMinutesAndSeconds from "@/utils/time";
import dynamic from "next/dynamic";
import Play from "../../public/assets/Play.jsx";

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
    setIsOpen(false);
  };

  return (
    <>
      <div className={`group text-subdued hover:text-white grid grid-cols-custom-layout px-4 gap-x-4 border border-transparent h-14 items-center max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm ${!isOpen && 'hover:bg-hoverBackgroundColor'} rounded ${isOpen && 'bg-tinted text-white'}`}>
        <span className="text-base group-hover:hidden">{order + 1}</span>
        <span className="text-white hidden group-hover:block">{
          <Play />
    
      }</span>
        <Image
          src={music.image}
          alt={music.name}
          width={40}
          height={40}
          className=""
        />
        <div>
          <div className="text-white text-base overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
            {music.name}
          </div>
          <div className=" text-sm overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
            {music.artistName}
          </div>
        </div>
        <div className="text-sm max-xl:hidden overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
          {music.albumName}
        </div>
        <div className="text-sm max-2xl:hidden text-subdued">
          {music.release_date}
        </div>
        <div className="flex flex-nowrap gap-x-2 justify-between relative">
          <div className="text-sm text-ellipsis whitespace-normal line-clamp-1 text-subdued">
            {msToMinutesAndSeconds(music.duration_ms)}
          </div>
          <button
            type="button"
            className="flex justify-center items-center text-white"
            id="menu-button"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
            
          >
            <Dots />
          </button>
          {isOpen && (
          <div className="absolute mt-8 right-0 bg-transparent border-none border rounded shadow-md z-10" ref={dropdownRef}>
            <Dropdown onSelect={handleSelect} music={music} setIsMainOpen={setIsOpen} />
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default MusicCard;