import camelCase from 'camelcase-keys';
import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

// import setPostgresDefultsOnHeroku from 'setPostgresDefaultsOnHeroku';

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export type User = {
  id: number;
  username: string;
};

export type Release = {
  id: number;
  release_id: number;
};

// this use the User typescript type and requires an additional value of string for passwordHash
type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`
    INSERT INTO users
      (username, password_hash)
    VALUES
     (${username}, ${passwordHash})
     RETURNING
     *
     `;
  return camelcaseKeys(user);
}

export async function getUserByUserName(username: string) {
  if (!username) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
    `;
  return user && camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
    `;
  return user && camelcaseKeys(user);
}

export async function getUserByUserId(userId: number) {
  if (!userId) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${userId}
    `;
  return user && camelcaseKeys(user);
}

export type Session = {
  id: number;
  token: string;
};

export async function createSession(token: string, userId: User['id']) {
  const [session] = await sql<[Session]>`
  INSERT INTO sessions
    (token, user_id)
  VALUES
  (${token}, ${userId})
  RETURNING
  id,
  token
  `;

  await logoutOfExpiredSessions();
  return camelcaseKeys(session);
}

export async function getUserByValidSessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now();

  `;
  // every time this is checked the expired sessions are deleted
  await logoutOfExpiredSessions();
  return user && camelcaseKeys(user);
}

// logout function
export async function logoutOfSession(token: string) {
  const [session] = await sql<[Session | undefined]>`
    DELETE FROM sessions
    WHERE
    sessions.token = ${token}
    RETURNING *
  `;

  return session && camelcaseKeys(session);
}
// ensures all expired sessions are deleted

export async function logoutOfExpiredSessions() {
  const sessions = await sql<[Session[]]>`
    DELETE FROM
    sessions
    WHERE
    expiry_timestamp < now()
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

// function to return all the releases in the database for the releases page

export async function getReleases() {
  const releases = await sql`
  SELECT * FROM releases
  `;
  return releases.map((release) => camelCase(release));
}

// function to return all the tour in the database for the releases page

export async function getTourDates() {
  const tourdates = await sql`
  SELECT * FROM tourdates
  `;
  return tourdates.map((tour) => camelCase(tour));
}

// function to return single release/products for the dynamic page [release] from database release

export async function getRelease(id: number) {
  const [release] = await sql`
  SELECT * FROM releases
  WHERE id = ${id}
  `;
  return camelCase(release);
}

// join function to get data from both databases based on where release.id =release1.release_id.

export async function getReleaseByReleaseId(releaseId: number) {
  if (!releaseId) return undefined;

  const releaseWithTrackData = await sql`
    SELECT
      *
    FROM
      releases,
      release1
    WHERE
      releases.id = ${releaseId}
      AND
      release1.release_id = releases.id
    `;
  return camelcaseKeys(releaseWithTrackData);
}

// create new release in database releases

export async function insertNewReleaseIntoReleases(
  releaseName: string,
  tracks: number,
  releaseDate: string,
  recordLabel: string,
  coverArtLink: string,
  buyLink: string,
  streamingLink: string,
  bandcampLink: string,
) {
  const [release] = await sql`
    INSERT INTO releases
      (release_name, tracks, release_date, record_label, cover_art_link, buy_link, streaming_link, bandcamp_link)
    VALUES
      (${releaseName}, ${tracks}, ${releaseDate}, ${recordLabel}, ${coverArtLink}, ${buyLink}, ${streamingLink}, ${bandcampLink})
    RETURNING *
  `;
  return camelcaseKeys(release);
}

// export async function insertAnimal(
//   firstName: string,
//   type: string,
//   accessory: string,
// ) {
//   const [animal] = await sql`
//     INSERT INTO animals
//       (first_name, type, accessory)
//     VALUES
//       (${firstName}, ${type}, ${accessory})
//     RETURNING *
//   `;
//   return camelcaseKeys(animal);
// }

// update the database releases - this is not currently working - needs review

export async function updateReleaseInReleases(
  id: number,
  releaseName: string,
  tracks: number,
  releaseDate: string,
  recordLabel: string,
  coverArtLink: string,
  buyLink: string,
  streamingLink: string,
  bandcampLink: string,
) {
  const [release] = await sql`
    UPDATE
      releases
    SET
      id = ${id},
      release_name = ${releaseName},
      tracks = ${tracks},
      release_date = ${releaseDate},
      record_label = ${recordLabel},
      cover_art_link = ${coverArtLink},
      buy_link = ${buyLink},
      streaming_link = ${streamingLink},
      bandcamp_link = ${bandcampLink}

    WHERE
      id = ${id}
    RETURNING *
  `;
  return camelcaseKeys(release);
}

// delete a single release from the releases database

export async function deleteReleaseFromReleasesById(id: number) {
  const [release] = await sql`
      DELETE FROM
        release
      WHERE
        id = ${id}
      RETURNING *
    `;
  return camelcaseKeys(release);
}

// export async function deleteAnimalById(id: number) {
//   const [animal] = await sql`
//     DELETE FROM
//       animals
//     WHERE
//       id = ${id}
//     RETURNING *
//   `;
//   return camelcaseKeys(animal);
// }
