export default function stringFormat(format, ...args) {
  return format.replace(/{(\d+)}/g, (match, number) =>
    typeof args[number] !== 'undefined' ? args[number] : match,
  );
}
