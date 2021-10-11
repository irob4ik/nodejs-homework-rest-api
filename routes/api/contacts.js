const express = require('express');
const router = express.Router();

const {Contact} = require('../../models')
const { addSchema, patchSchema, favoriteSchema } = require('../../models/contact');

// GET contact list //
router.get('/', async (req, res) => {
  const contacts = await Contact.find({});

  res.send(contacts);
})

// // GET contact by ID //
router.get('/:contactId', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (contact) {
      return res.send(contact);
    }
    res.status(404).send({ message: 'Not found' });    
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: 'Not found' });
  }  
})

// ADD contact to list //
router.post('/', async (req, res) => {
  const validation = addSchema.validate(req.body);

  if (validation.error) {
    return res.send({ message: 'missing required field name' });
  }

  const newContact = await Contact.create(req.body);
  res.status(201).send(newContact);
})

//DELETE contact //
router.delete('/:contactId', async (req, res) => {
  if (await Contact.findById(req.params.contactId)) {
    await Contact.deleteOne({ _id: req.params.contactId });

    return res.send({ message: 'contact deleted' });
  }

  res.status(404).send({ message: 'Not found' });
})

// UPDATE contact //
router.patch('/:contactId', async (req, res) => {
  const validation = patchSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ message: 'required field error' });
  }
  const contactUpdate = await updateContact(req.params.contactId, req.body);

  res.send(contactUpdate);
})

// FAVORITE contact //
router.patch('/:contactId/favorite', async (req, res) => {
  const validation = favoriteSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ message: 'missing required field favorite' });
  }
  const contactUpdate = await updateContact(req.params.contactId, req.body.favorite);

  res.send(contactUpdate);
})

const updateContact = async (id, body) => {
  if (typeof body === "boolean") {
    await Contact.updateOne({ _id: id }, {favorite: body});
  } else {
    await Contact.updateOne({ _id: id }, body);
  }
  
  return await Contact.findById(id);
}

module.exports = router
