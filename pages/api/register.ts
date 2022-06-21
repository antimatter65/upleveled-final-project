import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../utls/database';

type RegisterResponseBody =
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
  ///check the method to be post

  if (req.method === 'POST') {
    // get the request body
    const user = req.body;
    console.log(user);
    // get the username

    const username = user.username;

    // hash the password

    const password_hash = await bcrypt.hash(req.body.password, 12);

    // console.log('hash', password_hash);
    // create the user
    const newUser = await createUser(req.body.username, password_hash);

    console.log('new user', newUser);

    res.status(200).json({ user: { id: 1 } });
  } else {
    res.status(405).json({ errors: [{ message: `method no allowed` }] });
  }
}
