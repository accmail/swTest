console.log('Started', self);

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  //console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  var payload = event.data ? event.data.json() : 'no payload';

  var title = payload.notification.title || 'Title';

  var body = payload.notification.body || 'Body message';

  const options = {
    body: body,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
/*b opens url
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
*/

self.addEventListener('notificationclick', function (event) {
  //opens app
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function (clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
});
