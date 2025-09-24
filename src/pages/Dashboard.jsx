import chartsCards from "../data/chartsData.json";
import tableCards from "../data/tableData.json";
import MainContent from "../components/MainContent";
import Box from "@mui/material/Box";

export default function Dashboard() {
  const cards = [
    ...chartsCards.slice(0, 4),
    ...tableCards.slice(0, 4)
  ];
  return (
     <div className="w-full text-white p-4">
      <MainContent cards={cards} cardsPerRow={3} />
     </div>
  );
}
