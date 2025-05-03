import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '../components/ui/button';
import { generateReferenceNumber } from '../lib/utils';

export default function RegistrationSuccess() {
  const [_, navigate] = useLocation();
  const referenceNumber = generateReferenceNumber();
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully
          </p>
          
          <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
            <p className="text-sm text-gray-500 mb-1">Reference Number</p>
            <p className="text-lg font-bold text-gray-900">{referenceNumber}</p>
          </div>
          
          <div className="text-left mb-6">
            <h2 className="text-md font-medium text-gray-900 mb-2">Next Steps:</h2>
            <ul className="space-y-1 text-sm text-gray-600 list-disc pl-5">
              <li>Your account is now active</li>
              <li>You can login using your email and password</li>
              <li>Check your email for account details</li>
            </ul>
          </div>
          
          <Button 
            className="w-full" 
            onClick={() => navigate("/")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
}