import { app } from "./app";

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${
      process.env.API_AMBIENTE ? process.env.APP_URL : "localhost"
    }:${process.env.PORT}`
  );
});
