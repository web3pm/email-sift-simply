
import React, { useEffect } from 'react';
import { useEmails } from '../contexts/EmailContext';
import EmailList from './EmailList';
import EmailDetail from './EmailDetail';

const EmailApp: React.FC = () => {
  const {
    importantEmails,
    otherEmails,
    selectedEmail,
    setSelectedEmail,
    markAsRead
  } = useEmails();

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      markAsRead(email.id);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <header className="bg-white border-b p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Email Sift Simply</h1>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 divide-x h-full">
          {/* Display email lists side by side on larger screens, stack on mobile */}
          <div className="flex flex-col md:flex-row w-full">
            <div className={`w-full md:w-1/2 ${selectedEmail ? 'hidden md:block' : ''}`}>
              <EmailList
                title="Important"
                emails={importantEmails}
                selectedEmail={selectedEmail}
                onSelectEmail={handleSelectEmail}
                borderColor="border-email-important"
              />
            </div>
            <div className={`w-full md:w-1/2 ${selectedEmail ? 'hidden md:block' : ''}`}>
              <EmailList
                title="Other"
                emails={otherEmails}
                selectedEmail={selectedEmail}
                onSelectEmail={handleSelectEmail}
                borderColor="border-email-other"
              />
            </div>
          </div>
          
          {/* Email detail view */}
          {selectedEmail && (
            <div className="w-full flex-1">
              <EmailDetail email={selectedEmail} onClose={() => setSelectedEmail(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailApp;
