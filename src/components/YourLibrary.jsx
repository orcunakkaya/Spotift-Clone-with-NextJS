import React from "react";
import Library from "../../public/assets/Library";
import Plus from "../../public/assets/Plus";
import Footer from "./Footer";

const YourLibrary = () => {
  return (
    <div className="bg-boxBackgroundColor rounded-lg px-4 pt-3 pb-2 flex flex-col gap-y-2 h-full justify-between grow overflow-auto">
      <div className="flex justify-between items-center ">
        <button className="text-linkColor flex items-center gap-x-5 hover:text-white">
          <Library />
          <div className="font-bold text-base">Kitaplığın</div>
        </button>
        <button className="text-linkColor hover:text-white hover:bg-white hover:bg-opacity-25 p-2 rounded-full">
          <Plus />
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default YourLibrary;
