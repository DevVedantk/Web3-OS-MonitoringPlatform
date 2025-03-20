import React, { useState } from 'react';
import { Shield} from 'lucide-react';

export const SignUp=()=>{
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    return <div className="h-screen w-full">
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-white/10 p-2 rounded-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <div  className="mt-2 h-10 flex items-center justify-center text-gray-400">
           <h1 className='mr-2'> Already have an account?</h1>
            <a href="#" className="text-blue-500 hover:text-blue-400">
              Click here
            </a>
            </div>
        </div>

        <button className="w-full bg-[#1a1a1a] text-white py-2.5 rounded-lg hover:bg-[#252525] transition-colors">
          Sign up with Google
        </button>

      
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-[#0a0a0a]">OR</span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@gmail.com"
              className="mt-1 block w-full rounded-lg bg-[#1a1a1a] border border-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-[#1a1a1a] border border-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign up
          </button>
        </form>

      
      </div>
    </div>

    </div>
}