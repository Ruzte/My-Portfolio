import ParallaxSection from '../components/parallax';

function HomePage() {
  return (
    <div className="space-y-20">
      <ParallaxSection className="h-[80vh]  bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-10 flex flex-col items-center justify-start">
        <h1 className="text-4xl font-bold text-white">Welcome to My Portfolio</h1>
        <div>
          <img 
            src="\Image\2x2-removebg-preview.png"
            alt="Profile"
            className="w-60 h-60 my-8 rounded-full mx-auto object-cover"
          />
        <p className="text-base text-white font-normal mt-auto ">
          I am Ruzte James Temblor, a fresh graduate with a bachelors degree in computer engineering,
          with hands-on experience building real-world applications that combine both hardware and software.
          I am a quick learner, very resourceful, and motivated to learn and grow.
        </p>
      </div>
      </ParallaxSection>

      
    </div>
  );
}

export default HomePage;
