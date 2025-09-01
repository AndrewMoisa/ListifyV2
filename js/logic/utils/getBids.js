export function getBids(bids) {
  bids =
    bids?.map((bid) => ({
      name: bid.bidder.name,
      amount: bid.amount,
    })) || [];

  bids.sort((a, b) => {
    // Sort by amount first (ascending)
    if (a.amount !== b.amount) {
      return a.amount - b.amount;
    }
    // If amounts are equal, sort by name (ascending)
    return a.name.localeCompare(b.name);
  });

  return bids;
}
