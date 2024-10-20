import React from 'react';

const Header: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-96 bg-[url(/imagen.svg) dark:bg-[url(/imagen-dark.svg) bg-cover bg-no-repeat]">
        <div className="flex flex-col justify-center items-center space-y-6">
        <span className="text-4xl">Mis 15</span>
        <h1 className="text-7xl uppercase font-cursive">Adriana</h1>
        <span className="text-4xl">30. 11. 2024</span>
        </div>
    </section>
  );
};

export default Header;