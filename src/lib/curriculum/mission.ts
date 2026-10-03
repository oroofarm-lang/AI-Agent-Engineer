/** Extract the first prose paragraph for the dashboard, without Markdown or code headings. */
export function missionSummary(body: string) {
  let active = false,
    fence = '';
  const paragraph: string[] = [];
  for (const line of body.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      fence = fence
        ? marker[1][0] === fence[0] && marker[1].length >= fence.length
          ? ''
          : fence
        : marker[1];
      continue;
    }
    if (fence) continue;
    if (/^## Mission\s*$/.test(line)) {
      active = true;
      continue;
    }
    if (!active) continue;
    if (/^## /.test(line)) break;
    if (/^\s*(?:#{1,6}\s|[-*+]\s|\d+\.\s|\|)/.test(line)) continue;
    if (!line.trim()) {
      if (paragraph.length) break;
      continue;
    }
    paragraph.push(line.trim());
  }
  return paragraph
    .join(' ')
    .replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
