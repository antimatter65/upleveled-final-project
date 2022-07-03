exports.up = async (sql) => {
  await sql`
		CREATE TABLE releases
		(
    	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  		release_name varchar(150) NOT NULL UNIQUE,
  		tracks integer NOT NULL,
			release_date varchar(50) NOT NULL,
			record_label  varchar(100),
			cover_art_link varchar(200),
			buy_link varchar(500),
			streaming_link varchar(200),
			bandcamp_link varchar(200)
		)
		`;
};
// DEFAULT NOW() + INTERVAL '24 hours' = time when record created + 24 hours
// table references table users and therefore need to be created after users table is created hence the timestamp for database migrations
// on delete cascade means that if the user is deleted from users table the user in sessions is deleted as well

exports.down = async (sql) => {
  await sql`
		DROP TABLE releases
	`;
};
