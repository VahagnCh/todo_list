import AuthButton from "../components/AuthButton";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
      <AuthButton />
    </div>
  );
}
