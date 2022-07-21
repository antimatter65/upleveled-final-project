// types from next.js fro response and request
import { NextApiRequest, NextApiResponse } from 'next';
import { getAboutInfo } from '../../../util/database';

// import { updateAboutInfo } from '../../../utils/database';
// get releases from database using function from database.ts to get this outputs to api in json format
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // if method GET
  if (req.method === 'GET') {
    const releases = await getAboutInfo();
    // console.log(releases);
    return res.status(200).json(releases);
  }

  // if method PUT - testing with postman requires headers to be set to : KEY: Content-Type and VALUE: application/json
  //   if (req.method === 'PUT') {
  //     console.log('what is the request.body for the put method', req.body);
  //     if (!req.body.paragraph1) {
  //       res.status(400).json({
  //         error: 'to edit about page, paragraph_1 is required as a minimum',
  //       });
  //     }

  //     const newRelease = await updateAboutInfo(
  //       req.body.paragraph1,
  //       req.body.paragraph2,
  //       req.body.paragraph3,
  //       req.body.paragraph4,
  //       req.body.externalLink1,
  //       req.body.externalLink2,
  //       req.body.externalLink3,
  //     );

  //     // normal working with apis it to sent the response back
  //     return res.status(200).json(newRelease);
  //   }

  //   // if any method that is not allowed
  //   return res.status(405).json({ error: 'wrong way! method not allowed' });
}
