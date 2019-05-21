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

const getArguments = () => {
    const name = process.argv[2];
    if (name) {
        console.log("Searching...");
        return name;
    } else {
        console.log("Please provide a valid name");
        client.end();
    }
}

const makeQuery = () => {
    const name = getArguments();
    knex.select().from('famous_people')
    .where('first_name', name)
    .then(function(rows) {
        if (rows == false) {
            console.log("Sorry, that name is not in the database");
        } else {
            renderResults(rows);
        }
    })
    .catch(function (err) {
        console.log(err)
    })
    .finally(()=> knex.destroy());
}

const renderResults = (peopleArr) => {
    console.log(`Found ${peopleArr.length} person(s) by the name ${peopleArr[0].first_name}:`);
    for (index in peopleArr) {
        console.log(`- ${Number(index)+1}: ${peopleArr[index].first_name} ${peopleArr[index].last_name}, born ${peopleArr[index].birthdate.toLocaleDateString()}`);
    }
}

makeQuery();