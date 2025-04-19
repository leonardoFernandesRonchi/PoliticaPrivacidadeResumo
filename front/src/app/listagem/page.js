'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VerticalSidebar from "../components/VerticalSidebar";
import { FaTrashAlt, FaSearch, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import { FiEdit, FiEye } from 'react-icons/fi';

export default function PaginaComSidebar() {
  const [politicas, setPoliticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detalheCarregandoId, setDetalheCarregandoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3002/api/politicas');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        const dadosFormatados = Array.isArray(data.data) ? data.data : [];
        setPoliticas(dadosFormatados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticas();
  }, []);

  const handleVerDetalhes = (politicaId) => {
    setDetalheCarregandoId(politicaId);
    router.push(`/politicas/${politicaId}`);
  };

  const handleDeletar = async (politicaId) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta política? Esta ação não pode ser desfeita.');
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3002/api/politicas/${politicaId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(`Erro ao deletar política: ${response.status}`);

      setPoliticas(politicas.filter(politica => politica.id !== politicaId));
      setSucesso('Política removida com sucesso!');
      setTimeout(() => setSucesso(''), 5000);
    } catch (error) {
      setErro('Falha ao remover a política. Tente novamente.');
    }
  };

  const gerarTitulo = (conteudo) => {
    if (!conteudo) return 'Política sem título';
    const primeiraLinha = conteudo.split('\n')[0];
    return primeiraLinha.length > 50 
      ? `${primeiraLinha.substring(0, 50)}...` 
      : primeiraLinha || 'Política sem título';
  };

  const filteredPoliticas = politicas.filter(politica => {
    const content = politica.descricao || politica.texto || '';
    return content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {/* Botão Mobile de abrir sidebar */}
      <button 
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full z-50 shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
      >
        {sidebarOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:static inset-y-0 left-0 z-40`}>
        <VerticalSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="md:ml-16 p-6 w-full mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">Políticas de Privacidade</h1>
              <p className="text-blue-600">Gerencie todas as políticas da sua plataforma</p>
            </div>
            
            <div className="mt-4 md:mt-0 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar políticas..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Alertas */}
          {erro && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Erro</h3>
                  <div className="mt-1 text-sm text-red-700">
                    <p>{erro}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {sucesso && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Sucesso</h3>
                  <div className="mt-1 text-sm text-green-700">
                    <p>{sucesso}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Carregando políticas...</p>
            </div>
          )}

          {/* Lista vazia */}
          {!loading && filteredPoliticas.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400">
                <FaFileAlt className="w-full h-full" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhuma política encontrada</h3>
              <p className="mt-1 text-gray-500">
                {searchTerm ? 
                  "Nenhum resultado para sua busca. Tente outro termo." : 
                  "Você ainda não criou nenhuma política. Comece criando uma nova!"}
              </p>
            </div>
          )}

          {/* Grid de políticas */}
          {!loading && filteredPoliticas.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoliticas.map((politica) => (
                <div
                  key={politica.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col h-full"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-1">
                          {gerarTitulo(politica.descricao || politica.texto)}
                        </h2>
                        {politica.dataCriacao && (
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FaCalendarAlt className="mr-1.5 text-gray-400" />
                            {new Date(politica.dataCriacao).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="my-4 h-px bg-gray-100"></div>

                    <p className="text-gray-600 line-clamp-3 mb-4 min-h-[60px]">
                      {politica.descricao || politica.texto || 'Conteúdo não disponível'}
                    </p>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleVerDetalhes(politica.id)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        {detalheCarregandoId === politica.id ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Carregando...
                          </>
                        ) : (
                          <>
                            <FiEye className="mr-2" />
                            Ver detalhes
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDeletar(politica.id)}
                        className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        title="Excluir política"
                      >
                        <FaTrashAlt className="mr-1.5" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}