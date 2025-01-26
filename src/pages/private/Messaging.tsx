import React, { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useAuthStore from '../../store/authStore';
import UserList from '../../components/messaging/UserList';
import MessageList from '../../components/messaging/MessageList';
import MessageInput from '../../components/messaging/MessageInput';
import UserSearch from '../../components/messaging/UserSearch';
import ConversationHeader from '../../components/messaging/ConversationHeader';
import { Message, User } from '../../types/messaging';

function Messaging() {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const onSubmitMessage = async (data: { message: string }) => {
    if (!user || !selectedUser) return;

    try {
      const newMessage = {
        content: data.message,
        senderId: user.uid,
        senderName: `${user.firstName} ${user.lastName}`,
        recipientId: selectedUser.uid,
        recipientName: `${selectedUser.firstName} ${selectedUser.lastName}`,
        participants: [user.uid, selectedUser.uid],
        createdAt: new Date().toISOString(),
        read: false
      };

      await addDoc(collection(db, 'messages'), newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-12 min-h-[600px]">
          {/* Users List */}
          <div className="col-span-4 border-r">
            <div className="p-4 border-b">
              <UserSearch 
                searchTerm={searchTerm} 
                onSearch={setSearchTerm} 
              />
            </div>
            <UserList
              users={filteredUsers}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </div>

          {/* Messages */}
          <div className="col-span-8 flex flex-col">
            {selectedUser ? (
              <>
                <ConversationHeader user={selectedUser} />
                <MessageList 
                  messages={conversations[selectedUser.uid] || []}
                  currentUserId={user?.uid || ''}
                />
                <div ref={messagesEndRef} />
                <div className="p-4 border-t">
                  <MessageInput onSubmit={onSubmitMessage} />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Sélectionnez un contact pour démarrer une conversation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messaging;