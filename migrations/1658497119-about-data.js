exports.up = async (sql) => {
  await sql`
   INSERT INTO about
  (paragraph_1)
  VALUES
  ('Locoda are from Manchester UK.')
`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM about
	`;
};
