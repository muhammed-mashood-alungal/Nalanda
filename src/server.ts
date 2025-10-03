import app from "@/app";
import { connectDB, env } from "@/config";

const PORT = env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
