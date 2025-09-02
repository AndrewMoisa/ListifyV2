export function processMedia(data) {
  if (data.mediaUrl || data.mediaAlt) {
    const mediaItem = {};

    if (data.mediaUrl) {
      mediaItem.url = data.mediaUrl.trim();
    }

    if (data.mediaAlt) {
      mediaItem.alt = data.mediaAlt.trim();
    }

    data.media = [mediaItem]; // Wrap in an array

    delete data.mediaUrl;
    delete data.mediaAlt;
  } else {
    delete data.mediaUrl;
    delete data.mediaAlt;
  }
}
