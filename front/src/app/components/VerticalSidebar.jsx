'use client';

import Link from 'next/link';
import { List, PlusCircle, Eye, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function VerticalSidebar() {
  const [loadingLink, setLoadingLink] = useState(null);
  const pathname = usePathname();

  const handleLinkClick = (href) => {
    // Só mostra o loading se não estiver já na página
    if (pathname !== href) {
      setLoadingLink(href);
    }
  };

  return (
    <div className="fixed bg-[#1A436A] shadow-md flex md:flex-col items-center justify-center md:items-center py-2 md:py-6 gap-6 md:gap-8 w-full md:w-16 h-16 md:h-screen z-50">
      {/* Listagem de Políticas */}
      <Link 
        href="/listagem" 
        className="text-white hover:scale-110 transition"
        onClick={() => handleLinkClick('/listagem')}
      >
        {loadingLink === '/listagem' ? (
          <Loader2 size={28} className="animate-spin" />
        ) : (
          <List size={28} />
        )}
      </Link>

      {/* Criação de Políticas */}
      <Link 
        href="/criacao" 
        className="text-white hover:scale-110 transition"
        onClick={() => handleLinkClick('/criacao')}
      >
        {loadingLink === '/criacao' ? (
          <Loader2 size={28} className="animate-spin" />
        ) : (
          <PlusCircle size={28} />
        )}
      </Link>

      {/* Visualização de Políticas */}
      <Link 
        href="/" 
        className="text-white hover:scale-110 transition"
        onClick={() => handleLinkClick('/')}
      >
        {loadingLink === '/' ? (
          <Loader2 size={28} className="animate-spin" />
        ) : (
          <Eye size={28} />
        )}
      </Link>
    </div>
  );
}