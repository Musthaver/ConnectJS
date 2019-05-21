const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
});

const getArguments = () => {
    const name = process.argv.slice(2);
    if (name) {
        console.log("Searching...");
        return name;
    } else {
        console.log("Please provide a valid name");
        client.end();
    }
}

const makeQuery = () => {
    const values = getArguments();
    const text = 'SELECT * FROM famous_people WHERE first_name = $1;'
    
    client.query(text, values)
        .then(res => {
            if (res.rows.includes(values)) {
            renderResults(res.rows);
            } else {
                console.log("Sorry, that name is not in the database");
            }
        })
        .catch(err => console.error(err))
        .finally(() => {client.end()});
}

const renderResults = (peopleArr) => {
    console.log(`Found ${peopleArr.length} person(s) by the name ${peopleArr[0].first_name}:`);
    for (index in peopleArr) {
        console.log(`- ${Number(index)+1}: ${peopleArr[index].first_name} ${peopleArr[index].last_name}, born ${peopleArr[index].birthdate.toLocaleDateString()}`);
    }
}

makeQuery();