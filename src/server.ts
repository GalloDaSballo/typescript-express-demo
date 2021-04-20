import express from "express";
import session from "express-session";
import path from "path";
import routes from "./routes";
import passport from "./auth";

const app = express();

const clientBuildPath = path.join(`${process.cwd()}/client/build`);
app.use(express.static(clientBuildPath));

const port = process.env.PORT || 8080;
app.use(express.json());

app.use(
  session({
    secret: "THE SECRET",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
