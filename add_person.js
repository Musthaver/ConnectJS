const settings = require("./settings"); // settings.json
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
});

const addPerson = () => {
    const [node, path, firstName, lastName, birthday] = process.argv;
    knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: birthday})
    .then(() => console.log("It worked?"))
    .catch(function (err) {
    console.log(err)
    })
    .finally(()=> knex.destroy());
}   

addPerson();