interface ContainerProps {
  heading: string;
  subHeading: string;
  imgArray: any[];
}
import DisplayCard from "../card/display_card/display_card";
const container = (props: ContainerProps) => {
  return (
    <div className="h-fit w-full px-[40px] py-[20px] flex justify-center items-center mt-[2.2rem] mb-3 flex-col">
      <h1 className="text-black text-5xl font-[gilroy-medium]">
        {props.heading}
      </h1>
      <p className="text-black text-lg font-[gilroy-light]">
        {props.subHeading}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {props.imgArray.map((img, index) => (
          <DisplayCard height={img.height} src={img.img} key={index} />
        ))}
      </div>
    </div>
  );
};

export default container;
