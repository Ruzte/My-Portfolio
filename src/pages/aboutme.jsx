import ParallaxSection from '../components/parallax';

function aboutme() {
  return (
    <div className="space-y-20">
      <ParallaxSection className="h-[80vh] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-10 items-start justify-start">
        <h1 className="text-4xl font-bold text-white">About Me</h1>
      </ParallaxSection>
    </div>
  );
}

export default aboutme;
