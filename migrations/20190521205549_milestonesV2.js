
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('milestones', function(table){
            table.integer('famous_people_id');
            table
                .foreign('famous_people_id')
                .references('id')
                .on('famous_people')
                .onDelete('cascade');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('milestones', function(table){
            table.dropColumn('famous_people_id');
        })
    ])
};
