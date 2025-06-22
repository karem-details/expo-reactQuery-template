import { userType } from '@/context/AuthProvider';

// API Error Details
export type errorDetails = {
  title: string;
  message: string;
  onClose?: () => void;
  id?: number;
};

// API Error Type
export type apiErrorType =
  | {
      errors?: {
        [key: string]: string[];
      };
      message?: string;
    }
  | any;

// Login Request Type
export type LoginRequest = {
  mobile: string;
  password: string;
  agent_id: number | undefined;
};

// Login Response Type
export type LoginResponse = {
  data: userType;
};

// Forget Password Request Type
export type ForgetPasswordRequest = {
  mobile: string;
};

// Forget Password Response Type
export type ForgetPasswordResponse = {
  message?: string;
};

// OTP Verify Request Type
export type OTPVerifyResponse = {
  data: {
    token: string;
  };
};

// OTP Verify Request Type
export type OTPVerifyRequest = {
  mobile: string;
  otp: string;
};

// Change Password Request
export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};
