// types from next.js fro response and request
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getReleases,
  insertNewReleaseIntoReleases,
} from '../../../util/database';

// get releases from database using function from database.ts to get this outputs to api in json format
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // // if not GET or POST, method not allowed
  // if(req.method !== 'POST' | req.method !== 'GET'){
  //   return res.status(405);
  // }

  // if method GET
  if (req.method === 'GET') {
    const releases = await getReleases();
    // console.log(releases);
    return res.status(200).json(releases);
  }

  // if method POST - testing with postman requires headers to be set to : KEY: Content-Type and VALUE: application/json
  if (req.method === 'POST') {
    console.log('what is the request.body for the post method', req.body);
    if (!req.body.releaseName || !req.body.releaseDate) {
      return res.status(400).json({
        error:
          'to insert new release, release name, number of tracks and release date are all required as a minimum',
      });
    }

    const newRelease = await insertNewReleaseIntoReleases(
      req.body.releaseName,
      req.body.tracks,
      req.body.releaseDate,
      req.body.recordLabel,
      req.body.coverArtLink,
      req.body.buyLink,
      req.body.streamingLink,
      req.body.bandcampLink,
    );

    // normal working with apis it to sent the response back
    return res.status(200).json(newRelease);
  }

  // if any method that is not allowed
  return res.status(405).json({ error: 'wrong way! method not allowed' });
}
