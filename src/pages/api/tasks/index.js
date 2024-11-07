import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("todolist");
  const collection = db.collection("tasks");

  switch (req.method) {
    case "POST":
      try {
        const newTask = req.body;
        if (!newTask.userId) {
          return res.status(400).json({ error: "User ID is required" });
        }
        const result = await collection.insertOne(newTask);
        res.status(201).json(result.ops[0]);
      } catch (e) {
        res.status(500).json({ error: "Failed to add task" });
      }
      break;
    case "GET":
      try {
        const tasks = await collection.find({}).toArray();
        res.status(200).json(tasks);
      } catch (e) {
        res.status(500).json({ error: "Failed to load tasks" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
