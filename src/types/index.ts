export interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface CommonProps {
  isDark: boolean;
}

export interface ChatbotProps extends CommonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Add other shared interfaces here 