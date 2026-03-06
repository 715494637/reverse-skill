# Anti-Bot Surface Matrix

## Slider or Point-Select Captcha
- First anchor: challenge bootstrap, verify request, and trajectory packer.
- Observe first: event timestamps, pointer path packing, canvas or image transforms, challenge token writer.
- Common sinks: body payload, verify token header, cookie relay.
- Common mistake: replaying final payload without reproducing challenge state and timing constraints.

## Device Fingerprint or Blackbox
- First anchor: config object such as `_fmOpt`, bootstrap script, profile or fingerprint request, and the final writer of `blackbox` or `black_box`.
- Observe first: navigator, screen, canvas, storage, time, random, audio, or WebGL reads.
- Common sinks: hidden form field, header, cookie, storage cache, or bootstrap request body.
- Common mistake: treating blackbox as one crypto function instead of a collected profile plus encoding stage.

## WAF Token or Sensor Data
- First anchor: challenge script loader, sensor builder, cookie or header setter, and renewal trigger.
- Observe first: page lifecycle hooks, storage, motion or scroll telemetry, compression or encoding stage.
- Common sinks: cookie, header, hidden field, or follow-up challenge request.
- Common mistake: cloning a token value without the sequence that refreshes or contextualizes it.

## Worker-Backed Risk Logic
- First anchor: `new Worker`, blob bootstrap, `postMessage`, and the worker response writer.
- Observe first: what the main thread sends in, what the worker returns, and which environment values are sampled inside the worker.
- Common mistake: patching main-thread globals while the decisive reads happen inside the worker realm.