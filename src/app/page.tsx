import React from "react";
import Image from "next/image";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-black text-white font-sans overflow-x-hidden"
      style={{ backgroundColor: "black" }}
    >
      {/* Emergency Banner */}
      <div className="mx-auto w-10/12 max-w-3xl my-5">
        <div className="bg-white text-black text-center py-1">
          <p className="font-medium text-sm">
            FOR EMERGENCY CALL : 01792660291 , 01728144233
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative px-[10%] min-h-[90vh]">
        {/* Background Hand Image - Full Size */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/home.png"
            alt="Hand reaching out"
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "right center",
            }}
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full">
          {/* Project Title - Left Column */}
          <div className="w-1/2">
            <div className="flex items-start mb-8">
              <h1 className="text-5xl font-bold leading-none">
                PROJECT <br />
                AEROAID
              </h1>
            </div>
          </div>

          {/* Project Description - Right Column */}
          <div className="w-1/2 text-right break-words flex items-end ml-auto">
            <p className="text-[8px]">
              WELCOME TO OUR BLOOD DONATION NETWORK!
              <br />
              JOIN US IN MAKING A LIFE-SAVING DIFFERENCE. OUR COMMUNITY
              COMPRISES DEDICATED AVIATION STUDENTS AND AIRLINE PROFESSIONALS
              WHO ARE COMMITTED TO HELPING OTHERS. TOGETHER, WE CAN ENSURE THAT
              NO ONE IS LEFT IN NEED.
              <br /> <br />
              GET INVOLVED, DONATE BLOOD, AND BE A HERO TODAY!
            </p>
            
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="px-[10%] mb-24">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">ABOUT US</h2>
        <p className="max-w-4xl text-sm md:text-base">
          PROJECT AEROAID IS A DHAKA-BASED BLOOD DONATOR'S PORTAL THAT PRIMARILY
          SERVES THE AVIATION COMMUNITY OF BANGLADESH. THE BLOOD DOORS
          REGISTERED HERE ARE MOSTLY AVIATION STUDENTS AND PROFESSIONALS WORKING
          IN VARIOUS TRAINING INSTITUTES AND AIRLINES.
        </p>
        <a href="/search">
          <button className="bg-yellow-400 text-black font-semibold px-6 py-2 mt-4 rounded hover:bg-yellow-500 transition-colors">
            SEARCH FOR DONOR
          </button>
        </a>
      </div>

      {/* Team Section */}
      <div className="px-[10%] mb-16">
        <div className="flex items-start mb-12">
          <div className="w-4 h-4 bg-red-600 mt-3 mr-2"></div>
          <h2 className="text-5xl md:text-6xl font-bold">OUR TEAM</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-600 overflow-hidden mb-3">
                <Image
                  src="/avatar-placeholder.jpg"
                  alt="Team member"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center">PERSON 1</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 mt-auto">
        <p>POWERED BY YOUTH NOTION</p>
      </div>
    </div>
  );
};

export default Home;
