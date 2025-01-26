import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Phone, Video, MoreVertical, Image as ImageIcon, Smile, Paperclip, ChevronLeft } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useAuthStore from '../../store/authStore';
import { Message, User } from '../../types/messaging';

function Messaging() {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    loadUsers();
    const unsubscribe = subscribeToMessages();
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations, selectedUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadUsers = async () => {
    try {
      const q = query(collection(db, 'users'));
      const snapshot = await getDocs(q);
      const usersData = snapshot.docs
        .map(doc => ({
          uid: doc.id,
          ...doc.data()
        }))
        .filter((u: any) => u.uid !== user?.uid) as User[];
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const subscribeToMessages = () => {
    if (!user) return () => {};

    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', user.uid),
      orderBy('createdAt', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const messagesByUser: Record<string, Message[]> = {};
      
      snapshot.docs.forEach(doc => {
        const message = { id: doc.id, ...doc.data() } as Message;
        const otherUserId = message.senderId === user.uid 
          ? message.recipientId 
          : message.senderId;
        
        if (!messagesByUser[otherUserId]) {
          messagesByUser[otherUserId] = [];
        }
        messagesByUser[otherUserId].push(message);
      });

      setConversations(messagesByUser);
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedUser || !messageInput.trim()) return;

    try {
      const newMessage = {
        content: messageInput.trim(),
        senderId: user.uid,
        senderName: `${user.firstName} ${user.lastName}`,
        recipientId: selectedUser.uid,
        recipientName: `${selectedUser.firstName} ${selectedUser.lastName}`,
        participants: [user.uid, selectedUser.uid],
        createdAt: Timestamp.now(),
        read: false
      };

      await addDoc(collection(db, 'messages'), newMessage);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLastMessage = (userId: string) => {
    const userMessages = conversations[userId];
    if (!userMessages?.length) return null;
    return userMessages[userMessages.length - 1];
  };

  const getUnreadCount = (userId: string) => {
    const userMessages = conversations[userId];
    if (!userMessages?.length) return 0;
    return userMessages.filter(msg => !msg.read && msg.senderId === userId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-8rem)]">
            {/* Users List */}
            <AnimatePresence>
              {(!showMobileChat || !selectedUser) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="md:col-span-4 lg:col-span-3 border-r border-gray-200"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="overflow-y-auto h-[calc(100%-5rem)]">
                    {filteredUsers.map((u) => {
                      const lastMessage = getLastMessage(u.uid);
                      const unreadCount = getUnreadCount(u.uid);

                      return (
                        <motion.div
                          key={u.uid}
                          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          onClick={() => {
                            setSelectedUser(u);
                            setShowMobileChat(true);
                          }}
                          className={`p-4 cursor-pointer border-b border-gray-100 ${
                            selectedUser?.uid === u.uid ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                  {u.firstName[0]}{u.lastName[0]}
                                </span>
                              </div>
                              {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                  {unreadCount}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {u.firstName} {u.lastName}
                                </h3>
                                {lastMessage && (
                                  <span className="text-xs text-gray-500">
                                    {new Date(lastMessage.createdAt.toDate()).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                )}
                              </div>
                              {lastMessage && (
                                <p className="text-sm text-gray-500 truncate">
                                  {lastMessage.senderId === user?.uid ? 'Vous: ' : ''}
                                  {lastMessage.content}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Area */}
            <AnimatePresence>
              {selectedUser && (showMobileChat || window.innerWidth >= 768) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="md:col-span-8 lg:col-span-9 flex flex-col"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {showMobileChat && (
                        <button
                          onClick={() => setShowMobileChat(false)}
                          className="md:hidden"
                        >
                          <ChevronLeft className="h-6 w-6 text-gray-600" />
                        </button>
                      )}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {selectedUser.firstName} {selectedUser.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">{selectedUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Video className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {conversations[selectedUser.uid]?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === user?.uid ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            message.senderId === user?.uid
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="break-words">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === user?.uid
                              ? 'text-blue-100'
                              : 'text-gray-500'
                          }`}>
                            {new Date(message.createdAt.toDate()).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </motion.div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                      >
                        <Smile className="h-6 w-6 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Paperclip className="h-6 w-6 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <ImageIcon className="h-6 w-6 text-gray-600" />
                      </button>
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Écrivez votre message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!messageInput.trim()}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-6 w-6" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messaging;