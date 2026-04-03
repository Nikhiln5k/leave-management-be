import gateway from "fast-gateway";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.GATEWAY_PORT) || 5100;

const server = gateway({
  routes: [
    {
      prefix: "/master",
      target: process.env.MASTER_TARGET || "http://localhost:5101",
    },
    {
      prefix: "/employee",
      target: process.env.EMPLOYEE_TARGET || "http://localhost:5102",
    },
  ],
});

// ✅ Add CORS headers globally
server.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

server.start(PORT).then(() => {
  console.info(`Gateway running on port ${PORT}`);
});





// import dotenv from "dotenv";
// import express from "express";
// import { createProxyMiddleware } from "http-proxy-middleware";
// import { spawn } from "child_process";
// import path from "path";

// dotenv.config();
// const app = express();

// // Proxy requests to master service
// app.use(
//   "/master",
//   createProxyMiddleware({
//     target: process.env.MASTER_TARGET || "http://localhost:5101",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/master": "", // Remove /master prefix when forwarding
//     },
//   }),
// );

// // Proxy requests to employee service
// app.use(
//   "/employee",
//   createProxyMiddleware({
//     target: process.env.EMPLOYEE_TARGET || "http://localhost:5102",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/employee": "", // Remove /employee prefix when forwarding
//     },
//   }),
// );

// // Start the gateway server
// const gatewayPort = Number(process.env.GATEWAY_PORT) || 5100;
// app.listen(gatewayPort, () => {
//   console.info(`API Gateway started at port ${gatewayPort}`);
// });

// // Start master and employee services as child processes
// const masterProcess = spawn("node", [path.join(__dirname, "master.js")], {
//   stdio: "inherit",
//   env: process.env,
// });
// const employeeProcess = spawn("node", [path.join(__dirname, "employee.js")], {
//   stdio: "inherit",
//   env: process.env, // Pass environment variables to child processes
// });

// // Handle process exits
// masterProcess.on("exit", (code) => {
//   console.error(`Master service exited with code ${code}`);
// });

// employeeProcess.on("exit", (code) => {
//   console.error(`Employee service exited with code ${code}`);
// });
