"use client"
import React, { useState } from 'react';
import { Button, } from './ui/button';
import { Input } from './ui/input';
import { LogIn, Music, Plus ,ArrowRight} from 'lucide-react'; // Lucide Icons
import { signIn, useSession } from 'next-auth/react';

export default function SignInPage(){
    const session = useSession();
    const [roomId, setRoomId] = useState('');
    const [password, setPassword] = useState('');
    const [enterClick,setEnterClick] = useState(false);
    const [createClick,setCreateClick] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gradient-to-r from-purple-600 to-indigo-600">
      {/* Container with padding and background */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">Music Streamer</h1>
        <p className="text-lg text-gray-600 mb-6">
          hi {(session.data?.user?.name)?.split(" ")[0]}!!
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Join a live music stream or create your own. Share the joy of music with friends or become the DJ!
        </p>

        {
          session?.data?.user &&
        <div className="flex justify-center space-x-4 mb-6">
          <Button className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md transition duration-200"
            onClick={() => setCreateClick(true)}>
            <Music className="mr-2" />
            Join a Stream
          </Button>
          <Button className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md transition duration-200"
            onClick={()=> setEnterClick(true)}>
            <Plus className="mr-2" />
            Create a Stream
          </Button>
        </div>
        }
        {(enterClick || createClick) &&
        <div>
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-medium mb-2">Room ID</label>
            <Input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
          </div>
          <div className="mb-6">
            <label className="block text-left text-gray-700 font-medium mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
          </div>
          <Button
      className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-extrabold rounded-lg shadow-md transition duration-200"
    >
      <ArrowRight className="" />
    </Button>
          </div>
            }

        {!session?.data?.user && 
        <div className="mt-4">
          <p className="text-gray-500 mb-4">Login to start streaming or join a room:</p>
          <Button
            variant="outline"
            className="flex items-center justify-center px-6 py-3 border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg shadow-md transition duration-200"
            onClick={() => signIn()} 
            >
            <LogIn className="mr-2" />
            Login with Google
          </Button>
        </div>
          }
      </div>
    </div>
  );
};

