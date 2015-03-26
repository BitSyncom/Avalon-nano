function init() {
	chrome.hid.getDevices(FILTERS, function(devices) {
		if (chrome.runtime.lastError) {
			console.error(chrome.runtime.lastError);
			return;
		}
		for (device of devices) {
			chrome.hid.connect(device.deviceId, function(connection) {
				if (chrome.runtime.lastError) {
					console.error(chrome.runtime.lastError);
					return;
				}
				nanos.push(new Nano(device, connection));
			});
		}
	});
}

var TEST = [
	0x17, 0x8a, 0xb1, 0x9c, 0x1e, 0x0d, 0xc9, 0x65,
	0x1d, 0x37, 0x41, 0x8f, 0xbb, 0xf4, 0x4b, 0x97,
	0x6d, 0xfd, 0x45, 0x71, 0xc0, 0x92, 0x41, 0xc4,
	0x95, 0x64, 0x14, 0x12, 0x67, 0xef, 0xf8, 0xd8,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x01, 0xd0, 0xc1, 0x4a,
	0x50, 0x70, 0x51, 0x88, 0x1a, 0x05, 0x7e, 0x08
];

var nanos = [];
init();
setTimeout(function() {
	nanos[0].detect();
}, 1000);

var wait = setInterval(function() {
	if (nanos[0].valid) {
		nanos[0].work(new Uint8Array(TEST).buffer);
		clearInterval(wait);
	}
}, 1000);
