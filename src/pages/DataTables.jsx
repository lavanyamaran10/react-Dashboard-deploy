import cards from "../data/tableData.json";
import MainContent from "../components/MainContent";

export default function DataTables() {
  
  return (
      <div className="w-full text-white p-4">
      <MainContent cards={cards} cardsPerRow={2} />
       </div>
  );
}
