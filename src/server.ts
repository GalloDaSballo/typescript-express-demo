import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let lastId = 1;
const list = [{ id: lastId, value: "Hey Hey hey Heeeey" }];

/**
 * Retrieve all
 */
app.get("/", (req, res) => {
  res.send(list);
});

/**
 * Retrieve one
 */
app.get("/:id", (req, res) => {
  const { id } = req.params;
  const index = list.findIndex((element) => element.id === parseInt(id, 10));
  res.send(list[index]);
});

/**
 * Create new element
 */
app.post("/", (req, res) => {
  const { value } = req.body;

  const newEntry = {
    value,
    id: (lastId += 1),
  };

  list.push(newEntry);
  res.send(list);
});

/**
 * Delete one
 */
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = list.findIndex((element) => element.id === parseInt(id, 10));
  list.splice(index, 1);
  res.send(list);
});

/**
 * Update one
 */
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const index = list.findIndex((element) => element.id === parseInt(id, 10));
  list[index].value = value;
  res.send(list);
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
