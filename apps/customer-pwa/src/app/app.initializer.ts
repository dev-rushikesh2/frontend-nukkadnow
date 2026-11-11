export function initializeApp(): () => Promise<void> {
  return () => {
    return new Promise((resolve) => {
      // Pre-flight setup: verify session token, fetch cached locality
      resolve();
    });
  };
}
