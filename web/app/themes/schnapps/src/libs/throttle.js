export default function throttle(func, timeout = 300) {
  let wait = false;

  return (...args) => {
    if (wait) {
      return;
    }

    func(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, (timeout = 300));
  };
}
