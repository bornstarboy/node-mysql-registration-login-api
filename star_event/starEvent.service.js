const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    starEvent,
    get,
    delete:_delete
};


async function starEvent(params) {
    // save data
    await db.StarEvent.create(params);
}

async function get({ username }) {
    // if(await db.StarEvent.findOne({ where: { username: username } })){
    //     return await db.StarEvent.eventId
    // }
        return await db.StarEvent.findAll({ where: { username: username } })


    // authentication successful
    // const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    // return { ...omitHash(user.get()), token };
}

async function _delete({ username,eventId }) {
    if(await db.StarEvent.findAll({ where: { username: username,eventId:eventId } })){
        const star =  await db.StarEvent.findOne({ where: { username: username,eventId:eventId } })
        console.log("star",star)
        await star.destroy();
    }
}



// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}