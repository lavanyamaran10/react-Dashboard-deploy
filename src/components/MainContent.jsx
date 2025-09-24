import Card from "./Card";

export default function MainContent({ cards, cardsPerRow = 3 }) {
  // Map number to actual Tailwind class
  const getGridColsClass = (num) => {
    switch (num) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2";
      case 3: return "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default: return "grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const gridColsClass = getGridColsClass(cardsPerRow);

  return (
    <div className={`grid ${gridColsClass}  gap-4`}>
      {cards.map((card, index) => (
        <div key={index} className="w-full">
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}
