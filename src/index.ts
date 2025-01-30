class CustomVideoPlayer {
    private videoElement: HTMLVideoElement;
    private controlsContainer: HTMLDivElement;
    private playPauseBtn: HTMLButtonElement;
    private stepBackBtn: HTMLButtonElement;
    private stepForwardBtn: HTMLButtonElement;
    private progressBar: HTMLInputElement;
    private volumeBar: HTMLInputElement;
    private fullscreenBtn: HTMLButtonElement;
    private currentTimeDisplay: HTMLSpanElement;
    private durationDisplay: HTMLSpanElement;
    private isDone: boolean = false;

    constructor(
        private containerId: string,
        private videoUrl: string,
    ) {
        this.initializeDOM();
        this.setupEventListeners();
        if (videoUrl)
            this.videoElement.src = videoUrl;
        else
            throw new Error('Please provide a valid video url..');
        this.addStyles();
    }

    private initializeDOM(): void {
        const container = document.getElementById(this.containerId);
        if (!container) throw new Error('Please provide a valid container id..');
        // Create video element for html page
        this.videoElement = document.createElement('video');
        this.videoElement.classList.add('video');
        this.videoElement.style.width = '100%';
        // Create controls container for video player
        this.controlsContainer = document.createElement('div');
        this.controlsContainer.classList.add('controls');
        // Create play/pause button
        this.playPauseBtn = this.createButton('▶', () => this.togglePlay());
        this.playPauseBtn.classList.add('control-button');
        // Create progress bar
        this.progressBar = document.createElement('input');
        this.progressBar.type = 'range';
        this.progressBar.min = '0';
        this.progressBar.value = '0';
        this.progressBar.classList.add('progress-bar');
        // Create volume bar
        this.volumeBar = document.createElement('input');
        this.volumeBar.type = 'range';
        this.volumeBar.min = '0';
        this.volumeBar.max = '1';
        this.volumeBar.step = '0.01';
        this.volumeBar.value = '1';
        this.volumeBar.classList.add('volume-bar');
        // Create fullscreen button
        this.fullscreenBtn = this.createButton('⛶', () => this.toggleFullscreen());
        this.fullscreenBtn.classList.add('control-button');
        // Add step back and step forward buttons
        this.stepBackBtn = this.createButton('⊴', () => this.step(-10));
        this.stepForwardBtn = this.createButton('⊵', () => this.step(10));
        this.stepBackBtn.classList.add('step-backBtn');
        this.stepForwardBtn.classList.add('step-ForwardBtn');
        // Create time displays
        const timeContainer = document.createElement('div');
        this.currentTimeDisplay = this.createTimeDisplay('00:00');
        this.durationDisplay = this.createTimeDisplay('00:00');
        timeContainer.style.display = 'flex';
        timeContainer.style.alignItems = 'center';
        timeContainer.style.gap = '10px';
        // Add time displays in progress bar
        timeContainer.append(
            this.currentTimeDisplay,
            this.progressBar,
            this.durationDisplay
        );
        // Append controls
        const controlsRow = document.createElement('div');
        controlsRow.classList.add('controls-row');
        controlsRow.append(
            this.playPauseBtn,
            this.stepBackBtn,
            this.stepForwardBtn,
            this.progressBar,
            this.volumeBar,
            this.fullscreenBtn,
            this.playPauseBtn,
            timeContainer
        );
        this.controlsContainer.append(controlsRow);
        container.append(this.videoElement, this.controlsContainer);
    }
    private createTimeDisplay(initialText: string): HTMLSpanElement {
        const display = document.createElement('span');
        display.style.color = '#fff';
        display.style.fontFamily = 'Arial, sans-serif';
        display.style.fontSize = '14px';
        display.style.minWidth = '50px';
        display.textContent = initialText;
        return display;
    }
    private formatTimeDisplay(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const leftSeconds = Math.floor(seconds % 60);
        return `${minutes}:${leftSeconds.toString()}`;
    }
    private createButton(text: string, clickHandler: () => void): HTMLButtonElement {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', clickHandler);
        return button;
    }
    /**
     * Setup event listeners for the video player
     */
    private setupEventListeners(): void {
        this.videoElement.addEventListener('timeupdate', () => this.updateProgress());
        this.videoElement.addEventListener('play', () => this.updatePlayState());
        this.videoElement.addEventListener('pause', () => this.updatePlayState());
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlay();
        });
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());

        this.progressBar.addEventListener('input', () => {
            this.isDone = true;
            this.videoElement.currentTime = + this.progressBar.value;
        });

        this.progressBar.addEventListener('change', () => {
            this.isDone = false;
        });

        this.volumeBar.addEventListener('input', () => {
            this.videoElement.volume = + this.volumeBar.value;
        });

        this.videoElement.addEventListener('loadedmetadata', () => {
            this.durationDisplay.textContent = this.formatTimeDisplay(this.videoElement.duration);
        });
    }
    /**
     * Step the video forward or backward by a specified number of seconds
     * @param seconds 
     */
    public step(seconds: number): void {
        if (this.videoElement.readyState > 0) {
            const newTime = this.videoElement.currentTime + seconds;
            console.log(newTime, this.videoElement.duration);

            this.videoElement.currentTime = Math.max(0, Math.min(newTime, this.videoElement.duration));
        }
    }
    /**
     * Update the play/pause button based on the video's current state
     */
    private updatePlayState(): void {
        this.playPauseBtn.textContent = this.videoElement.paused ? '▶' : '⏸';
    }
    /**
     * Update the progress bar based on the video's current time
     */
    private updateProgress(): void {
        if (!this.isDone) {
            this.progressBar.value = this.videoElement.currentTime.toString();
            this.currentTimeDisplay.textContent = this.formatTimeDisplay(this.videoElement.currentTime);
        }
        this.progressBar.max = this.videoElement.duration.toString();
        if (!isNaN(this.videoElement.duration)) {
            this.durationDisplay.textContent = this.formatTimeDisplay(this.videoElement.duration);
        }
    }
    /**
     * Toggle play/pause state of the video
     */
    private togglePlay(): void {
        if (this.videoElement.paused) {
            this.videoElement.play();
        } else {
            this.videoElement.pause();
        }
    }
    /**
     * Toggle fullscreen mode
     */
    private toggleFullscreen(): void {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            this.videoElement.requestFullscreen().catch(console.error);
        }
    }
    /**
     * Add styles to the video player
     */
    private addStyles(): void {
        const style = document.createElement('style');
        style.textContent = `
            #${this.containerId} {
                max-width: 800px;
                margin: 0 auto;
                position: relative;
                background: #000;
                border-radius: 10px;
                overflow: hidden;
            }
            .video {
                display: block;
                width: 100%;
                height: auto;
            }
            .controls {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.7);
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transition: opacity 0.3s;
            }
            .controls:hover {
                opacity: 1;
            }
            .controls-row {
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;
            }
            .control-button {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 5px;
                transition: color 0.2s;
            }
            .control-button:hover {
                color: #ff0000;
            }
            .progress-bar {
                flex-grow: 1;
                height: 5px;
                background: #444;
                border-radius: 5px;
                cursor: pointer;
                transition: height 0.2s;
            }
            .progress-bar:hover {
                height: 8px;
            }
            .volume-bar {
                width: 80px;
                height: 5px;
                background: #444;
                border-radius: 5px;
                cursor: pointer;
                transition: height 0.2s;
            }
            .volume-bar:hover {
                height: 8px;
            }
            .step-button {
                font-size: 18px;
                padding: 5px 8px;
                margin: 0 5px;
            }
            .progress-bar {
                margin: 0 10px;
                flex-grow: 1;
            }
            .step-backBtn:hover, .step-ForwardBtn:hover{
                background-color:#ff0000;
            }

        `;
        // Append styles to the head to run the styles
        document.head.appendChild(style);

        const styleTime = document.createElement('style');
        styleTime.textContent = `
        /* Time displays */
        .time-display {
            font-family: monospace;
            font-size: 14px;
            color: white;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        /* Progress bar container */
        .progress-container {
            flex-grow: 1;
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 0 15px;
        }
    `;
        this.controlsContainer.appendChild(styleTime);
    }
}

// Export for module usage
export default CustomVideoPlayer;