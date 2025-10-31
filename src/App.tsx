import { useEffect } from "react";
import { useTodos } from "./context/useTodos";
import { TodoForm } from "./components/Todo/TodoForm";
import { TodoList } from "./components/Todo/TodoList";
import { Spinner } from "./components/ui/Spinner";
import everestLogo from "/everest-logo.svg";

function App() {
  const { state, loadTodos } = useTodos();
  const { status, error } = state;

  useEffect(() => {
    loadTodos();
  }, [loadTodos]); // `loadTodos` is memoized and stable

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        );
      case "error":
        return (
          <p
            role="alert"
            className="rounded-md bg-red-900 p-4 text-center text-red-200"
          >
            <strong>Error:</strong> {error || "Failed to load tasks."}
          </p>
        );
      case "success":
      case "idle":
        return (
          <div className="animate-fade-in bg-[#1F2937] rounded-2xl shadow-2xl overflow-hidden">
            <div
              className="p-6 sm:p-8"
              style={{
                backgroundImage: "url('/texture-dark.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <TodoForm />
              <div className="mt-6 w-full border-t border-gray-700 pt-6" />
              <TodoList />
            </div>
          </div>
        );
    }
  };

  return (
    <main className="animate-fade-in mx-auto w-full max-w-xl p-4 sm:p-6">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <img
            className="everest-app__logo"
            src={everestLogo}
            alt="Everest logo"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1F2937] mb-3 tracking-tight">
          Everest Tasks
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Organize your tasks efficiently with our task manager
        </p>
      </header>

      {renderContent()}

      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>
          Built for{" "}
          <span className="font-semibold text-[#1F2937]">Everest Systems</span>{" "}
          Technical Challenge
          <br />
          <span>
            by{" "}
            <a
              href="https://www.linkedin.com/in/erickcanali"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 hover:underline"
            >
              Erick Canali
            </a>
          </span>
        </p>
      </footer>
    </main>
  );
}

export default App;
