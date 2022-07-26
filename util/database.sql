-- database
CREATE TABLE logindatabase (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(90) NOT NULL,
  passwordhex varchar(90) NOT NULL,
);


---- CREATE DATABASE:

CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;



-- inputs for test data --

INSERT INTO releases
  (release_name, tracks, release_date, record_label, cover_art_link, buy_link, streaming_link, bandcamp_link)
VALUES
  ('Closer', '2', '2022/04/21', 'Code Recordings', 'https://geo-media.beatport.com/image_size/1400x1400/11da291f-bd90-4d3b-a522-12f8c3272cfd.jpg', 'https://www.beatport.com/release/closer/3708354', 'https://ingrv.es/closer-bek-3', 'https://coderecs.bandcamp.com/album/closer-closer-instrumental'),
   ('White Label', '2', '22/09/01', 'Code Recordings', 'https://geo-media.beatport.com/image_size/1400x1400/11da291f-bd90-4d3b-a522-12f8c3272cfd.jpg', 'https://www.beatport.com/release/closer/3708354', 'https://ingrv.es/closer-bek-3', 'https://coderecs.bandcamp.com/album/closer-closer-instrumental'),
  ('White Label 2', '2', '22/010/01', 'Code Recordings', 'https://geo-media.beatport.com/image_size/1400x1400/11da291f-bd90-4d3b-a522-12f8c3272cfd.jpg', 'https://www.beatport.com/release/closer/3708354', 'https://ingrv.es/closer-bek-3', 'https://coderecs.bandcamp.com/album/closer-closer-instrumental');


  INSERT INTO releases
  (release_name, tracks, release_date, record_label, cover_art_link, buy_link, streaming_link, bandcamp_link)
  VALUES
  ('White Label', '3', '22/09/01', 'Code Recordings', 'https://geo-media.beatport.com/image_size/1400x1400/11da291f-bd90-4d3b-a522-12f8c3272cfd.jpg', 'https://www.beatport.com/release/closer/3708354', 'https://ingrv.es/closer-bek-3', 'https://coderecs.bandcamp.com/album/closer-closer-instrumental');



  INSERT INTO releases
  (release_name, tracks, release_date, record_label, cover_art_link, buy_link, streaming_link, bandcamp_link)
  VALUES
  ('White Label 2', '2', '22/010/01', 'Code Recordings', 'https://geo-media.beatport.com/image_size/1400x1400/11da291f-bd90-4d3b-a522-12f8c3272cfd.jpg', 'https://www.beatport.com/release/closer/3708354', 'https://ingrv.es/closer-bek-3', 'https://coderecs.bandcamp.com/album/closer-closer-instrumental');


  INSERT INTO release1
  (track_number, track_name, contributing_artists, release_id, track_length )
  VALUES


   (1, 'Closer', 'Tricia McTeague', 1, '5:08'),
   (2, 'Closer (Instrumental)', '', 1, '5:08'),
   (1, 'White Label 1 - TEST DATA', 'TEST DATA COLAB', 2, '5:00'),
   (2, 'White Label 1 (Istrumental)', '', 2, '5:00' ),
   (1, 'White Label 2 - TEST DATA', 'TEST DATA COLAB', 3, '5:00'),
   (2, 'White Label 2 - TEST DATA (Istrumental)', '', 3, '5:00' );


  INSERT INTO tourdates
  (location, date, event_link, ticket_link, tickets_left, streaming_link )
  VALUES
  ('Liverpool, UK', '2022-07-22', 'theoneinthewoods.com','https://theoneinthewoods.com/tickets/', true, ''),
  ('Mayrhofen, Austria', '2022-04-07', 'Snowbombing 2022 (DJ)', 'Snowbombing 2022 (DJ)',  false, ''),
  ('Liverpool, UK', '2021-08-21', 'theoneinthewoods.com', '', false, 'Mixcloud Link'   )
  ;
\
    INSERT INTO tourdates
  (location, date, event_link, ticket_link, tickets_left, streaming_link )

  VALUES
  ('Mayrhofen, Austria', '06.04.22', 'Snowbombing 2022 (DJ)', 'Snowbombing 2022 (DJ)',  false, '');

  INSERT INTO about
  (paragraph_1)

  VALUES
  ('testdata')