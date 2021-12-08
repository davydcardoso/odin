import { app } from "./app";

app.listen(process.env.PORT_HTTP, () => {
  console.log(
    `Server http running on ${
      process.env.API_AMBIENTE ? process.env.APP_URL : "localhost"
    }:${process.env.PORT_HTTP}`
  );
});
