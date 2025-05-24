import Image from "next/image";
import React from "react";
import KingAIR200 from "../../../public/imageshomefleet/N923AS.png";
import KingAIRF90 from "../../../public/imageshomefleet/30GT.png";
import KingAIRB200 from "../../../public/imageshomefleet/132N.png";
import KingAIRB200GT from "../../../public/imageshomefleet/177TA.png";
import CitationBravo from "../../../public/imageshomefleet/N550ML.png";
import GulfStreamG150 from "../../../public/imageshomefleet/N8821C.png";
import GulfStreamG150_2 from "../../../public/imageshomefleet/N518KH.png";
import GulfStreamG150_3 from "../../../public/imageshomefleet/N360AV.png";
import Cesnna from "../../../public/imageshomefleet/561CC.png";

const aircraftData = [
  {
    name: "King Air 200",
    tailNumber: "N923AS",
    seats: '7+1',
    range: "1450NM",
    image: KingAIR200,
  },
  {
    name: "King Air F90",
    tailNumber: "N30GT",
    seats: '6',
    range: "1400NM",
    image: KingAIRF90,
  },
  {
    name: "King Air B200",
    tailNumber: "N132N",
    seats: '7+1',
    range: "1450NM",
    image: KingAIRB200,
  },
  {
    name: "King Air B200GT",
    tailNumber: "N177TA",
    seats: '7',
    range: "1450NM",
    image: KingAIRB200GT,
  },
];

const lightjets = [
    {
        name: "Citation Bravo",
        tailNumber: "N550ML",
        seats: '7',
        range: "1980NM",
        image: CitationBravo,
    },
    {
        name: "Gulfstream G150",
        tailNumber: "N8821C",
        seats: '8+1',
        range: "2760NM",
        image: GulfStreamG150,
    },
    {
        name: "Gulfstream G150",
        tailNumber: "N518KH",
        seats: '8+1',
        range: "2760NM",
        image: GulfStreamG150_2,
    },
    {
        name: "Gulfstream G150",
        tailNumber: "N360AV",
        seats: '7',
        range: "2760NM",
        image: GulfStreamG150_3,
    },
    {
        name: "Cesnna Citation CE560 Ultra",
        tailNumber: "561CC",
        seats: '7+1',
        range: "1960NM",
        image: Cesnna,
    }
]

const AircraftCard = ({ aircraft }: { aircraft: typeof aircraftData[0] }) => (
  <div className="flex justify-center">
    <Image src={aircraft.image} alt={aircraft.name} className="w-[100px] h-[100px] sm:w-[200px] md:w-[300px] sm:h-auto " />
    <div className="flex flex-col justify-center">
      <h1 className="md:text-xl xl:text-2xl font-bold italic font-staatliches">{aircraft.name}</h1>
      <div className="bg-[#000f1c] p-4 lg:p-12 -translate-x-8 relative w-[120%] [clip-path:polygon(10%_0%,85%_0%,75%_100%,0%_100%)]">
        <div className="-skew-x-4 w-full">
        <h1 className="text-[8px] sm:text-xs md:text-md xl:text-lg italic font-semibold">
          Tailnumber: <span className="text-neutral-400">{aircraft.tailNumber}</span>
        </h1>
        <h1 className="text-[8px] sm:text-xs md:text-md xl:text-lg italic">Seats: {aircraft.seats}</h1>
        <h1 className="text-[8px] sm:text-xs md:text-md xl:text-lg italic">Range: {aircraft.range}</h1>
        </div>
      </div>
    </div>
  </div>
);

const AircraftCardRight = ({ aircraft }: { aircraft: typeof aircraftData[0] }) => (
  <div className="flex justify-center">
    <Image src={aircraft.image} alt={aircraft.name} className=" w-[100px] h-[100px] sm:w-[240px] md:w-[300px] sm:h-auto " />
    <div className="flex flex-col justify-center">
      <h1 className="md:text-xl xl:text-2xl font-bold italic font-staatliches">{aircraft.name}</h1>
      <div className="bg-[#1d354b] p-4 lg:p-12 -translate-x-8 relative w-[120%] [clip-path:polygon(10%_0%,85%_0%,75%_100%,0%_100%)]">
        <div className="-skew-x-4 w-full">
        <h1 className="text-[8px] sm:text-xs md:text-md xl:text-lg italic font-semibold">
          Tailnumber: <span className="text-neutral-400">{aircraft.tailNumber}</span>
        </h1>
        <h1 className="text-[8px] sm:text-xs md:text-md xl:text-lg italic">Seats: {aircraft.seats}</h1>
        <h1 className="text-[8px] sm:text-xs md:text-md xl:text-lg italic">Range: {aircraft.range}</h1>
        </div>
      </div>
    </div>
  </div>
);

const FleetPage = () => {
  return (
    <section className="min-h-screen overflow-x-hidden text-white relative">
      {/* Background Image using Next.js Image component */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/imageshomefleet/LIGHT BLUE.svg"
          alt="Fleet background"
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        <div className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Turboprops Column */}
            <div className="bg-[#163659]/95 min-h-screen backdrop-blur-sm">
              <div className="flex flex-col p-4 md:p-0">
                <h1 className="italic text-2xl md:text-4xl xl:text-6xl font-bold text-center font-staatliches pt-8">
                  <span className="text-4xl md:text-6xl xl:text-9xl">T</span>URBO PROPS
                </h1>
                <div className="flex flex-col gap-6 md:gap-10 mt-6 md:mt-10">
                  {aircraftData.map((aircraft, index) => (
                    <AircraftCard key={index} aircraft={aircraft} />
                  ))}
                </div>
              </div>
            </div>

            {/* Jets Column */}
            <div className="bg-[#395a84]/95 min-h-screen backdrop-blur-sm">
              <div className="flex flex-col p-4 md:p-0">
                <h1 className="italic text-2xl md:text-4xl xl:text-6xl font-bold text-center font-staatliches pt-8">
                  <span className="text-4xl md:text-6xl xl:text-9xl">L</span>IGHT | MIDSIZE JETS
                </h1>
                <div className="flex flex-col gap-6 md:gap-10 mt-6 md:mt-10">
                    {lightjets.map((aircraft, index) => (
                      <AircraftCardRight key={index} aircraft={aircraft} />
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetPage;