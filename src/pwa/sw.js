const CACHE_NAME = 'cache-v3'

// 不能访问dom window、localStorage 等
self.addEventListener('install',event =>{
    console.log('install',event)
    //
    // event.waitUntil(new Promise(resolve => {
    //     setTimeout(resolve, 5000)
    // }))

    // event.waitUntil(self.skipWaiting())

    // 写入到缓存中
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
        cache.addAll([
            '/',
            './index.css'
        ])
    }))
})

self.addEventListener('activate',event =>{
    console.log('activate',event)

    // event.waitUntil(self.clients.claim())
    // 清理上一次缓存的最佳时机
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
                return caches.delete(cacheName)
            }
        }))
    }))
})

self.addEventListener('fetch',event =>{
    console.log('fetch',event)

    event.respondWith(caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
            if (response) {
                return response
            }

            return fetch(event.request).then(response => {
                cache.put(event.request,response.clone())

                return response
            })
        })
    }))
})