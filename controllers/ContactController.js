const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler( async (req, res)=>{
    const contacts = await Contact.find({ user_id : req.user.id});
    res.status(200).json(contacts);
})

//@desc get all contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler( async (req, res)=>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name, 
        email, 
        phone,
        user_id:req.user.id
    });
    res.status(200).json(contact);
    console.log("The request body is: ", req.body);
})

//@desc get a contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler( async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No contact found")
    }
    res.status(200).json(contact);
})

//@desc get a contact
//@route GET /api/contacts/:id
//@access private

const updateContact = asyncHandler( async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No contact found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permissions to modify another users contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatedContact);
})

//@desc get a contact
//@route GET /api/contacts/:id
//@access private

const deleteContact = asyncHandler( async (req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No contact found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permissions to modify another users contact")
    }

    await contact.deleteOne({_id:req.params.id});

    res.status(200).json(contact);
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};