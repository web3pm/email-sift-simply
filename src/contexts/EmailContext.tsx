
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Email, generateFakeEmails } from '../utils/emailData';
import { toast } from '../components/ui/use-toast';

interface EmailContextProps {
  emails: Email[];
  importantEmails: Email[];
  otherEmails: Email[];
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email | null) => void;
  markAsRead: (id: string) => void;
}

const EmailContext = createContext<EmailContextProps | undefined>(undefined);

export const useEmails = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmails must be used within an EmailProvider');
  }
  return context;
};

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>(generateFakeEmails(10));
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  // Filter emails
  const importantEmails = emails.filter(email => email.important);
  const otherEmails = emails.filter(email => !email.important);

  // Mark email as read
  const markAsRead = (id: string) => {
    setEmails(currentEmails =>
      currentEmails.map(email =>
        email.id === id ? { ...email, read: true } : email
      )
    );
  };

  return (
    <EmailContext.Provider
      value={{
        emails,
        importantEmails,
        otherEmails,
        selectedEmail,
        setSelectedEmail,
        markAsRead,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
