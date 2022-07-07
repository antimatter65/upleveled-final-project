// types from next.js fro response and request
import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteEventDateFromTourDatesById,
  getEvent,
  updateEventInTourDates,
} from '../../../utils/database';

// get tourdates from database using function from database.ts to get this outputs to api in json format
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Number is required to change the sting into a number
  // req.query.eventId is from the url ie [eventId]
  const eventId = Number(req.query.eventId);

  if (!eventId) {
    return res.status(400).json({ error: 'event does not exist' });
  }

  if (req.method === 'GET') {
    const eventData = await getEvent(eventId);

    // too make sue that url number refers to an event in the database
    if (!eventData) {
      return res
        .status(400)
        .json({ error: 'event does not exist / incorrect' });
    }

    return res.status(200).json(eventData);
  }

  // to updated a event within the tourdates database from eventId in url - working but requires data for all columns in the database other than id to be included in the request.body

  if (req.method === 'PUT') {
    if (!eventId) {
      res.status(400).json({
        error:
          'to change current event data, a valid date and location is required',
      });
    }

    const updatedEvent = await updateEventInTourDates(
      eventId,
      req.body.location,
      req.body.date,
      req.body.eventLocation,
      req.body.type,
      req.body.eventLink,
      req.body.ticketLink,
      req.body.ticketsLeft,
      req.body.streamingLink,
    );

    // normal working with apis it to sent the response back
    return res.status(200).json(updatedEvent);
  }

  // delete a individual release by id
  if (req.method === 'DELETE') {
    const deleteEvent = await deleteEventDateFromTourDatesById(eventId);

    return res.status(200).json(deleteEvent);
  }

  // if any other method used
  return res.status(405).json({ error: 'wrong way! method not allowed' });
}
