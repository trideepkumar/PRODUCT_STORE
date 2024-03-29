import React from "react";

export default function Spinner() {
  return (
    <div>
      <div class="h-screen text-white "  style={{backgrounColor: '#161617'}}>
        <div class="flex justify-center items-center h-full">
          <img
            class="h-16 w-16"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt=""
            className=" text-white"
          />
        </div>
      </div>
    </div>
  );
}
