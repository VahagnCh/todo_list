import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider) => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Welcome, {session.user.name}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition ease-in-out duration-200"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image and branding */}
            <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Welcome to Task Manager</h2>
                  <p className="text-blue-100 mb-8">
                    Organize your tasks, collaborate with team members, and boost your productivity.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side - Sign in form */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign in to Task Manager</h2>
              <button
                onClick={() => handleSignIn("google")}
                className="bg-red-500 text-white px-4 py-3 w-full rounded-lg mb-4 hover:bg-red-600 flex items-center justify-center space-x-3 transition ease-in-out duration-200"
                disabled={isLoading}
              >
                <img src="/google-icon.svg" alt="Google Icon" className="w-5 h-5" />
                <span>Sign in with Google</span>
              </button>
              <button
                onClick={() => handleSignIn("github")}
                className="bg-gray-800 text-white px-4 py-3 w-full rounded-lg hover:bg-gray-900 flex items-center justify-center space-x-3 transition ease-in-out duration-200"
                disabled={isLoading}
              >
                <img src="/github-icon.svg" alt="GitHub Icon" className="w-5 h-5" />
                <span>Sign in with GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
