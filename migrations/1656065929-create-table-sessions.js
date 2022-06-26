exports.up = async (sql) => {
  await sql`
		CREATE TABLE sessions
		(
    	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  		token varchar(150) NOT NULL UNIQUE,
  		expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
			user_id integer REFERENCES users (id) ON DELETE CASCADE
		)
		`;
};
// DEFAULT NOW() + INTERVAL '24 hours' = time when record created + 24 hours
// table references table users and therefore need to be created after users table is created hence the timestamp for database migrations
// on delete cascade means that if the user is deleted from users table the user in sessions is deleted as well

exports.down = async (sql) => {
  await sql`
		DROP TABLE sessions
	`;
};
