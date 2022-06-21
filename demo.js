export async function up(sql) {
  await sql`CREATE TABLE animals (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(90) NOT NULL,
    type VARCHAR(90) NOT NULL,
    accessory VARCHAR(90) NOT NULL
  )
  `;
}

export async function down(sql) {
  await sql`
  DROP TABLE animals
  `;
}
