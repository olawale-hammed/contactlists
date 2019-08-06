const express = require('express');
var router = express.Router();

const Contact = require('../models/contacts')

//retrieving contacts
router.get('/contacts/:pin', (req, res, next)=> {
    Contact.findOne({where: {pin: req.params.pin}}).then((contact) => {
        console.log(contact.first_name, contact.phone, contact.balance)
        res.json(contact)
    }).catch(() => console.log('Pin not exist in database'))
})

router.put('/contacts/:pin', (req, res, next)=> {
    console.log(req.params)
    console.log(req.body)

    Contact.findOne({where: {pin: req.params.pin}}).then((contact) => {
        Contact.update(
            { balance: req.body.balance }, 
            { where: { balance: contact.balance } }
        )
    console.log(req.body.balance, '****&&&&')
        console.log(contact.first_name, contact.phone, contact.balance)
        res.json(contact)
    }).catch(() => console.log('Invalid Pin in database'))
})

//add contact
router.post('/contact', (req, res, next)=>{
    Contact.sync().then(() => {
        Contact.findOne({where: {phone: req.body.phone}}).then(user=>{
            if(!user){
                Contact.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    phone: req.body.phone,
                    pin: req.body.pin,
                    balance: req.body.balance
                }).then(()=> res.json("created successfully")).catch((err)=> res.json(err))
            }else{
                res.json("User already exist")
            }
        }).catch(err => res.json(err))
    })
});

//delete contact
router.delete('/contact/:id', (req, res, next)=> {
    Contact.destroy({ where: {id: req.params.id}}).then(result =>
        result.json("contact deleted successfully")).catch(err => res.json(err));
});

module.exports = router;