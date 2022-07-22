exports.up = async (sql) => {
  await sql`
INSERT INTO releases
  (release_name, tracks, release_date, record_label, cover_art_link, buy_link, streaming_link, bandcamp_link)
VALUES
  ('Closer', '2', '2022-04-21', 'Code Recordings', 'https://res.cloudinary.com/dfmmykkmb/image/upload/v1658217256/locoda-uploads/infhmbzud9lnhmtjea8f.jpg', 'https://www.beatport.com/release/closer/3708354', 'https://ingrv.es/closer-bek-3', 'https://coderecs.bandcamp.com/album/closer-closer-instrumental'),

   ('White Label-1', '2', '2022-09-01', 'Code Recordings', 'https://res.cloudinary.com/dfmmykkmb/image/upload/v1658215863/locoda-uploads/m1tpwjw9apihh5kbqdmy.jpg', 'https://www.beatport.com/release/closer/3708354', 'https://ingrv.es/closer-bek-3', 'https://coderecs.bandcamp.com/album/closer-closer-instrumental'),

  ('White Label-2', '2', '2022-10-01', 'Code Recordings', 'https://res.cloudinary.com/dfmmykkmb/image/upload/v1658165212/locoda-uploads/ewqhqh1yhvktvbnkz7tk.jpg', 'https://www.beatport.com/release/closer/3708354', 'https://ingrv.es/closer-bek-3', 'https://coderecs.bandcamp.com/album/closer-closer-instrumental')
`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM releases
	`;
};
