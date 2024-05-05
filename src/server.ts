import app from "./index";
const LOG = console.log;
const PORT = 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/your-db-name";

const start = () => {


  app.listen(PORT, () => {
    LOG("✅ Connected to server");
    console.log(" ██╗  ██╗██╗   ██╗██████╗ ██╗   ██╗");
    console.log(" ██║ ██╔╝╚██╗ ██╔╝██╔══██╗██║   ██║");
    console.log(" █████╔╝  ╚████╔╝ ██║  ██║██║   ██║");
    console.log(" ██╔═██╗   ╚██╔╝  ██║  ██║██║   ██║");
    console.log(" ██║  ██╗   ██║   ██████╔╝╚██████╔╝");
    console.log(" ╚═╝  ╚═╝   ╚═╝   ╚═════╝  ╚═════╝ ");
    console.log(
      `[server] ⚡ Server has started listening on http://localhost:${PORT}`
    );
  });
};


start();
