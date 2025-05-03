import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

export function LoginForm() {
  const [_, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false
    }
  });
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
  
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const msg = await response.text();
        setError(msg || 'Login failed');
      } else {
        navigate('/success');
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label className="form-label">
          Email
        </label>
        <Input
          type="email"
          {...register("username", { 
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email"
            }
          })}
          placeholder="Your email address"
          error={!!errors.username}
        />
        {errors.username && (
          <p className="form-error">{errors.username.message}</p>
        )}
      </div>
      
      <div>
        <label className="form-label">
          Password
        </label>
        <Input
          type="password"
          {...register("password", { 
            required: "Password is required"
          })}
          placeholder="Your password"
          error={!!errors.password}
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            id="rememberMe"
            {...register("rememberMe")}
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
          Forgot password?
        </a>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}