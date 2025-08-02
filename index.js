module.exports = async (req, res) => {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const pathname = url.pathname;

    // Manifest endpoint
    if (pathname === "/manifest.json") {
        const manifest = {
            id: "ppv.stream.addon",
            version: "1.0.0",
            name: "MLS Stream Testing Add-on",
            description: "Direct m3u8 stream",
            resources: ["stream"],
            types: ["movie"],
            catalogs: []
        };
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(manifest));
    }

    // Stream endpoint
    if (pathname.startsWith("/stream/")) {
        const stream = {
            streams: [
                {
                    title: "Live PPV Stream",
                    url: "https://5nhp186eg31fofnc.chinese-restaurant-api.site/v3/variant/VE1AO1NTbu8mbv12LxEWM21ycrNWYyR3LhhTZ1UzMmlzN3gTMtEGOihTL3EGN00yY4UWYtIjY5YjN2YTZ/master.m3u8",
                    behaviorHints: {
                        proxyHeaders: {
                            request: {
                                "Referer": "https://ppv.to",
                                "User-Agent": "Mozilla/5.0"
                            }
                        }
                    }
                }
            ]
        };
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(stream));
    }

    // Not found
    res.statusCode = 404;
    res.end("Not Found");
};