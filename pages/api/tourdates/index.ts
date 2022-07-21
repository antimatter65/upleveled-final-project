// types from next.js fro response and request
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getTourDates,
  insertNewTourDateIntoTourDates,
} from '../../../util/database';

// get tour dates from database tourdates using function from database.ts to get this outputs to api in json format
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // // if not GET or POST, method not allowed
  // if(req.method !== 'POST' | req.method !== 'GET'){
  //   return res.status(405);
  // }

  // if method is GET
  if (req.method === 'GET') {
    const tourDates = await getTourDates();
    // console.log(releases);
    return res.status(200).json(tourDates);
  }

  // if method POST - testing with postman requires headers to be set to : KEY: Content-Type and VALUE: application/json
  if (req.method === 'POST') {
    // if (!req.body.tourdatesDate || !req.body.tourdatesLocation) {
    //   res.status(400).json({
    //     error:
    //       'to insert new tour date the event date and location are both all required as a minimum',
    //   });
    // }

    const newTourDate = await insertNewTourDateIntoTourDates(
      req.body.location,
      req.body.date,
      req.body.eventLocation,
      req.body.type,
      req.body.eventLink,
      req.body.ticketLink,
      req.body.ticketsLeft,
      req.body.streamingLink,
    );

    console.log(newTourDate);

    // normal working with apis it to sent the response back
    return res.status(200).json(newTourDate);
  }

  // if any method that is not allowed
  return res.status(405).json({ error: 'wrong way! method not allowed' });
}
