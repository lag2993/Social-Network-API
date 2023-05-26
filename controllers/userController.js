const {User} = require('../models');

const UserController = {
    // Find all Users
    getUsers(req,res){
        User.find()
        .then((dbUser)=>{
            res.json(dbUser);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        })
    },
    // Find Single User
    
    getSingleUser(req,res){
        User.findOne({_id:req.params.userId})
        .select('-__v')
        .populate('friends')
        .populate('Thoughts')
        .then((dbUser)=>{
            if(!dbUser){
                return res.status(404).json({message:'User not found!'});
            }
            res.json(dbUser);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Create new User
    createUser(req,res){
        User.create(req.body)
        .then((dbUser)=>{
            res.json(dbUser);
        });
    },
    // Update Existing User Account 
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set:req.body},
            {
                runValidators: true,
                new: true,
            }
            )
            .then((dbUser)=>{
                if(!dbUser){
                    return res.status(404).json({message:'User not found!'});
                }
                res.json(dbUser);
            })
            .catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Delete User Account
    deleteUser(req,res){
        User.findOneAndDelete(
            { _id:req.params.userId})
            .then((dbUser)=>{
              res.status(200).json({message:'User Account Deleted!'});
              res.json(dbUser)
            })
            .catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            })  
    },
    // Add Friend to User Account friend list
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$addToSet:{friends:req.params.friendId}},
            {new: true}
        )
        .then((dbUser)=>{
            if(!dbUser){
                return res.status(404).json({message:'User not found!'});
            }
            res.json(dbUser);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Remove Friend from User Account friend list
    removeFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{friends:req.params.friendId}},
            {new:true}
        )
        .then((dbUser)=>{
            if(!dbUser){
                return res.status(404).json({message:'User not found!'});
            }
            res.json(dbUser1);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    }
}

module.exports = UserController; 