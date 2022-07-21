// api address need to be replaced by the address given by heroku for production
export default async function handler(req, res) {
  // get the releases from database
  await res
    .status(200)
    .json({ releases: 'http://localhost:3000/api/releases' });
}
