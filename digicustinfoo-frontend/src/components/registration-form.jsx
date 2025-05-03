import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function RegistrationForm() {
  const [_, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      aadharNumber: '',
      panNumber: '',
      aadharDocument: null,
      panDocument: null
    }
  });

  const password = watch('password');

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, '');
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
  };

  const verifyOtp = async () => {
    try {
      const enteredOtp = otp.join('');
      if (enteredOtp.length !== 6) {
        setError('Please enter complete OTP');
        return;
      }

      if (enteredOtp !== generatedOtp) {
        setError('Invalid OTP. Please try again.');
        return;
      }

      navigate('/success');
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    }
  };

  const onSubmit = async (data) => {
    setError('');
    setIsSubmitting(true);
    
    try {
      if (currentStep < 4) {
        nextStep();
        setIsSubmitting(false);
        return;
      }

      // If we're on the OTP verification step
      if (currentStep === 5) {
        await verifyOtp();
        return;
      }

      // Save user data using the existing verify-user endpoint
      const response = await fetch("http://localhost:8080/user/verify-user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName || "",
          email: data.email,
          phone: parseInt(data.mobile),
          panCard: data.panNumber,
          status: true
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed');
      }

      const result = await response.text();
      console.log('Backend Response:', result);
      
      if (result.includes("Data alredy exists")) {
        throw new Error(result);
      }

      // Extract OTP from the response directly
      const otpMatch = result.match(/Otp for mobile no \d+ is :(\d{6})/);
      if (otpMatch && otpMatch[1]) {
        setGeneratedOtp(otpMatch[1]);
        setShowOtpModal(true);
        nextStep(); // Move to OTP verification
      } else {
        throw new Error('Could not find OTP in response');
      }
      
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Account Registration - Personal Information</h3>
            <div>
              <label className="form-label">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("firstName", { required: "First name is required" })}
                placeholder="First name"
                error={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="form-error">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                Middle Name
              </label>
              <Input
                {...register("middleName")}
                placeholder="Middle name (optional)"
              />
            </div>

            <div>
              <label className="form-label">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last name"
                error={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="form-error">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email"
                  }
                })}
                placeholder="Email address"
                error={!!errors.email}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                {...register("mobile", { 
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number"
                  }
                })}
                placeholder="10-digit mobile number"
                error={!!errors.mobile}
              />
              {errors.mobile && (
                <p className="form-error">{errors.mobile.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Account Registration - KYC Information</h3>
            <div>
              <label className="form-label">
                Aadhar Number <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("aadharNumber", { 
                  required: "Aadhar number is required",
                  pattern: {
                    value: /^\d{12}$/,
                    message: "Please enter a valid 12-digit Aadhar number"
                  }
                })}
                placeholder="12-digit Aadhar number"
                error={!!errors.aadharNumber}
              />
              {errors.aadharNumber && (
                <p className="form-error">{errors.aadharNumber.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                PAN Number <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("panNumber", { 
                  required: "PAN number is required",
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: "Please enter a valid PAN number"
                  }
                })}
                placeholder="PAN number"
                error={!!errors.panNumber}
              />
              {errors.panNumber && (
                <p className="form-error">{errors.panNumber.message}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Account Registration - Document Upload</h3>
            <div>
              <label className="form-label">
                Aadhar Card Document <span className="text-red-500">*</span>
              </label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                {...register("aadharDocument", { 
                  required: "Aadhar document is required" 
                })}
                error={!!errors.aadharDocument}
              />
              {errors.aadharDocument && (
                <p className="form-error">{errors.aadharDocument.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                PAN Card Document <span className="text-red-500">*</span>
              </label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                {...register("panDocument", { 
                  required: "PAN document is required" 
                })}
                error={!!errors.panDocument}
              />
              {errors.panDocument && (
                <p className="form-error">{errors.panDocument.message}</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Account Registration - Set Password</h3>
            <div>
              <label className="form-label">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                placeholder="Enter password"
                error={!!errors.password}
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                placeholder="Confirm password"
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Account Registration - Verify Your Identity</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the verification code sent to your mobile
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Enter 6-digit OTP
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`otp-${index}`}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                Verify & Complete
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {renderStep()}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {currentStep > 1 && (
          <Button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            variant="outline"
          >
            Previous
          </Button>
        )}
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto"
        >
          {isSubmitting 
            ? 'Processing...' 
            : currentStep === 5 
              ? 'Verify OTP'
              : currentStep === 4 
                ? 'Register' 
                : 'Next'}
        </Button>
      </div>

      {/* OTP Display Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Your OTP</h3>
            <p className="text-3xl font-mono text-center tracking-wider mb-4">
              {generatedOtp}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Please enter this OTP in the verification screen.
            </p>
            <Button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}