exports.up = async (sql) => {
  await sql`
   INSERT INTO about
  (paragraph_1, paragraph_2, paragraph_3, paragraph_4, external_link_1, external_link_2, external_link_3)
  VALUES
  ('Locoda are from Manchester UK.', 'Locoda deliver a thundering debut in the form of “Closer” featuring the stunning vocals of Tricia McTeague who has previously worked with the likes of Paul van Dyk, Schiller, and Giuseppe Ottaviani as well as touring with Nile Rogers, Natalie Imbruglia and more.', 'In a time when we’ve all been wanting to dance carefree, “Closer” really sets the tone for the return to festivals and the dancefloor with its uplifting lyrics about being back together, back with big-room DnB vibes to deliver a real highlight to any set.', 'x', 'x', 'x', 'x')
`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM about
	`;
};
