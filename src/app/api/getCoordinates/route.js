import { NextResponse } from "next/server";
import { validateCoordinates } from "@/lib/utils";

const API_BASE_URL = "https://a.windbornesystems.com/treasure/";

export async function GET() {
  try {
    let allResponses = [];
    let validIndex = [];

    // Fetch all 24 API responses
    for (let i = 0; i < 24; i++) {
      const url = `${API_BASE_URL}${String(i).padStart(2, "0")}.json`;

      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          console.error(`❌ Failed to fetch ${url}: ${response.statusText}`);
          continue;
        }

        const text = await response.text(); // Read raw text to avoid JSON parsing errors
        let data;

        try {
          data = JSON.parse(text); // Attempt to parse JSON
        } catch (jsonError) {
          console.error(`❌ JSON parse error from ${url}:`, jsonError.message);
          continue; // Skip this entry if JSON parsing fails
        }

        // ✅ Validate and clean up data
        const cleanedData = validateCoordinates(data);
        allResponses.push(cleanedData);
        validIndex.push(i);

      } catch (fetchError) {
        console.error(`❌ Error fetching data from ${url}:`, fetchError.message);
      }
    }

    // ✅ Return only valid data
    return NextResponse.json({ allData: allResponses, validIndex });

  } catch (error) {
    const sampleData = [[
              [34.82349479862479, 172.81706041445517, -3.6808595556242256],
              [50.81301040173565, 141.85201829486707, 3.369649522061529],
              [72.66130077522725, 108.53954442453075, 17.35895906484483],
              [-62.98173178527937, 24.196209658094762, 14.06707702682182],
              [74.84547263518624, -77.2062158124169, 2.3123602919294157],
              [-3.4126363322169935, 114.54269440305465, 9.604115072197002],
              [56.82456729049184, -92.22340523942862, 28.547211228494933],
              [-14.259283102618586, 120.97351653319684, 5.743112255366154],
              [62.54832560016732, -53.24426538084235, -11.253227960423275],
              [43.22468747034526, 162.89052481557392, 20.008134389257683],      
          ]
          ];
          console.error("In case of fallback, sending mock data:");
          return NextResponse.json({
            allData: sampleData,          // Send all successfully fetched data
            validIndex:validIndex,
          });
  }
}
