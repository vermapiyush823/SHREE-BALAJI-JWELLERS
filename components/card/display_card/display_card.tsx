import Image from "next/image";

interface CardProps {
  height: number;
  src: string;
}

const DisplayCard = (props: CardProps) => {
  return (
    <div className="rounded-[20px]">
      <Image
        src={props.src}
        alt="card"
        style={{ height: `${props.height}px` }}
      />
    </div>
  );
};

export default DisplayCard;
