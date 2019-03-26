export default function treeToList(items, parent) {
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
