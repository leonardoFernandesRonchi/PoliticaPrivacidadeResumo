import VerticalSidebar from "./components/VerticalSidebar";
import { PlusCircle, List, Check } from 'lucide-react'; // Adicione esta linha

export default function PaginaComSidebar() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <VerticalSidebar />
      
      <main className="flex-1 p-6 md:ml-16 mt-16 md:mt-0 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header com gradiente */}
          <div className="bg-gradient-to-r from-[#233154] to-[#1A436A] rounded-xl p-6 mb-8 text-white shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bem-vindo ao Resumidor de Políticas!
            </h1>
            <p className="text-blue-100 opacity-90">
              Simplificando políticas complexas com IA para você
            </p>
          </div>
          
          {/* Conteúdo principal com cards */}
          <div className="space-y-6">
            {/* Card de introdução */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <p className="text-lg leading-relaxed text-gray-700">
                Este projeto utiliza inteligência artificial baseada no modelo <strong className="text-[#1A436A]">Mistral</strong> para resumir e simplificar políticas de privacidade, tornando o conteúdo mais acessível e compreensível para todos os usuários.
              </p>
            </div>
            
            {/* Card de tecnologias */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <p className="text-lg leading-relaxed text-gray-700">
                A aplicação foi desenvolvida com <strong className="text-[#1A436A]">React</strong>, <strong className="text-[#1A436A]">Next.js</strong> e tecnologias modernas do ecossistema JavaScript para oferecer performance e uma experiência fluida na web.
              </p>
            </div>
            
            {/* Card de como funciona */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-[#233154] mb-3">Como funciona:</h2>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start">
                  <span className="bg-[#1A436A] text-white rounded-full p-1 mr-3 mt-1">
                    <PlusCircle size={16} />
                  </span>
                  <span className="text-gray-700">Clique no ícone <strong className="text-[#1A436A]">+</strong> para criar um novo resumo de política</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#1A436A] text-white rounded-full p-1 mr-3 mt-1">
                    <List size={16} />
                  </span>
                  <span className="text-gray-700">Acesse a lista de políticas resumidas no ícone <strong className="text-[#1A436A]">Lista</strong></span>
                </li>
              </ul>
            </div>
            
            {/* Card de benefícios */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-[#233154] mb-3">Benefícios:</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Economize tempo na leitura de documentos longos",
                  "Entenda os pontos mais importantes de políticas complexas",
                  "Interface simples e intuitiva para todos os usuários",
                  "Processamento rápido graças à tecnologia de IA moderna"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full p-1 mr-3 mt-1">
                      <Check size={16} />
                    </span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Chamada para ação */}
            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-[#1A436A] to-[#233154] text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all hover:scale-105">
                Comece agora - é gratuito!
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}