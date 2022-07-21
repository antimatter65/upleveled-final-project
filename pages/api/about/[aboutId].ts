// types from next.js fro response and request
import { NextApiRequest, NextApiResponse } from 'next';
import { getAboutInfo, updateAboutInfo } from '../../../utils/database';

// import { getReleases, insertNewReleaseIntoReleases } from '../../../utils/database';

// get releases from database using function from database.ts to get this outputs to api in json format
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Number is required to change the string into a number
  const aboutId = Number(req.query.aboutId);

  if (!aboutId) {
    return res.status(400).json({
      error: ' database about does not contain that id / id does not exist',
    });
  }

  if (req.method === 'GET') {
    const aboutData1 = await getAboutInfo();

    // too make sue that url number refers to a release in the database (this doesn't work as it gives an empty array as getReleaseByReleaseId has a join query for releases and release1 databases)
    // if (!aboutData1) {
    //   return res
    //     .status(400)
    //     .json({ error: 'about database id does not exist' });
    // }

    return res.status(200).json(aboutData1);
  }

  // to updated a release within the releases database from release_id in url - working but requires data for all columns in the database other than id to be included in the request.body -

  if (req.method === 'PUT') {
    console.log('what is the request.body for the put method', req.body);
    if (!req.body.paragraph1) {
      res.status(400).json({
        error: 'to edit about page, paragraph_1 is required as a minimum',
      });
    }

    const newAboutData = await updateAboutInfo(
      req.body.paragraph1,
      req.body.paragraph2,
      req.body.paragraph3,
      req.body.paragraph4,
      req.body.externalLink1,
      req.body.externalLink2,
      req.body.externalLink3,
    );

    // normal working with apis it to sent the response back
    return res.status(200).json(newAboutData);
  }

  // if any method that is not allowed
  return res.status(405).json({ error: 'wrong way! method not allowed' });
}
