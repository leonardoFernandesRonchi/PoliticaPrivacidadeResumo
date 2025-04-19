'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import VerticalSidebar from '@/app/components/VerticalSidebar';
import { FaArrowLeft, FaClipboardList, FaSpinner, FaRegCopy } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';

export default function DetalhesPolitica() {
  const { id } = useParams();
  const [politica, setPolitica] = useState(null);
  const [erro, setErro] = useState('');
  const [resumo, setResumo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resumoError, setResumoError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPolitica = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3002/api/politicas/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar a política');

        const data = await response.json();
        setPolitica(data.data);
      } catch (error) {
        console.error(error);
        setErro('Não foi possível carregar a política.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPolitica();
    }
  }, [id]);

  const handleResumir = async () => {
    if (!id) return;

    setIsLoading(true);
    setResumo('');
    setResumoError('');

    try {
      const response = await fetch(`http://localhost:3002/api/politicas/${id}/resumo`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar resumo');
      }

      const data = await response.json();
      setResumo(data.resumo);
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
      setResumoError('Não foi possível gerar o resumo. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!politica?.texto) return;
    navigator.clipboard.writeText(politica.texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <VerticalSidebar />
        <main className="flex-1 px-4 py-6 overflow-auto md:ml-16">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center gap-3 text-red-500">
              <FiAlertTriangle className="text-xl" />
              <h1 className="text-xl font-semibold">Erro ao carregar política</h1>
            </div>
            <p className="mt-2 text-gray-600">{erro}</p>
            <Link href="/listagem" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
              <FaArrowLeft className="mr-2" />
              Voltar para a lista
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!politica || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <VerticalSidebar />
        <main className="flex-1 flex items-center justify-center md:ml-16">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Carregando política...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col md:flex-row">
      <VerticalSidebar />

      {/* Removido ml-16 fixo e adicionado apenas em md:ml-16 */}
      <main className="flex-1 p-6 overflow-auto md:ml-16">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link href="/listagem" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-2">
                <FaArrowLeft className="mr-2" />
                Voltar para políticas
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                <FaClipboardList className="inline mr-3 text-blue-600" />
                Política #{id.slice(0, 6)}
              </h1>
              <p className="text-gray-600 mt-1">Última atualização: {new Date(politica.updatedAt || Date.now()).toLocaleDateString()}</p>
            </div>

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors self-start"
              title="Copiar texto completo"
            >
              <FaRegCopy />
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          {/* Conteúdo Principal */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Texto completo</h2>
              <span className="text-sm text-gray-500">
                {politica.texto?.length || 0} caracteres
              </span>
            </div>
            <article className="prose max-w-none text-gray-700 whitespace-pre-line break-words p-4 bg-gray-50 rounded-lg">
              {politica.texto || 'Sem conteúdo disponível.'}
            </article>
          </section>

          {/* Ação de Resumir */}
          <div className="text-center">
            <button
              onClick={handleResumir}
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg text-white transition-colors inline-flex items-center gap-2 ${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md'
              }`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Gerando resumo...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                  Resumir Política
                </>
              )}
            </button>
          </div>

          {/* Mensagens de Erro */}
          {resumoError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex items-center">
                <FiAlertTriangle className="text-red-500 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Erro ao gerar resumo</h3>
                  <p className="mt-1 text-sm text-red-700">{resumoError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Resumo Gerado */}
          {resumo && (
            <section className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-blue-800">
                  <svg className="inline mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Resumo da Política
                </h2>
                <span className="text-sm text-blue-600">
                  {resumo.length} caracteres
                </span>
              </div>
              <article className="prose prose-blue max-w-none text-blue-900 leading-relaxed whitespace-pre-line break-words p-4 bg-white rounded-lg">
                {resumo}
              </article>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}