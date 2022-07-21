import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  createUser,
  getUserByUserName,
} from '../../util/database';

export type RegisterResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  // check the method to be post

  if (req.method === 'POST') {
    // get the request body
    // const user = req.body;
    // console.log(user);
    // get the username

    if (
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password
    ) {
      res
        .status(400)
        .json({ errors: [{ message: `username or password not provided` }] });

      // return required to stop the code bellow from running
      return;
    }

    // here is the pace to add extra checks and constraints

    if (await getUserByUserName(req.body.username)) {
      res.status(401).json({
        errors: [
          { message: 'username in use, please try a different username' },
        ],
      });
      return;
    }

    // const username = user.username;

    // hash the password

    const passwordHash = await bcrypt.hash(req.body.password, 12);

    // console.log('hash', passwordHash);

    // create the user
    const newUser = await createUser(req.body.username, passwordHash);

    console.log('new user', newUser);

    // to use username as identifier return username too

    // create a session for user

    const token = crypto.randomBytes(80).toString('base64');
    console.log('my token', token);

    const session = await createSession(token, newUser.id);

    console.log('my sessiom', session);

    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    res
      .status(200)
      // tells the browser to create the cookie
      .setHeader('set-Cookie', serializedCookie)
      .json({ user: { id: newUser.id } });
  } else {
    res.status(405).json({ errors: [{ message: `method no allowed` }] });
  }
}
