'use client';
import VerticalSidebar from '../components/VerticalSidebar';
import { useState } from 'react';

export default function CriacaoPoliticaPage() {
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [validationError, setValidationError] = useState('');

  const validateContent = (content) => {
    if (!content.trim()) return 'O conteúdo não pode estar vazio';
    if (content.length < 50) return 'O conteúdo deve ter pelo menos 50 caracteres';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateContent(conteudo);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError('');
    
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('http://localhost:3002/api/politicas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ conteudo })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar política');
      }

      const data = await response.json();
      
      setMessage({ 
        text: data.message || 'Política criada com sucesso!', 
        type: 'success' 
      });
      setConteudo('');
      
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage({ 
        text: error.message || 'Erro ao se comunicar com o servidor', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <VerticalSidebar />

      <main className="pt-20 md:ml-16 md:pt-10 px-4 sm:px-8 w-full">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Criar Nova Política de Privacidade</h1>
            <p className="text-blue-600">Preencha o formulário abaixo para criar uma nova política para sua plataforma</p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{message.text}</span>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="politica" className="block text-lg font-medium text-blue-700 mb-2">
                  Conteúdo da Política
                </label>
                {validationError && (
                  <div className="flex items-center text-red-500 text-sm mb-2">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationError}
                  </div>
                )}
                
                <textarea
                  id="politica"
                  rows={15}
                  className={`w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 shadow-sm transition ${
                    validationError 
                      ? 'border-red-300 focus:ring-red-300 bg-red-50' 
                      : 'border-gray-300 focus:ring-blue-300 hover:border-blue-300'
                  }`}
                  placeholder="Digite aqui o texto completo da política de uso...\n\nExemplo:\n1. Termos Gerais\n   - Item 1\n   - Item 2\n\n2. Responsabilidades\n   - Item A\n   - Item B"
                  value={conteudo}
                  onChange={(e) => {
                    setConteudo(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  disabled={loading}
                ></textarea>

                <div className="mt-1 text-sm text-gray-500">
                  {conteudo.length > 0 ? (
                    <span className={conteudo.length < 50 ? 'text-red-500' : 'text-green-500'}>
                      {conteudo.length} caracteres {conteudo.length < 50 && '(mínimo 50)'}
                    </span>
                  ) : (
                    'Mínimo 50 caracteres'
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg transition ${
                    loading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-medium shadow-md`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                      </svg>
                      Publicar Política
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setConteudo('');
                    setMessage({ text: '', type: '' });
                    setValidationError('');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition shadow-sm"
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Limpar
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          {conteudo && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-blue-700 px-6 py-3">
                <h2 className="text-lg font-semibold text-white">Pré-visualização da Política</h2>
              </div>
              <div className="p-6">
                <div className="prose max-w-none text-gray-700" style={{ whiteSpace: 'pre-line' }}>
                  {conteudo}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                  <p>Esta é uma pré-visualização de como a política será exibida aos usuários.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}