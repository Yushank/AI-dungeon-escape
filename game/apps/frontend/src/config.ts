export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// Add debug info
console.log("🔧 Frontend Configuration:", {
  backendUrl: BACKEND_URL,
  nodeEnv: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
});
