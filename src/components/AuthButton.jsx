import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign in to Task Manager</h2>
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white px-4 py-3 w-full rounded-lg mb-4 hover:bg-red-600 flex items-center justify-center space-x-3 transition ease-in-out duration-200"
        >
          <img src="/google-icon.svg" alt="Google Icon" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>
        <button
          onClick={() => signIn("github")}
          className="bg-gray-800 text-white px-4 py-3 w-full rounded-lg hover:bg-gray-900 flex items-center justify-center space-x-3 transition ease-in-out duration-200"
        >
          <img src="/github-icon.svg" alt="GitHub Icon" className="w-5 h-5" />
          <span>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
}
