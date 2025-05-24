import Image from "next/image";
import React from "react";
import KingAIR200 from "../../../public/images/image2/N923AS 2.png";
import KingAIRF90 from "../../../public/images/image2/30 GT 9.png";
import KingAIRB200 from "../../../public/images/image2/132 n 8.png";
import KingAIRB200GT from "../../../public/images/image2/177TA 7.png";
import CitationBravo from "../../../public/images/image2/N550 ML 3.png";
import GulfStreamG150 from "../../../public/images/image2/n8821c 1.png";
import GulfStreamG150_2 from "../../../public/images/image2/N518KH 4.png";
import GulfStreamG150_3 from "../../../public/images/image2/N360 AV 5.png";
import Cesnna from "../../../public/images/image2/561 CC 6.png";

const aircraftData = [
  {
    name: "King Air 200",
    tailNumber: "N923AS",
    seats: "7+1",
    range: "1450NM",
    image: KingAIR200,
  },
  {
    name: "King Air F90",
    tailNumber: "N30GT",
    seats: "6",
    range: "1400NM",
    image: KingAIRF90,
  },
  {
    name: "King Air B200",
    tailNumber: "N132N",
    seats: "7+1",
    range: "1450NM",
    image: KingAIRB200,
  },
  {
    name: "King Air B200GT",
    tailNumber: "N177TA",
    seats: "7",
    range: "1450NM",
    image: KingAIRB200GT,
  },
];

const lightjets = [
  {
    name: "Citation Bravo",
    tailNumber: "N550ML",
    seats: "7",
    range: "1980NM",
    image: CitationBravo,
  },
  {
    name: "Gulfstream G150",
    tailNumber: "N8821C",
    seats: "8+1",
    range: "2760NM",
    image: GulfStreamG150,
  },
  {
    name: "Gulfstream G150",
    tailNumber: "N518KH",
    seats: "8+1",
    range: "2760NM",
    image: GulfStreamG150_2,
  },
  {
    name: "Gulfstream G150",
    tailNumber: "N360AV",
    seats: "7",
    range: "2760NM",
    image: GulfStreamG150_3,
  },
  {
    name: "Cesnna Citation CE560 Ultra",
    tailNumber: "561CC",
    seats: "7+1",
    range: "1960NM",
    image: Cesnna,
  },
];

const AircraftLeftCard = ({ aircraft }: { aircraft: (typeof aircraftData)[0] }) => (
  <div className="flex justify-center">
  <div className="flex">
    <div className="flex flex-[0.5]">
      <Image
        src={aircraft.image}
        alt={aircraft.name}
        className=""
      />
    </div>
    <div className="flex flex-[0.8] flex-col justify-center items-center">
    <h1 className="text-[10px] md:text-[16px] lg:text-xl xl:text-2xl font-bold italic">{aircraft.name}</h1>
   <div className="bg-[#000f1c] p-2 md:p-6 relative transform -skew-x-12">
        <div className="w-full">
          <h1 className="text-[6px] md:text-sm xl:text-xl italic">
            Tail Number:{" "}
            <span className="text-neutral-400">{aircraft.tailNumber}</span>
          </h1>
          <h1 className="text-[6px] md:text-sm xl:text-xl italic">
            Seats: {aircraft.seats}
          </h1>
          <h1 className="text-[6px] md:text-sm xl:text-xl italic">
            Range: {aircraft.range}
          </h1>
        </div>
      </div>
  </div>
  </div>
  </div>
);

const AircraftCardRight = ({
  aircraft,
}: {
  aircraft: (typeof lightjets)[0];
}) => (
  <div className="flex justify-center">
  <div className="flex">
    <div className="flex-[0.5]">
      <Image
        src={aircraft.image}
        alt={aircraft.name}
        className="h-auto"
      />
    </div>
    <div className="flex flex-[0.8] flex-col justify-center items-center">
      <h1 className="text-[10px] md:text-[16px] lg:text-xl xl:text-2xl font-bold italic">{aircraft.name}</h1>
    <div className="bg-[#000f1c] p-2 md:p-6 relative transform -skew-x-12">
        <div className="w-full">
          <h1 className="text-[6px] md:text-sm xl:text-xl italic">
            Tail Number:{" "}
            <span className="text-neutral-400">{aircraft.tailNumber}</span>
          </h1>
          <h1 className="text-[6px] md:text-sm xl:text-xl italic">
            Seats: {aircraft.seats}
          </h1>
          <h1 className="text-[6px] md:text-sm xl:text-xl italic">
            Range: {aircraft.range}
          </h1>
        </div>
      </div>
  </div>
  </div>
  </div>
);

const FleetPage = () => {
  return (
    <section
      id="fleetpage"
      className="overflow-x-hidden text-white"
    >
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="col-span-1 row-span-1 bg-[#163659] opacity-95">
          <div className="w-full h-full">
            <div className="flex flex-col">
              <h1 className="italic text-xs md:text-xl xl:text-4xl font-bold text-center font-staatliches">
                <span className="text-lg md:text-3xl xl:text-6xl">T</span>URBO
                PROPS
              </h1>
              <div className="flex flex-col gap-10 mt-10">
                {aircraftData.map((aircraft, index) => (
                  <AircraftLeftCard key={index} aircraft={aircraft} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-1 bg-[#3d5e86] opacity-95">
          <div className="w-full h-full">
            <div className="flex flex-col">
              <h1 className="italic text-xs md:text-xl xl:text-4xl font-bold text-center font-staatliches">
                <span className="text-lg md:text-3xl xl:text-6xl">L</span>IGHT/ MIDSIZE JETS
              </h1>
              <div className="flex flex-col gap-10 mt-10">
                {lightjets.map((aircraft, index) => (
                  <AircraftCardRight key={index} aircraft={aircraft} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetPage;