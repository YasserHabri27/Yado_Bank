const FloatingShapes = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-gold/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            {}
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            {}
            <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
    );
};

export default FloatingShapes;
