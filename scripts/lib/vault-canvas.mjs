import { createHash } from 'node:crypto';

const id = (prefix, value) =>
  `${prefix}-${createHash('sha256').update(value).digest('hex').slice(0, 24)}`;

/** A focused view contains only real notes and relationships from the complete graph. */
export function focusedCanvas({ root, groups, vertices, edges, ids }) {
  const nodes = [],
    seen = new Set([root]);
  if (!vertices.has(root)) throw new Error('Unknown focused Canvas root');
  nodes.push({
    id: ids.get(root),
    type: 'file',
    file: root,
    subpath: `#${vertices.get(root).title}`,
    x: 1000,
    y: 0,
    width: 560,
    height: 180,
    color: '4',
  });
  groups.forEach(({ label, files, color }, column) => {
    const members = files.filter((file) => {
      if (!vertices.has(file)) throw new Error('Unknown focused Canvas note');
      if (seen.has(file)) return false;
      seen.add(file);
      return true;
    });
    if (!members.length) return;
    const x = column * 1420;
    nodes.push({
      id: id('group', `${root}\0${label}`),
      type: 'group',
      x: x - 24,
      y: 250,
      width: 1370,
      height: Math.ceil(members.length / 2) * 230 + 110,
      label,
      color,
    });
    members.forEach((file, row) =>
      nodes.push({
        id: ids.get(file),
        type: 'file',
        file,
        subpath: `#${vertices.get(file).title}`,
        x: x + (row % 2) * 680,
        y: 330 + Math.floor(row / 2) * 230,
        width: 640,
        height: 180,
        color,
      }),
    );
  });
  const included = new Set(nodes.filter((node) => node.type === 'file').map((node) => node.id));
  return {
    nodes,
    edges: edges.filter((edge) => included.has(edge.fromNode) && included.has(edge.toNode)),
  };
}
