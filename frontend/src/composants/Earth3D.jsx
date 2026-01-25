import createGlobe from 'cobe';
import { useEffect, useRef, useState } from 'react';
// Removing spring for simplicity and weight. Using standard requestAnimationFrame loop from cobe examples.

const Earth3D = () => {
    const canvasRef = useRef();
    // Locations: [lat, lon, size, name, description]
    const locations = [
        { location: [40.7128, -74.0060], size: 0.1, name: "New York", desc: "Global Headquarters. The heart of Yado Bank." },
        { location: [51.5074, -0.1278], size: 0.1, name: "London", desc: "European Financial Hub. Serving our elite clients." },
        { location: [25.2048, 55.2708], size: 0.1, name: "Dubai", desc: "Middle East Innovation Center. Future banking." },
        { location: [35.6762, 139.6503], size: 0.1, name: "Tokyo", desc: "Asia Pacific Operations. Technology & Tradition." },
        { location: [43.7384, 7.4246], size: 0.1, name: "Monaco", desc: "Private Banking & Wealth Management. Exclusive services." },
        { location: [33.5731, -7.5898], size: 0.1, name: "Casablanca", desc: "North Africa Regional Hub. Growing with you." },
    ];

    // State for UI only
    const [activeLocationName, setActiveLocationName] = useState(locations[0].name);

    // Refs for animation loop (avoid checking dependency changes)
    const activeLocationRef = useRef(locations[0]);
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);
    const phiRef = useRef(0);

    const handleLocationClick = (loc) => {
        setActiveLocationName(loc.name);
        activeLocationRef.current = loc;
    };

    useEffect(() => {
        let width = 0;
        let globeInstance = null;

        const onResize = (entries) => {
            for (let entry of entries) {
                const newWidth = entry.contentRect.width;
                if (newWidth > 0 && newWidth !== width) {
                    width = newWidth;
                    if (globeInstance) {
                        globeInstance.destroy();
                    }
                    createGlobeInstance(width);
                }
            }
        };

        const resizeObserver = new ResizeObserver(onResize);
        if (canvasRef.current) {
            resizeObserver.observe(canvasRef.current);
        }

        const createGlobeInstance = (w) => {
            // Cobe coordinate system: [lat, lon]
            // We want arcs from the "Active" location to others to visualize connections
            // But if user requested arrows/lines, arcs are the best "3D Globe" equivalent.

            globeInstance = createGlobe(canvasRef.current, {
                devicePixelRatio: 2,
                width: w * 2,
                height: w * 2,
                phi: 0,
                theta: 0.3,
                dark: 1,
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: 6,
                baseColor: [0, 0.12, 0.25],
                markerColor: [0.83, 0.68, 0.21],
                glowColor: [0.83, 0.68, 0.21],
                markers: locations.map(loc => ({ location: loc.location, size: loc.size })),
                onRender: (state) => {
                    // Interaction handling
                    if (pointerInteracting.current === null) {
                        // Auto rotate indefinitely 360 degrees
                        phiRef.current += 0.005;
                    }

                    // Smooth transition to focus location if active (and not dragging)
                    // BUT: User said "it needs to rotate 360". 
                    // If we force focus, it stops rotating 360.
                    // Solution: Only focus when recently clicked, then maybe resume?
                    // Actually, let's prioritize Manual Drag + Auto Spin. 
                    // The "Focus" logic was locking the view. I will relax it.
                    // Instead of locking phi to target, we just let it spin, 
                    // unless user is interacting.

                    // If the user selects a location, maybe we just highlight it 
                    // but don't force the camera to lock on it, 
                    // or we lock it for a moment then release?
                    // Let's remove the "Soft Follow" lock to allow full 360 spin as requested.

                    // Apply pointer drag
                    if (pointerInteracting.current !== null) {
                        const delta = pointerInteractionMovement.current;
                        pointerInteractionMovement.current = 0;
                        phiRef.current += delta * 0.005;
                    }

                    state.phi = phiRef.current;
                    state.width = w * 2;
                    state.height = w * 2;
                }
            });

            // Re-attach listeners to ensure they use the current closure if needed, 
            // though they rely on refs so it's fine.
        };

        // Pointer events
        const onPointerDown = (e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        };

        const onPointerUp = () => {
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        };

        const onPointerOut = () => {
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        };

        const onMouseMove = (e) => {
            if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                pointerInteracting.current = e.clientX;
            }
        };

        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.cursor = 'grab';
            canvas.addEventListener('pointerdown', onPointerDown);
            canvas.addEventListener('pointerup', onPointerUp);
            canvas.addEventListener('pointerout', onPointerOut);
            canvas.addEventListener('mousemove', onMouseMove);
        }

        return () => {
            if (globeInstance) globeInstance.destroy();
            resizeObserver.disconnect();
            if (canvas) {
                canvas.removeEventListener('pointerdown', onPointerDown);
                canvas.removeEventListener('pointerup', onPointerUp);
                canvas.removeEventListener('pointerout', onPointerOut);
                canvas.removeEventListener('mousemove', onMouseMove);
            }
        };
    }, []); // Empty dependency array = mount once, stable!

    // Derived active location for UI
    const activeDesc = locations.find(l => l.name === activeLocationName)?.desc;

    return (
        <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl mx-auto p-6">
            <div className="w-full md:w-1/2 aspect-square relative z-10">
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%', aspectRatio: 1 }}
                    className="opacity-100 transition-opacity duration-500"
                />
            </div>

            <div className="w-full md:w-1/2 space-y-6">
                <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white mb-2">Global Reach</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {locations.map((loc) => (
                            <button
                                key={loc.name}
                                onClick={() => handleLocationClick(loc)}
                                className={`p-4 rounded-xl text-left transition-all duration-300 border ${activeLocationName === loc.name ? 'bg-brand-gold text-brand-900 border-brand-gold shadow-lg shadow-brand-gold/20' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}
                            >
                                <p className="font-bold">{loc.name}</p>
                                {activeLocationName === loc.name && (
                                    <p className="text-xs mt-1 opacity-90 animate-fade-in">{activeDesc}</p>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Earth3D;
