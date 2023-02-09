const router = require('express').Router();
//update as needed
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtsController.js');

router.route('/').get(getThoughts).post(createThought);

router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;