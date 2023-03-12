// Require express router
const router = require('express').Router();

// set requirements
const {
    getAllUsers,
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend,
    removeFriend
} = require('../../controllers/user-controler');

// api/users
router.route('/').get(getAllUsers).post(createUser);

// api/users/:userId
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//api/users/:userId/friends/:FriendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Export module router
module.exports = router;
