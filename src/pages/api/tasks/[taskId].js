import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const { taskId } = req.query;

        console.log('Attempting to delete task with ID:', taskId);

        // Verify taskId is valid
        if (!ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }

        const result = await db
            .collection('tasks')
            .findOneAndDelete({ _id: new ObjectId(taskId) });

        console.log('Delete result:', result);

        if (!result.value) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: error.message });
    }
} 

