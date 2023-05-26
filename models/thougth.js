const {Schema, model} = require('mongoose');
const ReactionSchema = require('./reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            require: 'Thought required!',
            minlength: 1,
            maxlength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        username:{
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.Reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;