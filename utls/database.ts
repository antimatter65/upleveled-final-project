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
  return camelcaseKeys(session);
}

export async function getUserByValidSessionToken(token: string) {
  if (!token) {
    return undefined;
  }

  const [user] = await sql<[User | undefined]>`
     SELECT
      users.id,
      users.username
      FROM
        users,
         sessions
        WHERE
          session.token = ${token} AND
          sessions.user_id = users.id AND
          sessions.expiry_timestamp > now();

  `;

  return user && camelcaseKeys(user);
}

export async function logoutOfSession(token: string) {
  const [session] = await sql<[Session | undefined]>`
    DELETE FROM sessions
    WHERE
    sessions.token = ${token}
    RETURNING *
  `;

  return session && camelcaseKeys(session);
}

export async function logoutOfExpiredSessions() {
  const [sessions] = await sql<[Session[]]>`
    DELETE FROM sessions
    WHERE
    sessions.expiry_timestamp < now()
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))
}
