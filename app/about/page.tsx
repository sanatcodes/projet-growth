import Image from 'next/image';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/profile-pic.jpg"
        alt="Profile Picture"
        width={200}
        height={200}
        className="rounded-full mb-4"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">John Doe</h1>
      <h2 className="text-2xl font-medium text-gray-600 mb-8">Web Developer</h2>
      <p className="text-lg text-gray-700 text-center max-w-lg mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies
        justo velit, in consectetur ipsum ultrices eget. Vestibulum non tellus
        sit amet turpis hendrerit vestibulum eget id massa. Sed et nibh quis
        lacus finibus bibendum sit amet quis purus.
      </p>
      <div className="flex items-center justify-center">
        <a
          href="https://www.linkedin.com/"
          className="text-lg font-medium text-gray-800 hover:text-gray-600 mr-4"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/"
          className="text-lg font-medium text-gray-800 hover:text-gray-600"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default About;
