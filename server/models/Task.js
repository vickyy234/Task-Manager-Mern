import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['in progress', 'completed'],
        default: 'in progress'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }]
}, {
    timestamps: true
});

export default mongoose.model("task", taskSchema);