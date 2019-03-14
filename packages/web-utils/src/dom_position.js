export const getAbsolute = (reference, target) => {
  // 因为我们会将目标元素的边框纳入递归公式中，这里先减去对应的值
  const result = {
    left: -target.clientLeft,
    top: -target.clientTop,
  };
  let node = target;
  while (node !== reference && node !== document) {
    result.left = result.left + node.offsetLeft + node.clientLeft;
    result.top = result.top + node.offsetTop + node.clientTop;
    node = node.parentNode;
  }
  if (Number.isNaN(reference.scrollLeft)) {
    result.right = document.documentElement.scrollWidth - result.left;
    result.bottom = document.documentElement.scrollHeight - result.top;
  } else {
    result.right = reference.scrollWidth - result.left;
    result.bottom = reference.scrollHeight - result.top;
  }
  return result;
};
export const getViewport = (reference, target) => {
  const scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const scrollLeft =
    window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
  const windowHeight = window.innerHeight || document.documentElement.offsetHeight;
  const windowWidth = window.innerWidth || document.documentElement.offsetWidth;
  const absolutePosi = this.getAbsolute(document, target);
  const Viewport = {
    left: absolutePosi.left - scrollLeft,
    top: absolutePosi.top - scrollTop,
    right: windowWidth - (absolutePosi.left - scrollLeft),
    bottom: windowHeight - (absolutePosi.top - scrollTop),
  };
  return Viewport;
};
export const isViewport = target => {
  const position = this.getViewport(target);
  // 这里需要加上元素自身的宽高，因为定位点是元素的左上角
  if (position.left + target.offsetWidth < 0 || position.top + target.offsetHeight < 0) {
    return false;
  }
  if (position.bottom < 0 || position.right < 0) {
    return false;
  }
  return true;
};
