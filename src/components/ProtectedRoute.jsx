import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirects to sign-in page if the user is not authenticated
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>; // Display a loading message while checking the session
  }

  return session ? children : null;
} 