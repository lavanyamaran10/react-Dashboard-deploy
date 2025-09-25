import Card from "./Card";

export default function MainContent({ cards, cardsPerRow = 3 }) {
  // Map cardsPerRow to responsive Tailwind grid classes
  const getGridColsClass = (num) => {
    switch (num) {
      case 1:
        return "grid-cols-1"; // Always 1 column on all screen sizes
      case 2:
        return "grid-cols-1 md:grid-cols-1 lg:grid-cols-2"; // sm & md:1, lg+:2
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"; // sm:1, md:2, lg+:3
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const gridColsClass = getGridColsClass(cardsPerRow);

  return (
    <div className={`grid ${gridColsClass} gap-4`}>
      {cards.map((card, index) => (
        <div key={index} className="w-full">
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}

