import { SessionProvider } from "next-auth/react";
import { TaskProvider } from "../context/TaskContext";
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </SessionProvider>
  );
}

export default MyApp;

