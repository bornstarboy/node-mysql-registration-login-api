const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const starEventService = require('./starEvent.service');

// routes
router.post('/', starEventSchema, starEvent);
router.post('/get', getSchema, get);
router.delete('/delete',deleteSchema, _delete);


module.exports = router;

function getSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function get(req, res, next) {
    starEventService.get(req.body)
        .then(eventId => res.json(eventId))
        .catch(next);
}


function starEventSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        eventId: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}
function starEvent(req, res, next) {
    starEventService.starEvent(req.body)
        .then(() => res.json({ message: 'star Event successful' }))
        .catch(next);
}

function deleteSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        eventId: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
function _delete(req, res, next) {
    starEventService.delete(req.body)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}

