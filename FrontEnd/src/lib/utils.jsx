import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, Brain, Star, FileText, Map, Settings } from "lucide-react";
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const navItems = [
    {
        label: 'Upload Notes',
        to: '/dashboard',
        icon: Camera,
        rotation: -12,
        offset: -15,
        hoverStyles: { bgColor: 'hsl(var(--snap-cyan))', textColor: 'hsl(var(--snap-bg-main))', glowColor: 'hsla(var(--snap-cyan), 0.4)' }
    },
    {
        label: 'My SnapNotes',
        to: '/dashboard/snapnotes',
        icon: Brain,
        rotation: 6,
        offset: 20,
        hoverStyles: { bgColor: 'hsl(var(--snap-mint))', textColor: 'hsl(var(--snap-bg-main))', glowColor: 'hsla(var(--snap-mint), 0.4)' }
    },
    {
        label: 'Flashcards',
        to: '/dashboard/flashcards',
        icon: Star,
        rotation: 14,
        offset: -25,
        hoverStyles: { bgColor: 'hsl(var(--snap-gold))', textColor: 'hsl(var(--snap-bg-main))', glowColor: 'hsla(var(--snap-gold), 0.4)' }
    },
    {
        label: 'Exam Practice',
        to: '/dashboard/exam',
        icon: FileText,
        rotation: -5,
        offset: 12,
        hoverStyles: { bgColor: 'hsl(var(--snap-coral))', textColor: 'hsl(var(--snap-bg-main))', glowColor: 'hsla(var(--snap-coral), 0.4)' }
    },
    {
        label: 'Mind Map',
        to: '/dashboard/mindmap',
        icon: Map,
        rotation: 18,
        offset: -10,
        hoverStyles: { bgColor: 'hsl(var(--snap-gradient-start))', textColor: '#ffffff', glowColor: 'hsla(var(--snap-gradient-start), 0.5)' }
    },
    {
        label: 'Settings',
        to: '/dashboard/settings',
        icon: Settings,
        rotation: -8,
        offset: 5,
        hoverStyles: { bgColor: 'hsl(var(--snap-text-muted))', textColor: '#ffffff', glowColor: 'hsla(var(--snap-text-muted), 0.3)' }
    },
];