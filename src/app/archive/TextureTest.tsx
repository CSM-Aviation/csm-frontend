import React, { useRef, useEffect } from 'react';

const WoodGrainTexture: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create base gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#2a2a2a');
    gradient.addColorStop(1, '#3a3a3a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw wood grain lines
    for (let y = 0; y < height; y += 2) {
      const lineWidth = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      
      for (let x = 0; x < width; x += 20) {
        const yOffset = Math.random() * 4 - 2;
        ctx.lineTo(x, y + yOffset);
      }

      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    // Add some darker lines for contrast
    for (let i = 0; i < 50; i++) {
      const y = Math.random() * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = Math.random() * 2 + 0.5;
      ctx.stroke();
    }

  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={400} 
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default WoodGrainTexture;