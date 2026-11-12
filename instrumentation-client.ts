const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (typeof window !== "undefined" && posthogKey) {
  const initAnalytics = () => {
    import("posthog-js")
      .then(({ default: posthog }) => {
        posthog.init(posthogKey, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          capture_pageview: "history_change",
          capture_pageleave: true,
        });
      })
      .catch(() => {
        // Ignore analytics blocked by client extensions
      });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(initAnalytics, { timeout: 2500 });
  } else {
    setTimeout(initAnalytics, 1200);
  }
}
