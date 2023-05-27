/*

Whenver we create any APIs, we need to give some labels to the particular APIs

We have declare 'async' for all below method, we are using mongodb. Whenever, we interact with mongodb, it is impromise about connection sometimes
so, in order to solve this issue, we can use 'async' method.
But, for async, we need to use try-cathc method to handle errors in functions. So, Express.js provide middleware to handle the exceptions -
Express async handler, which will read the exception and pass to our errorHandler.js file.


*/

const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler( 
    async (req, res) => {
        const contacts = await Contact.find({user_id: req.user.id});
        res.status(200).json(contacts);
    }
);

/*

POST method means, we are taking data from client to server which will come in body format, usually it is in JSON format.
We need to write middleware for our JSON object which will get from client side. And, Express is providing that feature. 

Now, createController object is initiated by contactRouter, and that contactRouter object is called by server.js file. So, whatever json body
we'll get in server.js file. So, we need to write that middleware in server.js file.

*/

//@desc Create New contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler( 
    async (req, res) => {
        console.log("The Request body is ", req.body);
        const {name, email, phone, birthdate} = req.body;
        if(!name || !email || !phone || !birthdate)
        {
            res.status(400);
            throw new Error("All fields are required");
        }
        const contact = await Contact.create({
            name,
            email,
            phone,
            birthdate,
            user_id: req.user.id 
        });

        res.status(201).json(contact);
    }
);


//@desc Get contact
//@route GET /api/contacts:id
//@access private

const getContact = asyncHandler( 
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if(!contact)
        {
            res.status(404);
            throw new Error("Contact Not Found");
        }
        res.status(200).json(contact);
    }
);


//@desc Update contact
//@route PUT /api/contacts:id
//@access private

const updateContact = asyncHandler( 
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if(!contact)
        {
            res.status(404);
            throw new Error("Contact Not Found");
        }

        if(contact.user_id.toString() !== req.user.id)
        {
            res.status(403);
            throw new Error("User don't have permission to update contact");
        }

        const updateContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
        );

        res.status(200).json(updateContact);
    }
);


//@desc Delete contact
//@route DELETE /api/contacts:id
//@access private
 
const deleteContact = asyncHandler( 
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if(!contact)
        {
            res.status(404);
            throw new Error("Contact Not Found");
        }

        if(contact.user_id.toString() !== req.user.id)
        {
            res.status(403);
            throw new Error("User don't have permission to delete contact");
        }

       await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({message: `Delete contact ${req.params.id}`});
    }
);

module.exports = {
    getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact
};