import React, { useState, useMemo } from 'react';
import { Message } from '../types';

const mockMessages: Message[] = [
  {
    id: 1,
    senderName: 'ທ້າວ ສົມປอง',
    senderEmail: 'sompong@email.com',
    subject: 'สอบถามเกี่ยวกับ Toyota Vigo',
    body: 'ສະບາຍດີ, ຂ້ອຍສົນໃຈ Toyota Vigo ປີ 2020. ລົດຍັງຢູ່ບໍ່? ສາມາດເຂົ້າມາເບິ່ງລົດໄດ້ມື້ໃດ?',
    timestamp: '2024-07-29T10:30:00Z',
    status: 'new',
  },
  {
    id: 2,
    senderName: 'ນາງ ມາລາ',
    senderEmail: 'mala@email.com',
    subject: 'ຕ້ອງການຂໍ້ມູນເພີ່ມເຕີມກ່ຽວກັບ Honda CR-V',
    body: 'ລົດ Honda CR-V ປີ 2019 ເປັນລົດມືດຽວບໍ່? ເຄີຍຕຳມາບໍ່? ขอຮູບເພີ່ມເຕີມແດ່.',
    timestamp: '2024-07-29T09:15:00Z',
    status: 'read',
  },
  {
    id: 3,
    senderName: 'Mr. John Doe',
    senderEmail: 'johndoe@email.com',
    subject: 'Inquiry about Ford Ranger',
    body: 'Hello, I am interested in the Ford Ranger. Is the price negotiable? Can you provide details about its service history?',
    timestamp: '2024-07-28T15:45:00Z',
    status: 'replied',
  },
   {
    id: 4,
    senderName: 'ທ້າວ ບຸນທັນ',
    senderEmail: 'bounthan@email.com',
    subject: 'Follow-up on my purchase',
    body: 'ຂ້ອຍໄດ້ຊື້ລົດ Ford Everest ໄປອາທິດກ່ອນ. ຢາກຮູ້ວ່າເອກະສານຈະໄດ້ປະມານມື້ໃດ?',
    timestamp: '2024-07-27T11:00:00Z',
    status: 'archived',
  },
];

const Communication: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(1);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleSelectMessage = (id: number) => {
    setSelectedMessageId(id);
    // Mark as read when selected
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id && msg.status === 'new' ? { ...msg, status: 'read' } : msg
      )
    );
    setReplyText('');
  };
  
  const handleUpdateStatus = (id: number, status: Message['status']) => {
     setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status } : msg));
     if(selectedMessageId === id) {
       setSelectedMessageId(null);
     }
  };
  
  const handleDelete = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    if(selectedMessageId === id) {
       setSelectedMessageId(null);
     }
  };
  
  const handleSendReply = () => {
    if (!selectedMessageId || !replyText.trim()) return;
    setMessages(prev => prev.map(msg => msg.id === selectedMessageId ? { ...msg, status: 'replied' } : msg));
    setReplyText('');
    // Here you would typically send the reply to a backend
    console.log(`Replying to message ${selectedMessageId}: ${replyText}`);
  };

  const filteredMessages = useMemo(() => {
    return messages
      .filter(msg => {
        if (msg.status === 'archived') return false;
        const lowercasedFilter = searchTerm.toLowerCase();
        const matchesSearch =
          msg.senderName.toLowerCase().includes(lowercasedFilter) ||
          msg.subject.toLowerCase().includes(lowercasedFilter);

        const matchesFilter = filter === 'all' || msg.status === filter;

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [messages, filter, searchTerm]);
  
  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);

  return (
    <div className="container mx-auto text-white h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">ຈັດການການຕິດຕໍ່</h1>
      <div className="bg-gray-800 rounded-xl shadow-2xl flex-grow flex overflow-hidden">
        {/* Message List Panel */}
        <div className="w-full md:w-1/3 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <input
              type="text"
              placeholder="ຄົ້ນຫາ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
             <div className="flex justify-around mt-3">
                {['all', 'new', 'read', 'replied'].map(f => (
                    <button key={f} onClick={() => setFilter(f as any)} className={`px-3 py-1 text-sm rounded-full capitalize ${filter === f ? 'bg-yellow-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>{f}</button>
                ))}
            </div>
          </div>
          <div className="overflow-y-auto flex-grow">
            {filteredMessages.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg.id)}
                className={`p-4 cursor-pointer border-b border-gray-700 hover:bg-gray-700/50 ${selectedMessageId === msg.id ? 'bg-gray-900/50' : ''}`}
              >
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        {msg.status === 'new' && <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>}
                        <p className={`font-bold ${msg.status === 'new' ? 'text-white' : 'text-gray-300'}`}>{msg.senderName}</p>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleDateString()}</span>
                </div>
                <p className={`text-sm mt-1 truncate ${msg.status === 'new' ? 'text-gray-200' : 'text-gray-400'}`}>{msg.subject}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Detail Panel */}
        <div className="hidden md:flex w-2/3 flex-col">
            {selectedMessage ? (
                <>
                    <div className="p-4 border-b border-gray-700">
                       <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                       <p className="text-sm text-gray-400">From: {selectedMessage.senderName} &lt;{selectedMessage.senderEmail}&gt;</p>
                       <p className="text-xs text-gray-500">Received: {new Date(selectedMessage.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="p-6 overflow-y-auto flex-grow bg-gray-900/20 whitespace-pre-wrap">
                        {selectedMessage.body}
                    </div>
                     <div className="p-4 border-t border-gray-700">
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply here..."
                            rows={4}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <div className="flex justify-between items-center">
                             <div className="space-x-2">
                                <button onClick={() => handleUpdateStatus(selectedMessage.id, 'archived')} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                                    <i className="fas fa-archive mr-2"></i>Archive
                                </button>
                                <button onClick={() => handleDelete(selectedMessage.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                                    <i className="fas fa-trash mr-2"></i>Delete
                                </button>
                            </div>
                            <button onClick={handleSendReply} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                                <i className="fas fa-paper-plane mr-2"></i>Send Reply
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                        <CommentIcon className="w-24 h-24 mx-auto mb-4" />
                        <p>Select a message to read</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// A placeholder icon component, since we can't create new files.
const CommentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
);


export default Communication;