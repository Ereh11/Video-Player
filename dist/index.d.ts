declare class CustomVideoPlayer {
    private containerId;
    private videoUrl;
    private videoElement;
    private controlsContainer;
    private playPauseBtn;
    private stepBackBtn;
    private stepForwardBtn;
    private progressBar;
    private volumeBar;
    private fullscreenBtn;
    private currentTimeDisplay;
    private durationDisplay;
    private isDone;
    constructor(containerId: string, videoUrl: string);
    private initializeDOM;
    private createTimeDisplay;
    private formatTimeDisplay;
    private createButton;
    /**
     * Setup event listeners for the video player
     */
    private setupEventListeners;
    /**
     * Step the video forward or backward by a specified number of seconds
     * @param seconds
     */
    step(seconds: number): void;
    /**
     * Update the play/pause button based on the video's current state
     */
    private updatePlayState;
    /**
     * Update the progress bar based on the video's current time
     */
    private updateProgress;
    /**
     * Toggle play/pause state of the video
     */
    private togglePlay;
    /**
     * Toggle fullscreen mode
     */
    private toggleFullscreen;
    /**
     * Add styles to the video player
     */
    private addStyles;
}
export default CustomVideoPlayer;
