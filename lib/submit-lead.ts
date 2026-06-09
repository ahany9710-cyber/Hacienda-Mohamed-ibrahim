const LEAD_API = "/api/lead";

/**
 * Submit a lead without blocking on Formspree latency.
 * Uses keepalive so the request can finish during navigation to thank-you.
 */
export function submitLeadAndRedirect(
  payload: Record<string, string>,
  redirectTo = "/thank-you"
): void {
  void fetch(LEAD_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  });

  window.location.assign(redirectTo);
}
