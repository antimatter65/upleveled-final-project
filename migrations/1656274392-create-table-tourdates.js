exports.up = async (sql) => {
  await sql`
		CREATE TABLE tourdates
		(
    	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  		location varchar(100) NOT NULL UNIQUE,
  		date date NOT NULL,
			event_link varchar(500),
			ticket_link varchar(500),
			tickets_left boolean,
			streaming_link varchar(500)
		)
		`;
};
// DEFAULT NOW() + INTERVAL '24 hours' = time when record created + 24 hours
// table references table users and therefore need to be created after users table is created hence the timestamp for database migrations
// on delete cascade means that if the user is deleted from users table the user in sessions is deleted as well

exports.down = async (sql) => {
  await sql`
		DROP TABLE tourdates
	`;
};
