import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByValidSessionToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // get the cookie from the request
    const token = req.cookies.sessionToken;

    if (!token) {
      res
        .status(400)
        .json({ errors: [{ message: 'no session token passed' }] });
    }
    // get the user from the token

    const user = await getUserByValidSessionToken(token);

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'session token not valid' }] });
    }

    // return the user
    return (
      res
        .status(200)
        // tells the browser to create the cookie
        .json({ user: user })
    );
  } else {
    return res.status(405).json({ errors: [{ message: `method no allowed` }] });
  }
}
