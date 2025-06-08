import React, { JSX, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LoginWithGoogle, LoginWithGithub } from '@/utils/LoginUtil';
interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OAuthProvider = 'github' | 'google';

function SigninModal({ isOpen, onClose }: SigninModalProps): JSX.Element | null {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loadingProvider, setLoadingProvider] = React.useState<OAuthProvider | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSocialSignin = async (provider: OAuthProvider): Promise<void> => {
    setLoadingProvider(provider);
    setIsLoading(true);
    try {
      if (provider === 'google') {
        await LoginWithGoogle();
      } else {
        await LoginWithGithub();
      }
    } catch (error) {
      console.error(`${provider} login error`, error);
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-[#171717] rounded-2xl shadow-2xl border border-orange-900/60 transform transition-all duration-300 scale-100 opacity-100 sm:max-w-lg"
      >
        {/* Close Button - Desktop */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-orange-700/40 rounded-full transition-colors duration-200 hidden sm:flex items-center justify-center"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Mobile Header with Close */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 sm:hidden">
          <h2 className="text-xl font-semibold text-white">Sign In</h2>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 text-gray-400 hover:text-white hover:bg-orange-700/40 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* Header - Desktop */}
          <div className="text-center mb-8 hidden sm:block">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          {/* Mobile Header Content */}
          <div className="text-center mb-6 sm:hidden">
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          {/* OAuth Sign In Options */}
          <div className="space-y-4">
            {/* GitHub OAuth */}
            <button
              onClick={() => handleSocialSignin('github')}
              disabled={isLoading}
              className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl border border-gray-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {loadingProvider === 'github' ? 'Connecting to GitHub...' : 'Continue with GitHub'}
            </button>

            {/* Google OAuth */}
            <button
              onClick={() => handleSocialSignin('google')}
              disabled={isLoading}
              className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-xl border border-gray-200 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {loadingProvider === 'google' ? 'Connecting to Google...' : 'Continue with Google'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gray-900 text-gray-400">Secure authentication</span>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              By continuing, you agree to our{' '}
              <button className="text-orange-400 hover:text-orange-300 underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-orange-400 hover:text-orange-300 underline">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninModal;