import { useState, ReactNode, createContext, useContext } from "react";

interface SnackBarProviderProps {
  children: ReactNode;
}

interface ISnackbarContext {
  openSnackbar: (props: OpenSnackbarProps) => void;
  closeSnackbar: () => void;
}

interface OpenSnackbarProps {
  message: string;
  autoHideDuration?: number;
  severity?: "success" | "warning" | "info" | "error";
}

const SnackbarContext = createContext<ISnackbarContext>({} as ISnackbarContext);

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within SnackbarProvider");

  return context;
}

export function SnackbarProvider({ children }: SnackBarProviderProps) {
  const [state, setState] = useState<OpenSnackbarProps & { open: boolean }>({
    open: false,
    message: "",
    autoHideDuration: 5000,
    severity: "info",
  });

  const openSnackbar = ({
    message = "",
    severity = "info",
    autoHideDuration = 5000,
  }: OpenSnackbarProps) => {
    setState({ open: true, message, severity, autoHideDuration });

    if (autoHideDuration) {
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          open: false,
        }));
      }, autoHideDuration);
    }
  };

  const closeSnackbar = () => {
    setState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {state.open && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg flex items-center justify-between text-white z-50 transition-opacity duration-300 ${
            state.severity === "success"
              ? "bg-green-500"
              : state.severity === "warning"
              ? "bg-yellow-500"
              : state.severity === "info"
              ? "bg-blue-500"
              : "bg-red-500"
          }`}
        >
          <div className="flex-1">{state.message}</div>
          <button
            onClick={closeSnackbar}
            className="ml-3 font-bold text-xl focus:outline-none"
          >
            ×
          </button>
        </div>
      )}
      {children}
    </SnackbarContext.Provider>
  );
}
