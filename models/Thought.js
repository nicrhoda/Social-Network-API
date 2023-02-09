const { Schema, model } = require('mongoose');
const { moveMessagePortToContext } = require('worker_threads');



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maclength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtData => moveMessagePortToContext(createdAtData).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;