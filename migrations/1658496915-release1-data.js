exports.up = async (sql) => {
  await sql`
  INSERT INTO release1
  (track_number, track_name, contributing_artists, release_id, track_length )
  VALUES
   (1, 'Closer', 'Tricia McTeague', 10, '5:08'),
   (2, 'Cloer (Instrumental)', '', 10, '5:08'),
   (1, 'White Label 1 - TEST DATA', 'TEST DATA COLAB', 11, '5:00'),
   (2, 'White Label 1 (Istrumental)', '', 11, '5:00' ),
   (1, 'White Label 2 - TEST DATA', 'TEST DATA COLAB', 12, '5:00'),
   (2, 'White Label 2 - TEST DATA (Istrumental)', '', 12, '5:00' )
`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM release1
	`;
};
