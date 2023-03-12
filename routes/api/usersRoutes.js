// Require express router
const router = require('express').Router();

// set requirements
const {
    getAllUsers,
    getSingleUserById, 
    createUser, 
    updateUserById, 
    removeUserById, 
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// api/users
router.route('/').get(getAllUsers).post(createUser);

// api/users/:userId
router.route('/:usertId').get(getSingleUserById).put(updateUserById).delete(removeUserById);

//api/users/:userId/friends/:FriendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Export module router
module.exports = router;
