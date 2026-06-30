import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 5173);
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"]
]);

const server = createServer((request, response) => {
  const pathname = new URL(request.url || "/", `http://localhost:${port}`).pathname;
  const requested = pathname === "/" ? "/index.html" : pathname;
  const target = normalize(join(root, requested));

  if (!target.startsWith(root) || !existsSync(target) || statSync(target).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": types.get(extname(target)) || "application/octet-stream"
  });
  createReadStream(target).pipe(response);
});

server.listen(port, () => {
  console.log(`AI Startup Studio is running at http://localhost:${port}`);
});
