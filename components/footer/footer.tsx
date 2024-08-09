const footer = () => {
  return (
    <footer
      className="bg-gray-100 
    w-full flex justify-between flex-col gap-5 p-4 h-[30vh]"
    >
      <div className="flex gap-4">
        <div className="flex justify-around w-2/3">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">About Us</h1>
            <p className="text-sm">Contact Us</p>
            <p className="text-sm">About Us</p>
            <p className="text-sm">Our Story</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Help</h1>
            <p className="text-sm">Shipping & Returns</p>
            <p className="text-sm">Privacy Policy</p>
            <p className="text-sm">Terms & Conditions</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Contact Us</h1>
            <p className="text-sm">+91 1234567890</p>
            <p className="text-sm">
              123, XYZ Street, ABC Colony, New Delhi, India
            </p>
          </div>
        </div>
        <div className="flex flex-col w-1/3">
          <h1 className="text-xl font-bold">Subscribe</h1>
          <p className="text-sm">
            Subscribe to our newsletter and get latest updates and offers.
          </p>
          <div className="flex mt-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="p-2 border-2 border-black rounded-l-[5px]"
            />
            <button className="bg-black text-white p-2 rounded-r-[5px]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-black text-white p-3 text-center rounded-[10px]">
        <p>© 2021 All rights reserved</p>
      </div>
    </footer>
  );
};
export default footer;
