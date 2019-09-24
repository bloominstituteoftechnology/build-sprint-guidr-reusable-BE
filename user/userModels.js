const db = require('../database/db-config.js')

module.exports = {
    add,
    findById,
    findby,
    getTrips,
    getProfile
}

function add (user) {
    return db('users')
    .insert(user, 'id').returning('*')
}

function findById (id) {
    return db('users').where({id}).first()
}

function findby (item) {
    return db('users').where(item)
}

function getTrips(id) {
    return db('users as u')
    .join('trips as t','u.id', 't.user_id')
    .select('u.username', 't.title', 't.description', 't.private', 't.type', 't.start_date', 't.end_date', 't.duration_hours', 't.duration_days')
    .where({'t.user_id': id})
    .then(trips => {
        const privateBoolean = trips.map(trip => {
            trip.private = Boolean(trip.private)
            return trip
        })
        return privateBoolean;
    })
}

function getProfile(id){
    return db('users as u')
    .join('profiles as p', 'u.id', 'p.user_id')
    .select('u.full_name', 'u.email', 'p.title', 'p.description', 'p.age', 'p.experience_duration')
    .where({'p.user_id': id})

}