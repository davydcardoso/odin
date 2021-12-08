module.exports = {
  apps: [
    {
      name: "odin.queue-worker",
      script: "node ./build/infra/queue/worker.js",
      max_memory_restart: "300M",
    },
    {
      name: "odin.http-server",
      script: "node ./build/infra/http/server.js",
      max_memory_restart: "300M",
    },
  ],
};
