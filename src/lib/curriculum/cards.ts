/** Keep fenced code intact while splitting long sections into readable cards. */
export function markdownCards(body: string, maxLength = 1400): string[] {
  const blocks: string[] = [];
  let current: string[] = [],
    fence = '';
  for (const line of body.trim().split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker)
      fence = fence
        ? marker[1][0] === fence[0] && marker[1].length >= fence.length
          ? ''
          : fence
        : marker[1];
    if (!line.trim() && !fence && current.length) {
      blocks.push(current.join('\n'));
      current = [];
    } else current.push(line);
  }
  if (current.length) blocks.push(current.join('\n'));
  const cards: string[] = [];
  let card = '';
  for (const block of blocks) {
    if (card && card.length + block.length > maxLength) {
      cards.push(card);
      card = '';
    }
    card += (card ? '\n\n' : '') + block;
  }
  if (card) cards.push(card);
  return cards;
}
