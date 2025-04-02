
import React from 'react';
import { Email } from '../utils/emailData';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface EmailDetailProps {
  email: Email;
  onClose: () => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, onClose }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4"
          onClick={onClose}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to inbox
        </Button>
        <h2 className="text-xl font-bold mb-2">{email.subject}</h2>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-medium">{email.sender}</p>
            <p className="text-sm text-gray-500">{email.senderEmail}</p>
          </div>
          <p className="text-sm text-gray-500">
            {format(new Date(email.date), 'MMM d, yyyy, h:mm a')}
          </p>
        </div>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        <div className="whitespace-pre-line">{email.content}</div>
      </div>
    </div>
  );
};

export default EmailDetail;
