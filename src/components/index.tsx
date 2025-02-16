import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const images = [
  "/cupcake1.jpg",
  "/cake1.jpg",
  "/brownie1.jpg"
];

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section with Animated Images */}
      <div className="relative w-full h-[500px] overflow-hidden flex justify-center items-center">
        {images.map((src, index) => (
          <Image 
            key={index} 
            src={src} 
            alt={`Slide ${index}`} 
            layout="fill" 
            objectFit="cover"
            className={`absolute transition-opacity duration-500 ease-in-out ${index === 0 ? "opacity-100" : "opacity-0"}`}
            style={{ animation: `fadeIn ${images.length * 2}s infinite ${index * 2}s` }} 
          />
        ))}
      </div>

      {/* Custom Hampers Section */}
      <div className="p-6">
        <div className="border rounded-md p-4 bg-gray-100">
          <h3 className="font-semibold text-lg">Custom Hampers</h3>
          <p className="text-gray-600 text-sm">Create your perfect gift basket with our handcrafted treats</p>
          <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Design Your Hamper</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
