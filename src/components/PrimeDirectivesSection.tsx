import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Users, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PrimeDirectivesSection() {
    const navigate = useNavigate();

    // Conference Event (Left) - Using Neon Purple
    const conferenceEvent = {
        id: 'conference',
        title: 'CONFERENCE',
        type: 'ACADEMIC',
        description: 'National academic conference featuring cutting-edge research papers, keynote speakers, and collaborative discussions on emerging technologies.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1080',
        icon: Users,
        route: '/conference'
    };

    // Hackathon Event (Right) - Using Neon Cyan
    const hackathonEvent = {
        id: 'hackathon',
        title: 'HACKATHON',
        type: 'COMPETITION',
        description: 'Will Be Updated Soon',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1080',
        icon: Code,
        route: '/hackathon'
    };

    return (
        <div id="prime-directives" className="py-20 bg-[#050505] overflow-hidden relative min-h-screen flex flex-col justify-center">
            {/* Header */}
            <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl mb-4"
                    style={{ fontFamily: 'VT323, monospace' }}
                >
                    <span className="text-white">PRIME</span> <span className="text-[#BD00FF]">DIRECTIVES</span>
                </motion.h2>
                <div className="h-1 w-24 bg-[#BD00FF] mx-auto opacity-50" />
            </div>

            {/* Cards Container */}
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-8 relative z-10">

                {/* LEFT CARD - CONFERENCE */}
                <FloatingCard event={conferenceEvent} color="#BD00FF" delay={0} navigate={navigate} />

                {/* RIGHT CARD - HACKATHON */}
                <FloatingCard event={hackathonEvent} color="#00D1FF" delay={0.5} navigate={navigate} />

            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,209,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,209,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />
        </div>
    );
}


function FloatingCard({ event, color, delay, navigate }: { event: any, color: string, delay: number, navigate: any }) {
    const Icon = event.icon;
    const [text, setText] = useState("INITIATE_PROTOCOL");
    const [isHovering, setIsHovering] = useState(false);

    // Binary Decode Effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovering) {
            let iteration = 0;
            const originalText = "INITIATE_PROTOCOL";
            const duration = 700; // 0.7 seconds
            const totalSteps = originalText.length * 2;
            const intervalTime = duration / totalSteps;

            interval = setInterval(() => {
                setText(
                    originalText
                        .split("")
                        .map((_char, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return Math.random() > 0.5 ? "1" : "0";
                        })
                        .join("")
                );

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 2;
            }, intervalTime);
        } else {
            setText("INITIATE_PROTOCOL");
        }

        return () => clearInterval(interval);
    }, [isHovering]);

    const handleClick = () => {
        navigate(event.route);
        window.scrollTo(0, 0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            // Levitation Animation - Continuous floating
            animate={{
                y: [0, -15, 0],
            }}
            transition={{
                opacity: { duration: 0.6, delay: delay * 0.3 },
                scale: { duration: 0.6, delay: delay * 0.3 },
                y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                }
            }}
            className="w-full md:w-[48%] lg:w-[650px] relative group"
            style={{ transform: 'scale(1.3)' }}
        >
            {/* Breathing Glow Effect */}
            <motion.div
                className="absolute -inset-4 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                }}
                style={{
                    background: `radial-gradient(circle, ${color}40, transparent 70%)`,
                }}
            />

            {/* Card Content */}
            <div className="relative h-[550px] rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] hover:border-[color:var(--highlight)] transition-all duration-300"
                style={{ '--highlight': color } as any}>

                {/* Image Background */}
                <div className="absolute inset-0">
                    <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                </div>

                {/* Animated Glow Border */}
                <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={{
                        boxShadow: [
                            `0 0 20px ${color}40`,
                            `0 0 40px ${color}80`,
                            `0 0 20px ${color}40`,
                        ],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: delay,
                    }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-4 flex items-center gap-3">
                        <Icon className="w-6 h-6" style={{ color: color }} />
                        <span className="text-xs font-mono px-3 py-1 border rounded-full" style={{ color: color, borderColor: color }}>
                            FLAGSHIP EVENT // {event.type}
                        </span>
                    </div>

                    <h3 className="text-5xl md:text-6xl font-bold mb-3 text-white" style={{ fontFamily: 'VT323, monospace' }}>
                        {event.title}
                    </h3>

                    <p className="text-gray-400 mb-6 font-mono text-sm leading-relaxed">
                        {event.description}
                    </p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleClick}
                            className="px-8 py-4 bg-black/40 border border-white/10 hover:border-[color:var(--btn-color)] text-white rounded-xl font-mono font-bold text-lg tracking-wider flex items-center gap-3 transition-all duration-300 group/btn relative overflow-hidden"
                            style={{
                                '--btn-color': color,
                                boxShadow: isHovering ? `0 0 20px -5px ${color}` : 'none'
                            } as any}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <Terminal className="w-5 h-5 transition-colors duration-300" style={{ color: isHovering ? color : 'white' }} />
                            <span className="relative z-10" style={{
                                textShadow: isHovering ? `0 0 10px ${color}` : 'none'
                            }}>{text}</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" style={{ color: isHovering ? color : 'white' }} />

                            {/* Subtle background glow on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"
                                style={{ background: color }}
                            />
                        </button>
                    </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 opacity-30" style={{ borderColor: color }} />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 opacity-30" style={{ borderColor: color }} />
            </div>
        </motion.div>
    );
}
