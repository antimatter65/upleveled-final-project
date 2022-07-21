export function getReducedRelease(releaseWithTrackData) {
  // if (!releaseWithTrackData) {
  //   const releaseWithAllTrackData = '';
  // } else {
  const releaseWithAllTrackData = {
    id: releaseWithTrackData[0].id,
    releaseName: releaseWithTrackData[0].releaseName,
    tracks: releaseWithTrackData[0].tracks,
    releaseDate: releaseWithTrackData[0].releaseDate,
    recordLabel: releaseWithTrackData[0].recordLabel,
    coverArtLink: releaseWithTrackData[0].coverArtLink,
    buyLink: releaseWithTrackData[0].buyLink,
    streamingLink: releaseWithTrackData[0].streamingLink,
    bandcampLink: releaseWithTrackData[0].bandcampLink,
    trackData: releaseWithTrackData.map((trackData) => {
      return {
        id: trackData.releaseId,
        trackName: trackData.trackName,
        colab: trackData.contributingArtists,
        trackLength: trackData.trackLength,
        trackNumber: trackData.trackNumber,
        releaseId: trackData.releaseId,
      };
    }),
  };
  return releaseWithAllTrackData;
}
