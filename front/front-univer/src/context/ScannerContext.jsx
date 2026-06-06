import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { X, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

const ScannerContext = createContext();

export function ScannerProvider({ children }) {
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const scannerRef = useRef(null);

    const openScanner = () => setIsScannerOpen(true);
    const closeScanner = () => {
        if (scannerRef.current) {
            scannerRef.current.stop().catch(err => console.error("Failed to stop scanner", err));
        }
        setIsScannerOpen(false);
    };

    const handleScanSuccess = (decodedText) => {
        console.log("Scan success:", decodedText);
        closeScanner();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const simulateScan = () => {
        handleScanSuccess("Simulated QR Code Data");
    };

    useEffect(() => {
        if (isScannerOpen) {
            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                handleScanSuccess,
                (errorMessage) => {
                    // Les erreurs de scan sont fréquentes (pas de code trouvé), on les ignore généralement
                }
            ).catch((err) => {
                console.error("Impossible de démarrer le scanner", err);
            });

            return () => {
                if (html5QrCode.isScanning) {
                    html5QrCode.stop().catch(err => console.error("Error stopping scanner in cleanup", err));
                }
            };
        }
    }, [isScannerOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeScanner();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <ScannerContext.Provider value={{ isScannerOpen, openScanner, closeScanner, simulateScan }}>
            {children}
            {isScannerOpen && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button onClick={closeScanner} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors z-[60]">
                            <X size={24} />
                        </button>
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">QR Check-in</h3>
                            <p className="text-gray-500 text-sm">Scan the student's digital ID or ticket to mark attendance.</p>
                        </div>
                        <div className="relative w-full aspect-square bg-gray-900 rounded-xl overflow-hidden">
                            {/* Le conteneur du scanner */}
                            <div id="reader" className="w-full h-full"></div>

                            {/* Overlay UI (Guide de scan) */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="w-[250px] h-[250px] border-2 border-blue-500/50 rounded-lg relative">
                                    <style>{`
                                        @keyframes scanLine {
                                            0% { top: 0%; opacity: 0; }
                                            10% { opacity: 1; }
                                            90% { opacity: 1; }
                                            100% { top: 100%; opacity: 0; }
                                        }
                                        .animate-scan {
                                            animation: scanLine 2.5s infinite linear;
                                        }
                                    `}</style>
                                    <div className="absolute w-full h-0.5 bg-blue-500 shadow-[0_0_15px_3px_rgba(59,130,246,0.5)] animate-scan"></div>
                                </div>
                                <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">
                                    Center code in the frame
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <Lightbulb className="text-blue-600 flex-shrink-0" size={20} />
                                <p className="text-xs text-blue-900 font-medium leading-relaxed">
                                    Hold the device steady. Ensure the QR code is well-lit for faster recognition.
                                </p>
                            </div>
                            <button
                                onClick={simulateScan}
                                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                            >
                                Simulate Successful Scan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 transition-all duration-300 z-[60] ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
                <CheckCircle2 className="text-green-400" size={24} />
                <div>
                    <p className="font-bold text-sm">Check-in Successful!</p>
                    <p className="text-xs text-gray-400 mt-0.5">Student has been marked as attended.</p>
                </div>
            </div>
        </ScannerContext.Provider>
    );
}

export function useScanner() {
    return useContext(ScannerContext);
}
