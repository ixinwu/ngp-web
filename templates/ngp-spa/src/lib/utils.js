export function listToTree(list) {
  const map = {};
  let node;
  const roots = [];
  let i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== null) {
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

export function treeToList(items, parent) {
  let data = [];

  items.forEach(item => {
    data.push({
      ...item,
      parentId: parent ? parent.id : null,
    });
    data = data.concat(treeToList(item.children || [], item));
  });

  return data;
}
