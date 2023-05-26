const router = require('express').Router();
// Add routes for create,update,delete, and removed/add friends
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,

    
} = require('../../controllers/UserController');


// Route to get all Users and update User database. /api/Users

router.route('/').get(getUsers).post(createUser);

// Routes for single User /api/Users/:UserId

router.route('/:UserId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Routes for User's friend list /api/Users/:UserId/friends/:friendId

router.route('/:UserId/friends/:friendId').post(addFriend).delete(removeFriend)



module.exports = router; 