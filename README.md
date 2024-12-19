
# React Video Player

React Video Player is a simple and user-friendly application for playing videos from local files or URLs. It supports drag-and-drop functionality, recent videos, and dark mode support.

## Features

- **Play Videos**: Load videos from your local computer or via a URL.
- **Drag-and-Drop Support**: Drag and drop video files directly into the app.
- **Recent Videos**: View and manage a list of recently played videos.
- **Theming**: Switch between light and dark modes.
- **Custom Video Controls**: Includes play/pause, mute/unmute, and fullscreen options.

## Installation

To get started with the React Video Player app, follow these steps:

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository

```bash
git clone https://github.com/idobe2/react-video-player.git
cd react-video-player
```

### Install Dependencies

```bash
npm install
```

### Run the App

Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Upload a Video**:
   - Drag and drop a video file into the app.
   - Or, use the file input option to select a video from your computer.
   - Alternatively, paste a video URL into the input field.

2. **Recent Videos**:
   - View a list of recently played videos.
   - Click on a video to play it again.
   - Use the delete icon to remove a video from the recent list.

3. **Controls**:
   - Play/Pause: Toggle video playback.
   - Mute/Unmute: Control the volume.
   - Fullscreen: View the video in fullscreen mode.

4. **Themes**:
   - Toggle between light and dark modes using the theme switcher icon.

## File Structure

```
react-video-player/
├── public/
│   ├── index.html
│   ├── icons/             # Icons for controls and theme switching
├── src/
│   ├── components/
│   │   ├── TopBar.js # Component to handle upload logic
│   │   ├── VideoPlayer.js # Main video player component
│   │   ├── RecentVideos.js # Component for recent videos list
│   │   ├── DragDropContainer.js # Drag-and-drop logic
│   ├── styles/
│   │   ├── TopBar.css
│   │   ├── VideoPlayer.css
│   │   ├── RecentVideos.css
│   │   ├── DragDropContainer.css
│   ├── App.js
│   ├── index.js
└── README.md
```

## Contributing

Contributions are welcome! If you encounter any bugs or have feature suggestions, feel free to create an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by the simplicity of modern video players.
- Designed using Figma for streamlined prototyping and interface development.
- Built with React, leveraging its robust UI component system.
