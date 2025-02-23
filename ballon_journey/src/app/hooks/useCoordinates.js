import { useState, useEffect } from "react";
import { coordHelper } from "@/lib/utils";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAXu2T66an_nTaDdQ8aDOb-b8wgxI2poNo");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const useCoordinates = () => {
  const [allData, setAllData] = useState({ coordinate: [[1, 1, 1]], all: [], validIndex: [] });
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPopup,setShowPopup]=useState(false);
  const [showText,setShowtext]=useState("");

  useEffect(() => {
    console.log("Loading State Changed:", loading);
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getCoordinates`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data`);
        }

        const data = await response.json();

        if (!data) {
          throw new Error("Malformed data received");
        }

        console.log("Fetched Data:", data);

        let viableData = coordHelper(data.allData);

        // console.log("Processed Data:", viableData);

        setAllData({
          coordinate: data.allData[0],
          all: viableData,
          validIndex: data.validIndex,
        });

        setLoading(false);
      } catch (error) {
        console.error(`Error fetching or parsing data: ${error}`);
        setLoading(false); // Ensure loading stops even on failure
      }
    };

    fetchData();
  }, []);


  const handleShowStory = async () => {
    console.log('loading', loading);
    setLoading(true);
    console.log('loading', loading);
    const coord = allData.all[selectedIndex];

    const generationConfig = {
      temperature: 0.8 , // Controls randomness (0.0 to 1.0)
      max_tokens: 80,  // Limits the response length
      top_p: 1.0,       // Controls diversity via nucleus sampling
      top_k: 40         // Limits the number of highest probability tokens to sample from
    };

    const prompt = `[{"role": "system", "content": "Tailor a humrous story in plain text, showing journey of balloon ,incorporating details like weather, region, speciality of that region could be anything like mountain, personality, etc., things that ballons experience."}, 
        {"role": "user", "content": "given the coordinates in of balloon(latitude, longitude, altitude) mapped with past h hours: ${allData.validIndex}, Coordinates:${coord} "},]`;
    console.log(prompt);
    const result = await model.generateContent(prompt, { generationConfig });

    setLoading(false) 
    if (coord) {
      setShowPopup(true);
      setShowtext(result.response.text());

      // alert(result.response.text())
      // alert(`Story for balloon at ${coord[0]}, ${coord[1]}: A tale of adventure!`);
    }
  };

  return { loading, selectedIndex, setSelectedIndex, allData, setLoading, setAllData,showPopup,setShowPopup , setShowtext,showText,handleShowStory };
};

export default useCoordinates;
