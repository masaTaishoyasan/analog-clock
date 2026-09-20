
const CACHE_NAME = "analog-clock-v1";

const FILES = [
  "./",
  "./index.html"
];

// 時計のファイルをiPhoneに保存する
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

// 新しいService Workerを有効にする
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// 保存済みファイルを優先して読み込む
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
