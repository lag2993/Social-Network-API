const {Thought,User} = require('../models');

const ThoughtController = {
    // Find all Thoughts
    
    getThoughts(req,res){
        Thought.find()
        .sort({createdAt:-1})
        .then((dbThought)=>{
            res.json(dbThought);
        }).catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        })
    },
    // Find Single Thought
    getSingleThought(req,res){
        Thought.findOne({_id:req.params.thoughtId})
        .then((dbThought)=>{
            if(!dbThought){
                return res.status(404).json({message:'Thought not found!'});
            }
            res.json(dbThought);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });

},
// Add new Thought
    addThought(req,res){
        Thought.create(req.body)
        .then((dbThought)=>{
            return User.findOneAndUpdate(
                {_id:req.body.userId},
                {$push:{thoughts:dbThought._id}},
                {new: true}
            )
        }).then((dbUserData)=>{
            if(!dbUserData){
                return res.status(404).json({message:'User not found!'});
            }
            res.status(404).json({message:'Thought added!'})    
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });

    },
    // Update Thought
    updateThought(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$set: req.body},
            {
                runValidators: true,
                new: true,
            }
            ) .then((dbThought)=>{
            if(!dbThought){
                return res.status(404).json({message:'Thought not found!'});
            }
                res.json(dbThought);
            }).catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Delete Thought
    deleteThought(req,res){
        Thought.findOneAndRemove({_id:req.params.thoughtId})
        .then((dbThought)=>{
            if(!dbThought){
                return res.status(404).json({message:'Thought not found!'});
            }
            return User.findOneAndUpdate(
                  {_id:req.body.userId},
                  {Thoughts:req.params.thoughtId},
                  {$pull:{Thoughts: req.params.thoughtId}},
                  {new:true}
            )
        }).catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    addReaction(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet:{Reactions:req.body}},
            {
                runValidators: true,
                new: true,
            }
        ).then((dbThought)=>{
            if(!dbThought){
                return res.status(404).json({message:'Thought not found!'});
            }
            res.json(dbThought);
        }).catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            {__id:req.params.thoughtId},
            {$pull:{Reactions: req.params.reactionId}},
            {
                runValidators: true,
                new: true,
            },
            ) .then((dbThought)=>{
            if(!dbThought){
                return res.status(404).json({message:'Thought not found!'});
            }
                res.json(dbThought);
            }).catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            });
    }

};

module.exports = ThoughtController;