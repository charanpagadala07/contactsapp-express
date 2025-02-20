const asyncHandler = require("express-async-handler")

//@desc get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler( async (req, res)=>{
    res.status(200).json({message: "getting all contacts"});
})

//@desc get all contacts
//@route POST /api/contacts
//@access public

const createContact = asyncHandler( async (req, res)=>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");

    }
    res.status(200).json({message: "Create a Contact"});
    console.log("The request body is: ", req.body);
})

//@desc get a contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler( async (req, res)=>{
    res.status(200).json({message: `Get contact for ${req.params.id}`});
})

//@desc get a contact
//@route GET /api/contacts/:id
//@access public

const updateContact = asyncHandler( async (req, res)=>{
    res.status(200).json({message: `Get contact for ${req.params.id}`});
})

//@desc get a contact
//@route GET /api/contacts/:id
//@access public

const deleteContact = asyncHandler( async (req, res)=>{
    res.status(200).json({message: `Get contact for ${req.params.id}`});
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};