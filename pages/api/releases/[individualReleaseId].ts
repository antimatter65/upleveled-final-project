// types from next.js fro response and request
import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteReleaseFromReleasesById,
  getRelease,
  updateReleaseInReleases,
} from '../../../util/database';

// import { getReleases, insertNewReleaseIntoReleases } from '../../../utils/database';

// get releases from database using function from database.ts to get this outputs to api in json format
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Number is required to change the string into a number
  const individualReleaseId = Number(req.query.individualReleaseId);

  if (!individualReleaseId) {
    return res.status(400).json({ error: 'release id does not exist' });
  }

  if (req.method === 'GET') {
    const individualRelease = await getRelease(individualReleaseId);

    // too make sue that url number refers to a release in the database (this doesn't work as it gives an empty array as getReleaseByReleaseId has a join query for releases and release1 databases)
    // if (!individualRelease) {
    //   return res.status(400).json({ error: 'release id does not exist' });
    // }

    return res.status(200).json(individualRelease);
  }

  // to updated a release within the releases database from release_id in url - working but requires data for all columns in the database other than id to be included in the request.body -

  if (req.method === 'PUT') {
    if (!individualReleaseId) {
      return res.status(400).json({
        error: 'to insert into current release, a valid release_id is required',
      });
    }

    const updatedRelease = await updateReleaseInReleases(
      individualReleaseId,
      req.body.releaseName,
      req.body.tracks,
      req.body.releaseDate,
      req.body.recordLabel,
      req.body.coverArtLink,
      req.body.buyLink,
      req.body.streamingLink,
      req.body.bandcampLink,
    );

    //   // normal working with apis it to sent the response back
    return res.status(200).json(updatedRelease);
  }

  // delete a individual release by id
  if (req.method === 'DELETE') {
    const deleteRelease = await deleteReleaseFromReleasesById(
      individualReleaseId,
    );

    return res.status(200).json(deleteRelease);
  }

  // if any other method used
  return res.status(405).json({ error: 'wrong way! method not allowed' });
}
