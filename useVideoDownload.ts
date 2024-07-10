import * as FileSystem from 'expo-file-system';
import { useVideoPlayer, VideoPlayer } from 'expo-video';
import { useState, useEffect } from 'react';

type DownloadState = 'NOT_STARTED' | 'DOWNLOADING' | 'FINISHED';

// Returns null while video is downloading, video player when finished.
export function useVideoDownload(
  videoSource: string,
  setup?: (player: VideoPlayer) => void,
): {
  downloadState: DownloadState;
  progress: number;
  player: VideoPlayer | undefined;
} {
  const [downloadState, setDownloadState] =
    useState<DownloadState>('NOT_STARTED');
  const [progress, setProgress] = useState(0);
  const [localVideoURL, setLocalVideoURL] = useState<string | undefined>(
    undefined,
  );

  const callback: FileSystem.DownloadProgressCallback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress(progress);
  };

  async function downloadVideo(videoURL: string) {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        videoSource,
        FileSystem.cacheDirectory + 'small.mp4',
        {},
        callback,
      );

      setDownloadState('DOWNLOADING');
      console.log('Downloading ', videoSource);
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
      setLocalVideoURL(uri);
      setDownloadState('FINISHED');
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (downloadState === 'NOT_STARTED') {
      downloadVideo(videoSource);
    }
  }, [downloadState]);

  const player = useVideoPlayer(localVideoURL, setup);
  return {
    downloadState,
    progress,
    player,
  };
}
