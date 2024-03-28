export default function CardPlacehoderSkeleton() {
    return (
      <>
        <div className="w-full flex items-center flex-col bg-gray-700 rounded-lg">
          <div className="flex flex-col bg-gray-700 shadow-md rounded-md items-center">
            <div className="flex items-center p-4">
              <div className="mr-2 h-8 w-10 rounded-full overflow-hidden relative bg-gray-500 placeholder"></div>
              <div className="flex flex-col justify-between items-center">
                <div className="mb-2 h-5 w-40 overflow-hidden relative bg-gray-500 placeholder"></div>
              </div>
            </div>
            <div className="h-52 w-full overflow-hidden relative bg-gray-500 placeholder"></div>
            <div className="flex flex-col p-4">
              <div className="flex">
                <div className="flex h-5 w-5 overflow-hidden relative bg-gray-500 mr-1 placeholder"></div>
                <div className="flex h-5 w-48 overflow-hidden relative bg-gray-500 placeholder"></div>
              </div>
              <div className="flex mt-1">
                <div className="flex h-5 w-5 overflow-hidden relative bg-gray-500 mr-1 placeholder"></div>
                <div className="flex h-5 w-48 overflow-hidden relative bg-gray-500 placeholder"></div>
              </div>
            </div>
            <div className="w-full h-px overflow-hidden relative bg-gray-500 m-4 placeholder"></div>
            <div className="flex justify-between items-center p-4 w-full">
              <div className="mr-2 h-10 w-16 overflow-hidden relative bg-gray-500 placeholder"></div>
              <div className="mb-2 h-5 w-20 overflow-hidden relative bg-gray-500 placeholder"></div>
            </div>
          </div>
        </div>
  
        <style>
          {`
            .placeholder::after {
              content: " ";
              box-shadow: 0 0 50px 9px rgba(254, 254, 254);
              position: absolute;
              top: 0;
              left: -100%;
              height: 90%;
              animation: load 0.7s infinite;
            }
  
            @keyframes load {
              0% {
                left: -100%;
              }
              100% {
                left: 150%;
              }
            }
          `}
        </style>
      </>
    );
  }
  