export async function fetchCoordinates(index) {
  try {
    const response = await fetch(`https://a.windbornesystems.com/treasure/${String(index).padStart(2, "0")}.json`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching API ${index}:`, error);
    return null;
  }
}
  