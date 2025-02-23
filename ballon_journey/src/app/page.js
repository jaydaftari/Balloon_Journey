"use client"; // Required for Client Components

import useCoordinates from "./hooks/useCoordinates";
import Slider from "./components/Slider/Slider";
import dynamic from "next/dynamic";

import LoadingPage from "@/app/components/LoadingPage/LoadingPage.js";
import Popup from "@/app/components/popup/popup";

import ButtonComponent from "./components/ButtonComponent/ButtonComponent";





// Dynamically import LeafletMap (Leaflet should only be loaded on the client)
const Map = dynamic(() => import("./components/Map/Map"), { ssr: false });

export default function Home() {
  const { loading, setLoading, selectedIndex, allData, setSelectedIndex, showPopup, setShowPopup, setShowtext,showText,handleShowStory }= useCoordinates();

  const handleSliderChange = (event) => {
    setSelectedIndex(parseInt(event.target.value));
  };





  if (loading) {
    return (<><LoadingPage /></>);
  }

  // const coord = allData.coordinate[selectedIndex];

  return (  
    <div>
      <h2 style= {{ textAlign: "center", width: "100%" }}>Balloon Journey</h2>
      <Slider
        min={0}
        max={allData['coordinate'].length - 1}
        value={selectedIndex}
        onChange={handleSliderChange}
        coord={allData.coordinate[selectedIndex]}
      />
      <ButtonComponent onClick={handleShowStory}>Show story of this balloon</ButtonComponent>

      {(showPopup) ? <Popup
        text={showText}
        onToggleMap={() => setShowPopup(false)}
      /> : <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
        <Map coordinates={allData.coordinate} />
      </div>
      }
    </div>
  );
}
