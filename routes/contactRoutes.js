const express = require("express");
const router = express.Router();
const {getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");


/*
Just for knowledge - 

We can write below finction in 2 ways - one is mentioned in below Or we can write in 2nd way - 

Because, for 1st routers, we have common statements - 'router.route('/').'. So, we can write those 2 APIs in below format - 
router.route('/').get(getContacts).post(createContact);

in same way, for remianing 3 routers - 
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

*/

router.use(validateToken);

router.route('/').get(getContacts);

router.route('/').post(createContact);

router.route('/:id').get(getContact);

router.route('/:id').put(updateContact);

router.route('/:id').delete(deleteContact);

module.exports = router;