
import React from 'react';
import { Email } from '../utils/emailData';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface EmailItemProps {
  email: Email;
  onClick: () => void;
  isSelected: boolean;
  className?: string;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, onClick, isSelected, className }) => {
  return (
    <div
      className={cn(
        'p-3 border-b cursor-pointer transition-colors',
        email.read ? 'bg-email-read' : 'bg-email-unread font-medium',
        isSelected ? 'border-l-4 border-l-blue-500' : '',
        'hover:bg-email-hover',
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="font-medium">{email.sender}</div>
        <div className="text-xs text-gray-500">
          {format(new Date(email.date), 'MMM d, h:mm a')}
        </div>
      </div>
      <div className="text-sm font-medium mb-1 truncate">{email.subject}</div>
      <div className="text-xs text-gray-500 truncate">{email.content.substring(0, 60)}...</div>
    </div>
  );
};

export default EmailItem;
