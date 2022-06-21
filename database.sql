-- database
CREATE TABLE logindatabase (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(90) NOT NULL,
  passwordhex varchar(90) NOT NULL,
);
-- insert the values in to table created

INSERT INTO mixtapes
  (name, color, price, length)
VALUES
  ('The Green Mixtape', 'green', 9 , '90 minutes'),
  ('The Pink Mixtape', 'pink', 9 , '90 minutes'),
  ('The White Mixtape', 'white', 7, '90 minutes'),
  ('The Black Mixtape', 'black', 7, '90 minutes'),
  ('The Clear Neon Mixtape', 'clear', 15, '180 minutes'),
  ('The Blue Mixtape ', 'blue', 13, '180 minutes'),
  ('The Yellow Mixtape', 'yellow', 13, '180 minutes'),
  ('The Clear Mixtape','clear', 13, '180 minutes'),
  ('Retro Walkman', 'red', 35, 'N/A'),
  ('The Grey Mixtape','grey', 15, '180 minutes');



  ---- CREATE DATABASE:

CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;

CREATE DATABASE final-project-upleveled-dom;
CREATE USER final_project_upleveled_dom WITH ENCRYPTED PASSWORD 'final_project_upleveled_dom';
GRANT ALL PRIVILEGES ON DATABASE final_project_upleveled_dom TO final_project_upleveled_dom;