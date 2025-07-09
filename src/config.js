export default {
  "ui-infos": {
    "subreddit-name": "eskimozin",
    "header-img": {
      "url": "https://styles.redditmedia.com/t5_djonfq/styles/communityIcon_so6opouwbkwe1.jpeg?format=pjpg&s=87d36ec6c490962999a51fdc8b64bf180892131a",
      "alt": "Foto de perfil do r/eskimozin"
    },
    "developer-name": "Gabriel",
  },
  // "host": window.location.hostname === "localhost" ? "http://localhost:8001" : localStorage.getItem("prod-test") ? "https://resplendent-enjoyment-test.up.railway.app" : "https://gabriers.up.railway.app",
  "host": window.location.hostname === "localhost" ? "http://localhost:8001" : "https://gabriers.up.railway.app",
  // "modQueueServer": window.location.hostname === "localhost" ? "http://localhost:8010" : localStorage.getItem("prod-test") ? "https://server-reddit-mod-queue-test.up.railway.app" : "https://server-reddit-mod-queue-production.up.railway.app",
  "modQueueServer": window.location.hostname === "localhost" ? "http://localhost:8010" : "https://server-reddit-mod-queue-production.up.railway.app",
  "links": {
    "report": "https://github.com/eskimozin/reddit-mod-queue/issues/new",
    "subreddit": "https://reddit.com/r/eskimozin",
    "modqueue": "https://www.reddit.com/mod/eskimozin/queue",
    "developer": "https://github.com/gabriersdev",
  },
  "default-props": {
    "a": {
      "rel": "noopener noreferrer",
      "target": "_blank",
      "className": "focus-headless focus:text-white hover:text-white transition-colors",
    }
  },
}