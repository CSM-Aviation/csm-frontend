import React, { useEffect, useRef, useState } from "react";
import JetInsightComponent from './JetInsight/JetInsightComponent3';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressSpanRef = useRef<HTMLSpanElement>(null);
  const progressDivRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const span = progressSpanRef.current;
    const video = videoRef.current;

    if (span && video) {
      // Animation to move the indicator
      let anim = gsap.to(span, {
        onUpdate: () => {
          const progress = Math.ceil((video.currentTime / video.duration) * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // Set the width of the progress bar container
            gsap.to(progressDivRef.current, {
              width:
                window.innerWidth < 760
                  ? "80px"
                  : window.innerWidth < 1200
                  ? "120px"
                  : "160px",
            });

            // Update progress bar width
            gsap.to(span, {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(progressDivRef.current, {
              width: "12px",
            });
            gsap.to(span, {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      const animUpdate = () => {
        if (video) {
          anim.progress(video.currentTime / video.duration);
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }

      return () => {
        gsap.ticker.remove(animUpdate);
      };
    }
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const enableAudio = async () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await audioContext.resume();

      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      setShowPermissionDialog(false);
    } catch (error) {
      console.log('Audio permission denied or error occurred');
    }
  };

  return (
    <div className="w-full relative">
      {/* Video Container */}
      <div className="w-full relative bg-black">
        <video
          ref={videoRef}
          className="w-full h-[100vh] object-cover"
          playsInline
          muted={isMuted}
          autoPlay
          loop
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {showPermissionDialog && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/80 text-white p-4 rounded-lg shadow-lg">
            <p className="mb-3">Would you like to enable sound for this video?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={enableAudio}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Enable Sound
              </button>
              <button
                onClick={() => setShowPermissionDialog(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Keep Muted
              </button>
            </div>
          </div>
        )}

        {/* JetInsight Component */}
        <div className="absolute top-1/2  max-md:top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <JetInsightComponent />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8  max-md:top-1/3 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-20">
        {/* Progress Bar */}
        <div 
          ref={progressDivRef}
          className="h-3 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm"
          style={{ width: "160px" }}
        >
          <span
            ref={progressSpanRef}
            className="block h-full bg-white rounded-full transition-all duration-100"
            style={{ width: "0%" }}
          />
        </div>

        {/* Controls Container */}
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button 
            onClick={handleTogglePlay}
            className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/50 transition-colors"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Mute/Unmute Button */}
          <button 
            onClick={handleToggleMute}
            className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/60 transition-colors"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;