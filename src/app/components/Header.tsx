import React from 'react';
import '@fontsource/arizonia';
import '@fontsource/geist-mono';

const Header: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-96 bg-hero">
        <div className="flex flex-col justify-center items-center space-y-6">
          <span className="text-4xl text-secondary font-extrabold uppercase">Mis 15</span>
          <h1 className="md:text-9xl text-8xl md:text-[10rem]  font-cursive -rotate-6 text-primary">Adriana</h1>
          <span className="text-4xl text-baseGreen font-semibold">30. 11. 2024</span>
        </div>
        <audio autoPlay loop>
          <source src='/audio.ogg' type="audio/ogg" />
        </audio>
    </section>
  );
};

export default Header;