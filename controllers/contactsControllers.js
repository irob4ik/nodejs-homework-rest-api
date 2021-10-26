const { Contact } = require('../models');

const getAll = async (_, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({}, "", { skip: skip, limit: +limit });
  
  res.send(contacts);
}

const getById = async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.contactId);
        if (contact) {
            return res.send(contact);
        }
        res.status(404).send({ message: 'Not found' });            
    } catch (error) {
        res.status(404).send({ message: 'Not found' });
    }
}

const add = async (req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).send(newContact);
};

const updateById = async (req, res) => {
  const contactUpdate = await updateContact(req.params.contactId, req.body);
  res.send(contactUpdate);  
};

const updateFavById = async (req, res) => {
  const contactUpdate = await updateContact(req.params.contactId, req.body.favorite);
  res.send(contactUpdate);  
};

const removeById = async (req, res) => {
    try {
        const contactRemove = await Contact.findById(req.params.contactId);
        if (contactRemove) {
            await Contact.deleteOne({ _id: req.params.contactId });
            return res.send({ message: 'contact deleted' });
        }
        res.status(404).send({ message: 'Contact not found' });            
    } catch (error) {
        res.status(404).send({ message: 'Contact not found' });
    }
};

const updateContact = async (id, body) => {
  if (typeof body === "boolean") {
    await Contact.updateOne({ _id: id }, {favorite: body});
  } else {
    await Contact.updateOne({ _id: id }, body);
  }  
  return await Contact.findById(id);
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    updateFavById,
    removeById
}