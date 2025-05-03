import React, { useState } from 'react';
import { LoginForm } from '../components/login-form';
import { RegistrationForm } from '../components/registration-form';

export default function Auth() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 via-accent-light/10 to-secondary-light/20">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:flex-none lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Digital Customer Onboarding
            </h1>
            <p className="mt-2 text-gray-600">Welcome to our secure banking platform</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 ring-1 ring-gray-200">
            {/* Toggle between Login and Register */}
            <div className="flex border-b mb-6">
              <button
                className={`pb-2 flex-1 text-center transition-colors ${isLoginView 
                  ? "border-b-2 border-primary text-primary font-medium" 
                  : "text-gray-500 hover:text-primary/70"}`}
                onClick={() => setIsLoginView(true)}
              >
                Login
              </button>
              <button
                className={`pb-2 flex-1 text-center transition-colors ${!isLoginView 
                  ? "border-b-2 border-primary text-primary font-medium" 
                  : "text-gray-500 hover:text-primary/70"}`}
                onClick={() => setIsLoginView(false)}
              >
                Account Registration
              </button>
            </div>
            
            {isLoginView ? <LoginForm /> : <RegistrationForm />}
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-primary via-accent to-secondary">
        <div className="absolute inset-0 flex flex-col justify-center items-center px-12 text-white backdrop-blur-sm bg-white/10">
          <h2 className="text-4xl font-bold mb-6 text-white/90">Banking Made Simple</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quick account creation
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Digital KYC verification
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Secure document upload
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Start banking immediately
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}