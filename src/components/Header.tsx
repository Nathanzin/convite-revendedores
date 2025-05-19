import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white py-8 px-4 md:px-8 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Convite para Revendedores
        </h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-600">
            {/* Texto a ser editado manualmente pelo usuário */}
            Estamos buscando novas parcerias com revendedores para expandir nossa rede de distribuição. 
            Temos orgulho de oferecer produtos de alta qualidade e condições especiais para nossos parceiros. 
            Se você tem interesse em se tornar um revendedor autorizado, preencha o formulário abaixo.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
