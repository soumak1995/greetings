/**
 * Silent submission of her replies to the Netlify Form "ankita-reply".
 * Submissions land in the Netlify dashboard and (once email notifications
 * are enabled) in soumak1996@gmail.com.
 * Each reply carries the sender's device context, parsed from the browser.
 */

function deviceName() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  if (/Android/.test(ua)) {
    const model = ua.match(/Android [\d.]+; ([^;)]+)/)?.[1];
    const isTablet = /Mobile/.test(ua) === false;
    return model && model !== "wv" ? `${model}${isTablet ? " tablet" : " phone"}` : isTablet ? "Android tablet" : "Android phone";
  }
  if (/Macintosh/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows PC";
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown device";
}

function browserName() {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/SamsungBrowser\//.test(ua)) return "Samsung Internet";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua)) return "Safari";
  return "Unknown browser";
}

function deviceContext() {
  const dpr = window.devicePixelRatio || 1;
  const connection = navigator.connection?.effectiveType
    ? ` · net ${navigator.connection.effectiveType}`
    : "";
  return (
    `${deviceName()} · ${browserName()}` +
    ` · screen ${window.screen.width}x${window.screen.height} @${dpr}x` +
    ` · viewport ${window.innerWidth}x${window.innerHeight}` +
    ` · ${navigator.language}` +
    ` · ${Intl.DateTimeFormat().resolvedOptions().timeZone}` +
    connection
  );
}

export function postReply(step, answer) {
  try {
    const body = new URLSearchParams({
      "form-name": "ankita-reply",
      step,
      answer,
      at: new Date().toLocaleString(),
      device: deviceContext(),
    });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }).catch(() => {});
  } catch {
    // never let a failed submission break the magic ✨
  }
}
