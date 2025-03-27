import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! 👋 Welcome to ElectroGet support. How can I help you today?', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Common questions and answers for the bot
  const botResponses = {
    'return': 'Our return policy allows you to return products within 30 days of delivery for a full refund. The product must be in its original condition and packaging.',
    'shipping': 'We offer free shipping on all orders over ₹999. Standard delivery takes 3-5 business days. Express delivery (1-2 business days) is available for an additional fee.',
    'payment': 'We accept all major credit/debit cards, UPI, net banking, and Razorpay for secure payments.',
    'contact': 'You can reach our customer service team at support@electroget.com or call us at +91-9876543210 between 9 AM and 6 PM, Monday to Saturday.',
    'warranty': 'Most of our electronic products come with a standard 1-year manufacturer warranty. Premium products may include extended warranty options.',
    'tracking': 'You can track your order in the "Profile" section after logging in. We also send tracking updates via email.',
    'cancel': 'Orders can be cancelled before they are shipped. Please visit your profile section or contact our support team to cancel an order.',
    'about': 'ElectroGet is your ultimate destination for electronic gadgets, offering a wide range of high-quality products with excellent customer service.',
    'discount': 'We regularly offer seasonal discounts and promotions. Sign up for our newsletter to stay updated on our latest offers.',
    'refund': 'Refunds are processed within 5-7 business days after we receive and inspect the returned item.',
    'hello': 'Hi there! How can I assist you today?',
    'hi': 'Hello! How can I help you today?'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    
    // Process the query and generate a response
    const userQuery = inputValue.toLowerCase();
    let botResponse = "I'm sorry, but I don't have information on that topic yet. Please email us at support@electroget.com or visit our Contact page for more assistance.";
    
    // Check if query contains any keywords from our responses
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (userQuery.includes(keyword)) {
        botResponse = response;
        break;
      }
    }
    
    // Add bot response after a short delay to simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 600);
    
    // Clear input
    setInputValue('');
  };

  return (
    <Wrapper>
      <ChatIcon isOpen={isOpen} onClick={toggleChat}>
        {isOpen ? <FaTimes /> : <FaRobot />}
      </ChatIcon>
      
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <h3>ElectroGet Support</h3>
            <span>We typically reply within minutes</span>
          </ChatHeader>
          
          <MessagesContainer>
            {messages.map((message, index) => (
              <MessageWrapper key={index} isBot={message.isBot}>
                <MessageBubble isBot={message.isBot}>
                  {message.text}
                </MessageBubble>
              </MessageWrapper>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          
          <ChatForm onSubmit={handleSubmit}>
            <ChatInput
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your question here..."
            />
            <SendButton type="submit" disabled={inputValue.trim() === ''}>
              <FaPaperPlane />
            </SendButton>
          </ChatForm>
        </ChatWindow>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ChatIcon = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.btn};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

const ChatWindow = styled.div`
  width: 350px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  animation: slideIn 0.3s forwards;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 300px;
    height: 400px;
    right: 10px;
    bottom: 80px;
  }
`;

const ChatHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.btn};
  color: white;
  padding: 15px;
  
  h3 {
    margin: 0;
    font-size: 18px;
  }
  
  span {
    font-size: 12px;
    opacity: 0.8;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ isBot }) => (isBot ? 'flex-start' : 'flex-end')};
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  
  ${({ isBot, theme }) => isBot 
    ? `
      background-color: #e0e0e0;
      color: #333;
      border-bottom-left-radius: 5px;
    `
    : `
      background-color: ${theme.colors.btn};
      color: white;
      border-bottom-right-radius: 5px;
    `
  }
`;

const ChatForm = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #eaeaea;
  background-color: white;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.btn};
    box-shadow: 0 0 0 1px rgba(98, 84, 243, 0.1);
  }
`;

const SendButton = styled.button`
  background-color: ${({ theme }) => theme.colors.btn};
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default ChatBot;