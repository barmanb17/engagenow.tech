import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"]
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dueDate: Date
});

export default mongoose.model("Project", projectSchema);