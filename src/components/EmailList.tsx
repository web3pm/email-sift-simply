
import React from 'react';
import EmailItem from './EmailItem';
import { Email } from '../utils/emailData';
import { cn } from '../lib/utils';

interface EmailListProps {
  title: string;
  emails: Email[];
  selectedEmail: Email | null;
  onSelectEmail: (email: Email) => void;
  className?: string;
  borderColor?: string;
}

const EmailList: React.FC<EmailListProps> = ({
  title,
  emails,
  selectedEmail,
  onSelectEmail,
  className,
  borderColor = 'border-blue-400',
}) => {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      <div className={cn('py-2 px-4 font-bold border-b-2', borderColor)}>
        {title} ({emails.length})
      </div>
      <div className="overflow-y-auto flex-1">
        {emails.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No emails to display</div>
        ) : (
          emails.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              onClick={() => onSelectEmail(email)}
              isSelected={selectedEmail?.id === email.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmailList;
