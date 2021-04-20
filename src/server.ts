import express from "express";
import routes from "./routes";
import passport from "./auth";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
