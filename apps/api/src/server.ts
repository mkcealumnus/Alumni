import { buildApp } from "./app.js";
import { env } from "./config/env.js";

async function main() {
  const app = buildApp();

  const closeGracefully = async (signal: string) => {
    app.log.info({ signal }, "Received shutdown signal, closing server gracefully...");
    try {
      await app.close();
      app.log.info("Server closed successfully.");
      process.exit(0);
    } catch (err) {
      app.log.error(err, "Error during server close");
      process.exit(1);
    }
  };

  process.on("SIGINT", () => closeGracefully("SIGINT"));
  process.on("SIGTERM", () => closeGracefully("SIGTERM"));

  try {
    const address = await app.listen({
      port: env.PORT,
      host: env.HOST,
    });
    app.log.info(`Alumnux API server listening on ${address} (${env.NODE_ENV})`);
  } catch (err) {
    app.log.error(err, "Failed to start server");
    process.exit(1);
  }
}

main();
