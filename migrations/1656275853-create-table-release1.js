exports.up = async (sql) => {
  await sql`
		CREATE TABLE release1
		(
    	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			track_number integer NOT NULL,
			track_name varchar(150) NOT NULL,
  		contributing_artists varchar(150) NOT NULL UNIQUE,
			release_id integer REFERENCES releases (id) ON DELETE CASCADE,
			track_length varchar(10) NOT NULL
		)
		`;
};
// table references table releases and therefore need to be created after users table is created hence the timestamp for database migrations
// on delete cascade means that if the user is deleted from users table the user in sessions is deleted as well

exports.down = async (sql) => {
  await sql`
		DROP TABLE release1
	`;
};
