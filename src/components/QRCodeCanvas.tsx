import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeCanvasProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeCanvas: React.FC<QRCodeCanvasProps> = ({ value, size = 180, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF',
        },
      }).catch((err) => {
        console.error('QR code generation error:', err);
      });
    }
  }, [value, size]);

  return (
    <div className={`p-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block ${className}`}>
      <canvas ref={canvasRef} className="block rounded-lg" />
    </div>
  );
};
