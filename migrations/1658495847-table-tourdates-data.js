exports.up = async (sql) => {
  await sql`
	INSERT INTO tourdates
  (location, date, event_location, type, event_link, ticket_link, tickets_left, streaming_link )
  VALUES
	('Liverpool, UK', '2021-07-21', 'The One In The Woods Festival 2021', 'DJ', 'theoneinthewoods.com', '', false, 'https://www.mixcloud.com/locoda/locoda-live-the-one-in-the-woods-2021/'   ),
  ('Mayrhofen, Austria', '2022-04-07','Snowbombing Festival', 'DJ', 'snowbombing.com', '',  false, ''),
	('Liverpool, UK', '2022-07-30', 'The One In The Woods Festival 2022', 'DJ', 'theoneinthewoods.com', 'https://theoneinthewoods.com/tickets/', true, '')
  `;
};


exports.down = async (sql) => {
  await sql`
	DELETE FROM tourdates
	`;
};
