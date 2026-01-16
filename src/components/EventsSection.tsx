import { motion, useInView } from 'motion/react';
import logicRushImg from '../assets/logic_rush.png';
import exposureImg from '../assets/exposure.png';
import posterDesignImg from '../assets/poster_design.png';
import promptPixelImg from '../assets/prompt_pixel.png';
import podcastMonologueImg from '../assets/podcast_monologue.png';
import techieXoImg from '../assets/techie_xo.png';
import techTamashaImg from '../assets/tech_tamasha.png';
import accuracyArenaImg from '../assets/accuracy_arena.png';
import codeEuphoriaImg from '../assets/code_euphoria.png';
import lifeOfWordsImg from '../assets/life_of_words.png';
import protoPitchImg from '../assets/protopitch.png';
import { useState, useRef } from 'react';
import { Sparkles, Code, Users, Cpu, Award, Camera, Palette, Feather } from 'lucide-react';
import './EventsSection.css'; // Import the Custom CSS

type EventCategory = 'All' | 'Technical' | 'Workshops' | 'Online';
type GridSize = 'standard' | 'wide' | 'tall' | 'big';

interface Event {
  id: number | string;
  title: string;
  category: EventCategory;
  date: string;
  image: string;
  description: string;
  aiRecommended?: boolean;
  icon: typeof Code;
  size?: GridSize; // New property for Bento Grid
}

interface EventCardProps {
  event: Event;
  index: number;
  onEventSelect: (eventId: number) => void;
  onConferenceSelect: () => void;
}

function EventCard({ event, index, onEventSelect, onConferenceSelect }: EventCardProps) {
  const ref = useRef(null);

  // Map size prop to CSS class
  const sizeClass = event.size ? `span-${event.size}` : '';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`event-card ${sizeClass}`}
      onClick={() => {
        if (event.id === 'conference') {
          onConferenceSelect();
        } else {
          onEventSelect(event.id as number);
        }
      }}
    >
      {/* Image */}
      <img
        src={event.image}
        alt={event.title}
        className="card-img"
        loading="lazy"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/95 translate-y-full hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col items-center justify-center p-6 text-center z-20 group-hover:translate-y-0"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <event.icon className="w-10 h-10 text-[#D2FF00] mb-3" />
        <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'VT323, monospace' }}>{event.title}</h3>
        <p className="text-gray-400 text-sm">{event.description}</p>
      </div>

      {/* The Magic Cutout (Bottom Right) */}
      <div className="corner-cutout z-30">
        <span className="event-title">{event.title}</span>
        <span className="event-status">{event.category}</span>
      </div>

    </motion.div>
  );
}

interface EventsSectionProps {
  onEventSelect: (eventId: number) => void;
  onConferenceSelect: () => void;
}

export function EventsSection({ onEventSelect, onConferenceSelect }: EventsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<EventCategory>('All');

  const events: Event[] = [
    {
      id: 7,
      title: 'Prompt Pixel',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: promptPixelImg,
      description: 'AI visuals and creative prompting challenge',
      icon: Sparkles,
    },
    {
      id: 11,
      title: 'Logic Rush',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: logicRushImg,
      description: 'Fast-paced aptitude and logic battle',
      icon: Cpu,
    },
    {
      id: 9,
      title: 'Techie XO',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: techieXoImg,
      description: 'Strategic XO game powered by tech trivia',
      icon: Code,
    },
    {
      id: 10,
      title: 'Tech Tamasha',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: techTamashaImg,
      description: 'Multi-round tech ecosystem challenge',
      icon: Users,
    },
    {
      id: 8,
      title: 'Podcast Monologue',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: podcastMonologueImg,
      description: 'Spontaneous speaking on random tech topics',
      icon: Users,
    },
    {
      id: 12,
      title: 'Accuracy Arena',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: accuracyArenaImg,
      description: 'Design and optimize ML predictive models',
      icon: Award,
    },
    {
      id: 13,
      title: 'Code Euphoria',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: codeEuphoriaImg,
      description: 'Progressively complex coding challenges',
      icon: Code,
    },
    {
      id: 14,
      title: 'Life of Words',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: lifeOfWordsImg,
      description: 'Craft and share original poems',
      icon: Feather,
    },
    {
      id: 15,
      title: 'Exposure',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: exposureImg,
      description: 'Photography contest on a given theme',
      icon: Camera,
    },
    {
      id: 16,
      title: 'Poster Design',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: posterDesignImg,
      description: 'Creative poster design competition',
      icon: Palette,
    },
    {
      id: 17,
      title: 'ProtoPitch',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: protoPitchImg,
      description: 'UI/UX design and prototyping challenge',
      icon: Palette,
    },
  ];

  const filteredEvents = activeFilter === 'All'
    ? events
    : events.filter(event => event.category === activeFilter);

  const filters: EventCategory[] = ['All', 'Technical', 'Workshops', 'Online'];

  return (
    <div className="py-20 relative overflow-hidden bg-[#050505]">
      {/* Background - Kept minimal to ensure cutout trick works */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Subtle Background Elements - Reduced opacity to prevent cutout issues */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D500F9]/5 rounded-full blur-3xl opacity-50" />

      {/* Side Banner Watermark - Left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
        style={{
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
        }}
      >
        <span
          className="text-9xl opacity-15"
          style={{
            fontFamily: 'VT323, monospace',
            WebkitTextStroke: '2px rgba(213, 0, 249, 0.3)',
            color: 'transparent',
          }}
        >
          MAGNUS 2026
        </span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl mb-4 text-white" style={{ fontFamily: 'VT323, monospace' }}>
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] to-[#7000FF]">Events</span>
          </h2>
          <p className="text-xl text-[#94A3B8]">Deploy your skills in these cutting-edge challenges</p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl transition-all duration-300 ${activeFilter === filter
                ? 'bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] text-black shadow-lg'
                : 'glass border border-[#00D9FF]/20 text-white hover:border-[#00D9FF]/50'
                }`}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                ...(activeFilter === filter && { boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' })
              }}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* BENTO GRID */}
        <div className="magnus-grid">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onEventSelect={onEventSelect}
              onConferenceSelect={onConferenceSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}