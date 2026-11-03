// Records a short looping video of every animation for the overview grid.
// Running 24 live animations at once is too heavy, so the grid plays these
// videos instead; the detail slides still show the live animation.
//
// Needs Google Chrome and ffmpeg (with libx264). Run from the project root:
//   node tools/record-thumbnails.mjs              (all animations)
//   node tools/record-thumbnails.mjs noise system (only these)
// Set CHROME=/path/to/chrome if Chrome isn't in the default macOS location.

import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'thumbnails');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const VIEWPORT = { width: 1080, height: 1080 }; // render size: square like the grid cells, wide enough for the desktop layout
const OUTPUT = '480:480'; // video size, plenty for a grid cell
const WARMUP = 3; // seconds before recording starts (fonts, first frames)
const LENGTH = 9; // seconds recorded
const FADE = 1; // seconds crossfaded so the loop has no visible jump (video is LENGTH - FADE long)

// How the pointer behaves while recording. Default is 'idle' (no input).
// 'move'  : the pointer keeps moving over the animation
// 'press' : like 'move', with the mouse button held down in the middle of the clip
// 'nudge' : moves briefly at the start, then stays still
const POINTER = {
  'balancing-feedback': 'move',
  invisible: 'move',
  'lines-of-flight': 'move',
  neutrum: 'move',
  noise: 'move',
  recursivity: 'move',
  'out-of-control': 'press',
  silence: 'nudge',
};

// Clicks during the recording: seconds into the clip, and where (as a fraction
// of the width and height). Works next to any POINTER mode.
const CLICKS = {
  // plant the first dot right away, next to the title instead of on it
  'reinforcing-feedback': [{ t: 0.2, x: 0.2, y: 0.2 }],
  // circle -> word -> circle
  trigger: [{ t: 1.5, x: 0.5, y: 0.5 }, { t: 5, x: 0.5, y: 0.5 }],
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------- Static file server for the project ----------

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.ttf': 'font/ttf' };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try {
    const body = readFileSync(join(ROOT, path));
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

// ---------- Headless Chrome over the DevTools protocol ----------

const profile = mkdtempSync(join(tmpdir(), 'record-thumbnails-'));
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--hide-scrollbars', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const browserUrl = await new Promise((resolve, reject) => {
  let log = '';
  chrome.stderr.on('data', (chunk) => {
    log += chunk;
    const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
    if (match) resolve(match[1]);
  });
  chrome.on('exit', () => reject(new Error(`Chrome exited:\n${log}`)));
});
const debugPort = new URL(browserUrl).port;

async function openTab() {
  const { webSocketDebuggerUrl } = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));
  let id = 0;
  const pending = new Map();
  const listeners = new Map();
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id) pending.get(message.id)?.(message.result);
    else listeners.get(message.method)?.(message.params);
  });
  return {
    send: (method, params = {}) => new Promise((resolve) => {
      pending.set(++id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    }),
    on: (method, fn) => listeners.set(method, fn),
    close: () => ws.close(),
  };
}

// ---------- Recording ----------

async function record(slug) {
  const tab = await openTab();
  await tab.send('Page.enable');
  await tab.send('Emulation.setDeviceMetricsOverride', { ...VIEWPORT, deviceScaleFactor: 1, mobile: false });
  await tab.send('Page.navigate', { url: `${base}/animations/${slug}.html` });
  await wait(WARMUP * 1000);

  const frames = [];
  tab.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    frames.push({ data, time: metadata.timestamp });
    tab.send('Page.screencastFrameAck', { sessionId });
  });
  await tab.send('Page.startScreencast', { format: 'jpeg', quality: 92, ...{ maxWidth: VIEWPORT.width, maxHeight: VIEWPORT.height }, everyNthFrame: 1 });

  // Drive the pointer along a smooth figure-eight that repeats once per clip
  const mode = POINTER[slug] || 'idle';
  const clicks = [...(CLICKS[slug] || [])];
  const start = Date.now();
  let pressed = false;
  while (Date.now() - start < LENGTH * 1000) {
    const t = (Date.now() - start) / 1000;
    const phase = (t / (LENGTH - FADE)) * Math.PI * 2;
    const x = VIEWPORT.width * (0.5 + 0.38 * Math.sin(phase));
    const y = VIEWPORT.height * (0.5 + 0.3 * Math.sin(phase * 2));
    const moving = mode === 'move' || mode === 'press' || (mode === 'nudge' && t > 0.5 && t < 2.5);
    if (moving) await tab.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: pressed ? 'left' : 'none' });
    if (mode === 'press' && !pressed && t > 2) {
      pressed = true;
      await tab.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    }
    if (mode === 'press' && pressed && t > 5.5) {
      pressed = false;
      await tab.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
    }
    while (clicks.length && t >= clicks[0].t) {
      const click = clicks.shift();
      const at = { x: VIEWPORT.width * click.x, y: VIEWPORT.height * click.y, button: 'left', clickCount: 1 };
      await tab.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...at, button: 'none' });
      await tab.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...at });
      await tab.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...at });
    }
    await wait(16);
  }
  const end = frames.length ? frames[0].time + LENGTH : 0;
  await tab.send('Page.stopScreencast');
  tab.close();
  if (frames.length < 2) throw new Error(`${slug}: no frames captured`);

  // Write the frames with their real durations, then let ffmpeg resample to 30 fps
  const dir = mkdtempSync(join(tmpdir(), `frames-${slug}-`));
  let list = '';
  frames.forEach((frame, i) => {
    const file = `${String(i).padStart(5, '0')}.jpg`;
    writeFileSync(join(dir, file), Buffer.from(frame.data, 'base64'));
    const next = i + 1 < frames.length ? frames[i + 1].time : end;
    list += `file '${file}'\nduration ${Math.max(0.001, next - frame.time).toFixed(4)}\n`;
  });
  list += `file '${String(frames.length - 1).padStart(5, '0')}.jpg'\n`;
  writeFileSync(join(dir, 'frames.txt'), list);

  // The last FADE seconds crossfade into the first FADE seconds, so the loop is seamless
  const main = LENGTH - FADE;
  const filter = [
    `[0:v]fps=30,scale=${OUTPUT}:flags=lanczos,format=yuv420p,split[a][b]`,
    `[a]trim=start=${FADE}:end=${LENGTH},setpts=PTS-STARTPTS[main]`,
    `[b]trim=start=0:end=${FADE},setpts=PTS-STARTPTS[head]`,
    `[main][head]xfade=transition=fade:duration=${FADE}:offset=${main - FADE}[out]`,
  ].join(';');
  const ffmpeg = spawnSync('ffmpeg', [
    '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', join(dir, 'frames.txt'),
    '-filter_complex', filter, '-map', '[out]', '-an',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-maxrate', '2M', '-bufsize', '4M', '-movflags', '+faststart',
    join(OUT, `${slug}.mp4`),
  ], { encoding: 'utf8' });
  rmSync(dir, { recursive: true, force: true });
  if (ffmpeg.status !== 0) throw new Error(`${slug}: ffmpeg failed\n${ffmpeg.stderr}`);

  const fps = (frames.length / LENGTH).toFixed(0);
  console.log(`${slug.padEnd(22)} ${frames.length} frames (~${fps} fps captured), pointer: ${mode}`);
}

mkdirSync(OUT, { recursive: true });
const all = readdirSync(join(ROOT, 'animations')).filter((f) => f.endsWith('.html')).map((f) => f.replace('.html', ''));
const slugs = process.argv.length > 2 ? process.argv.slice(2) : all;

try {
  for (const slug of slugs) await record(slug);
} finally {
  const exited = new Promise((resolve) => chrome.once('exit', resolve));
  chrome.kill();
  await exited;
  server.close();
  rmSync(profile, { recursive: true, force: true, maxRetries: 5 });
}
