// app/components/ClientLayoutContent.tsx
'use client'

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useConfig } from '../hooks/useConfig';
import CanvasTexture from './TextureTest';

interface ClientLayoutContentProps {
  children: React.ReactNode;
}

const ClientLayoutContent: React.FC<ClientLayoutContentProps> = ({ children }) => {
  const { config, loading, error } = useConfig();

  if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header headerColor={config?.header_color || '#bdae7a'} />
      <CanvasTexture/>
            <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayoutContent;