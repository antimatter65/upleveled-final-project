// crypto used bor crating a random token
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';
import {
  createSession,
  getUserWithPasswordHashByUsername,
} from '../../utils/database';

export type LoginResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseBody>,
) {
  // check the method to be post

  if (req.method === 'POST') {
    // get the request body
    // const userWithPasswordOnlyUseWhereNeeded = req.body;
    // console.log(userWithPasswordOnlyUseWhereNeeded);
    // get the username

    if (
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password
    ) {
      res
        .status(401)
        .json({ errors: [{ message: `username or password not provided` }] });

      // return required to stop the code bellow from running
      return;
    }

    // this var should only be used where strictly needed as it is a risk of exposing passwords
    const userWithPasswordOnlyUseWhereNeeded =
      await getUserWithPasswordHashByUsername(req.body.username);

    if (!userWithPasswordOnlyUseWhereNeeded) {
      res.status(401).json({
        errors: [
          {
            message: 'password or username are incorrect',
          },
        ],
      });
      return;
    }

    // console.log(userWithPasswordOnlyUseWhereNeeded);
    // compare the hash and the password

    const passwordMatchHash = await bcrypt.compare(
      req.body.password,
      userWithPasswordOnlyUseWhereNeeded.passwordHash,
    );

    console.log('password match?', passwordMatchHash);

    if (!passwordMatchHash) {
      res
        .status(401)
        .json({ errors: [{ message: `password or username are incorrect` }] });
    }

    // console.log('hash', passwordHash);

    const userId = userWithPasswordOnlyUseWhereNeeded.id;

    // create a session for user - create after validation of the hash and before the response

    const token = crypto.randomBytes(80).toString('base64');
    console.log('my token', token);

    const session = await createSession(token, userId);

    console.log('my sessiom', session);

    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    res
      .status(200)
      // tells the browser to create the cookie
      .setHeader('set-Cookie', serializedCookie)
      .json({ user: { id: userId } });
  } else {
    res.status(405).json({ errors: [{ message: `method no allowed` }] });
  }
}
