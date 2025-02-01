A modern, customizable video player built with TypeScript, featuring YouTube-like controls and seamless browser integration.
## Features ✨
- ▶️ Play/Pause controls
- ⏪⏩ Step forward/backward (10 seconds)
- 🔈 Volume slider
- 📊 Interactive progress bar with time display
- 🖥️ Fullscreen toggle
- 📱 Responsive design
- 🎨 Customizable UI via CSS
- 🚀 TypeScript support

## Installation 💻
### Via npm
```bash
npm install video-player-lib
```
## Development 👨💻
1. Clone repo:
```bash
git clone https://github.com/Ereh11/Video-Player.git
```
2. Install dependencies:
```bash
npm install
```
3. Build:
```bash
npm run build
```
## Usage 🛠️
1- Create HTML page and make a container with any id like
```html
<div id="video-container"></div>
```
2- Create JS script with
```JS
import CustomVideoPlayer from 'video-player-lib';

const player = new CustomVideoPlayer(
  'video-container',
  'https://example.com/video.mp4'
);
```
3- Customization 🎨
Override CSS variables in your stylesheet:
```CSS
:root {
  --primary-color: #ff4757;
  --control-bg: rgba(0,0,0,0.8);
  --progress-height: 6px;
}
```
## Contributing 🤝
PRs welcome! Please open an issue first to discuss changes.
## License 📄
MIT © [Hani Saad, hanysaadstd@gmail.com]