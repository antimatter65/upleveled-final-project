exports.up = async (sql) => {
  await sql`
		CREATE TABLE about
		(
    	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			paragraph_1 varchar (350) NOT NULL,
			paragraph_2 varchar(350),
  		paragraph_3 varchar(350),
			paragraph_4 varchar (350),
			external_link_1 varchar(100),
			external_link_2 varchar(100),
			external_link_3 varchar(100)
		)
		`;
};

exports.down = async (sql) => {
  await sql`
		DROP TABLE about
	`;
};
