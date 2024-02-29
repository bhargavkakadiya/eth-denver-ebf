// myComponent.js
import "./myComponent.css";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";

export function ChildComponent({ name }: { name: any }) {
  return (
    <div className="bg-primary rounded-full w-60 h-60 flex items-center justify-center">
      <p>{name}</p>
    </div>
  );
}
export default function Bubble() {
  const options = {
    size: 239,
    minSize: 36,
    gutter: 17,
    provideProps: true,
    numCols: 6,
    fringeWidth: 165,
    yRadius: 170,
    xRadius: 300,
    cornerRadius: 127,
    showGuides: false,
    compact: true,
    gravitation: 5,
  };

  const childElements = [
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    // Add more child elements as needed
  ];

  return (
    <BubbleUI options={options} className="myBubbleUI">
      {childElements.map((child, index) => (
        <ChildComponent key={index} name={child.name} />
      ))}
    </BubbleUI>
  );
}
