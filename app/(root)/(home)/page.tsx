import img2 from "@/assets/images/image 25.png";
import img3 from "@/assets/images/image 26.png";
import img4 from "@/assets/images/image 30.png";
import Slider from "@/components/slider/slider";
import Container from "../../../components/container/container";
const Home = () => {
  const GoldimgArr = [
    {
      img: img2,
      height: 250,
    },
    {
      img: img2,
      height: 250,
    },
    {
      img: img3,
      height: 250,
    },
    {
      img: img3,
      height: 250,
    },
    {
      img: img2,
      height: 250,
    },
    {
      img: img2,
      height: 250,
    },
  ];
  const DiamondimgArr = [
    {
      img: img4,
      height: 400,
    },
    {
      img: img4,
      height: 400,
    },
    {
      img: img4,
      height: 400,
    },
  ];
  return (
    <div className="w-full">
      <Slider />
      <Container
        heading="Gold Jewellery"
        subHeading="Discover the beauty of diamond with our timeless diamond collection"
        imgArray={GoldimgArr}
      />
      <Container
        heading="Diamond Jewellery"
        subHeading="Discover our latest jewellery collection!"
        imgArray={DiamondimgArr}
      />
      <Container
        heading="Shop by Gender"
        subHeading=""
        imgArray={DiamondimgArr}
      />
    </div>
  );
};

export default Home;
