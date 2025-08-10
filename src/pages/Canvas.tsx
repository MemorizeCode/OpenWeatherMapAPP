import { useEffect, useRef, useState } from "react";
import '../Canvas.css'

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 80;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const clearCanvas = () => {
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, canvas.width, canvas.height);
        };

        clearCanvas();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);


    const getCanvasCoordinates = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        setIsDrawing(true);
        
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const { x, y } = getCanvasCoordinates(clientX, clientY);
        context.beginPath();
        context.moveTo(x, y);
    };

    const endDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.beginPath();
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, context: CanvasRenderingContext2D) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const { x, y } = getCanvasCoordinates(clientX, clientY);

        context.lineWidth = brushSize;
        context.lineCap = 'round';

        if (tool === 'brush') {
            context.strokeStyle = color;
            context.globalCompositeOperation = 'source-over';
        } else {
            context.strokeStyle = '#ffffff';
            context.globalCompositeOperation = 'destination-out';
        }

        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="canvas-app">
            <div className="canvas-tools">
                <button
                    className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
                    onClick={() => setTool('brush')}
                >
                    <i className="icon-brush"></i> Кисть
                </button>
                <button
                    className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
                    onClick={() => setTool('eraser')}
                >
                    <i className="icon-eraser"></i> Ластик
                </button>

                <div className="color-picker">
                    <label htmlFor="brush-color">
                        <i className="icon-palette"></i>
                    </label>
                    <input
                        id="brush-color"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>

                <div className="brush-size">
                    <label>
                        <i className="icon-size"></i>
                        <span>{brushSize}px</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    />
                </div>

                <button
                    className="clear-btn"
                    onClick={clearCanvas}
                >
                    <i className="icon-clear"></i> Очистить
                </button>
            </div>

            <div className="canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={(e) => {
                        const canvas = canvasRef.current;
                        if (!canvas) return;
                        const context = canvas.getContext('2d');
                        if (context) draw(e, context);
                    }}
                    onMouseLeave={endDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={(e) => {
                        const canvas = canvasRef.current;
                        if (!canvas) return;
                        const context = canvas.getContext('2d');
                        if (context) draw(e, context);
                    }}
                    onTouchEnd={endDrawing}
                />
            </div>
        </div>
    );
};

export default Canvas;