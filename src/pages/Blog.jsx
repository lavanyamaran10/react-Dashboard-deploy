import cards from "../data/blogs.json";
import MainContent from "../components/MainContent";
import Box from "@mui/material/Box";

export default function Blog() {
  return (
     <div className="w-full text-white p-4">
      <MainContent cards={cards} cardsPerRow={3} />
    </div>
  );
}
