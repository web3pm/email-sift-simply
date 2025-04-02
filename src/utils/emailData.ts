
import { v4 as uuidv4 } from 'uuid';

export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  content: string;
  date: Date;
  read: boolean;
  important: boolean;
}

const senders = [
  { name: 'John Smith', email: 'john.smith@company.com', important: true },
  { name: 'Team HR', email: 'hr@company.com', important: true },
  { name: 'Jane Doe', email: 'jane.doe@company.com', important: false },
  { name: 'Newsletter', email: 'newsletter@marketing.com', important: false },
  { name: 'Alex Johnson', email: 'alex.johnson@client.com', important: true },
  { name: 'Account Service', email: 'no-reply@service.com', important: false },
];

const subjects = [
  { text: 'Project deadline update - URGENT', important: true },
  { text: 'Your monthly invoice', important: true },
  { text: 'Meeting scheduled for tomorrow', important: true },
  { text: 'Special offer just for you!', important: false },
  { text: 'Your weekly newsletter', important: false },
  { text: 'Account verification required', important: true },
  { text: 'Follow-up on our discussion', important: true },
  { text: '10% discount coupon inside', important: false },
];

const contentSnippets = [
  { text: 'Please review the attached documents before our meeting tomorrow. This is an urgent matter that requires your immediate attention.', important: true },
  { text: 'Your monthly invoice has been generated. The payment is due in 7 days.', important: true },
  { text: 'This is a friendly reminder about our team meeting scheduled for tomorrow at 2 PM.', important: true },
  { text: 'Don\'t miss out on our exclusive offers! Limited time discounts on all products.', important: false },
  { text: 'Here\'s your weekly summary of news and updates from our team.', important: false },
  { text: 'For security reasons, we need you to verify your account details by clicking the link below.', important: true },
  { text: 'As discussed in our previous meeting, I\'m following up regarding the project timeline adjustments.', important: true },
  { text: 'Use this coupon code at checkout for 10% off your next purchase: SAVE10NOW', important: false },
];

// Function to determine if an email is important based on sender and content
export const isEmailImportant = (email: Omit<Email, 'important'>): boolean => {
  // Check if sender is marked as important
  const senderImportance = senders.find(s => s.email === email.senderEmail)?.important || false;
  
  // Check if subject contains important keywords
  const subjectImportance = subjects.find(s => email.subject === s.text)?.important || false;
  
  // Check if content contains important keywords
  const contentImportance = contentSnippets.find(c => email.content.includes(c.text))?.important || false;
  
  // Email is important if sender OR subject OR content is important
  return senderImportance || subjectImportance || contentImportance;
};

// Generate a random date within the last week
const getRandomRecentDate = (): Date => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
  return pastDate;
};

// Generate fake emails
export const generateFakeEmails = (count: number = 10): Email[] => {
  const emails: Email[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomSender = senders[Math.floor(Math.random() * senders.length)];
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const randomContent = contentSnippets[Math.floor(Math.random() * contentSnippets.length)];
    
    const email: Omit<Email, 'important'> = {
      id: uuidv4(),
      sender: randomSender.name,
      senderEmail: randomSender.email,
      subject: randomSubject.text,
      content: randomContent.text + "\n\nRegards,\n" + randomSender.name,
      date: getRandomRecentDate(),
      read: Math.random() > 0.7, // 30% chance to be read
    };
    
    emails.push({
      ...email,
      important: isEmailImportant(email)
    });
  }
  
  // Sort by date (newest first)
  return emails.sort((a, b) => b.date.getTime() - a.date.getTime());
};
