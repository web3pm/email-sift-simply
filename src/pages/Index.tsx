
import React from 'react';
import { EmailProvider } from '../contexts/EmailContext';
import EmailApp from '../components/EmailApp';

const Index = () => {
  return (
    <EmailProvider>
      <EmailApp />
    </EmailProvider>
  );
};

export default Index;
