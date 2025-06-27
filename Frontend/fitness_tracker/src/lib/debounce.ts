export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  delay = 300
): (...args: Parameters<F>) => void {
  let id: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}
