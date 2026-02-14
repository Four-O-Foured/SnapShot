import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';

const MotionLink = motion.create(Link);

export default function BubbleMenu({
    logo,
    onMenuClick,
    className,
    style,
    menuAriaLabel = 'Toggle menu',
    menuBg = 'hsl(var(--snap-bg-card))',
    menuContentColor = 'hsl(var(--snap-text-primary))',
    useFixedPosition = false,
    items,
    staggerDelay = 0.12
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = items?.length ? items : null;
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerClassName = [
        'bubble-menu',
        useFixedPosition ? 'fixed' : 'absolute',
        'left-0 right-0 top-6 md:top-8',
        'flex items-center justify-between',
        'gap-4 px-6 md:px-12',
        'pointer-events-none',
        'z-[1001]',
        className
    ]
        .filter(Boolean)
        .join(' ');

    const handleToggle = () => {
        const nextState = !isMenuOpen;
        setIsMenuOpen(nextState);
        onMenuClick?.(nextState);
    };

    const handleClose = () => {
        setIsMenuOpen(false);
        onMenuClick?.(false);
    };

    // Animation variants
    const overlayVariants = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren"
            }
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.2,
                when: "beforeChildren",
                staggerChildren: staggerDelay
            }
        }
    };

    const bubbleVariants = {
        hidden: {
            scale: 0,
            opacity: 0,
            rotate: -25,
            y: 20,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        },
        visible: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 1
            }
        }
    };

    const labelVariants = {
        hidden: {
            y: 10,
            opacity: 0,
            transition: { duration: 0.2 }
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <>
            <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }
        
        /* Glass Enhancement */
        .glass-pill {
          background: linear-gradient(
            135deg,
            hsla(var(--snap-bg-card), 0.75),
            hsla(var(--snap-bg-panel), 0.45)
          ) !important;
          border: 1px solid color-mix(in srgb, var(--color-border) 40%, transparent) !important;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 4px 20px rgba(0,0,0,0.3),
            inset 0 1px 1px rgba(255,255,255,0.05);
        }

        @media (min-width: 1024px) {
          .pill-link {
            transform: rotate(var(--item-rot)) translateY(var(--item-offset)) !important;
          }
          .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.08) translateY(calc(var(--item-offset) - 8px)) !important;
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
            box-shadow: 0 20px 40px -10px var(--glow-color) !important;
            border-color: var(--hover-bg) !important;
          }
        }

        @media (max-width: 1023px) {
          .bubble-menu-items {
            padding: 80px 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pill-link:hover {
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
            box-shadow: 0 10px 20px -5px var(--glow-color) !important;
          }
        }
      `}</style>

            <nav className={containerClassName} style={style} aria-label="Main navigation">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={[
                        'bubble logo-bubble',
                        'inline-flex items-center justify-center',
                        'rounded-full',
                        'glass-card-glow',
                        'pointer-events-auto',
                        'h-11 md:h-14',
                        'px-4 md:px-8',
                        'gap-2',
                        'cursor-default'
                    ].join(' ')}
                    aria-label="Logo"
                    style={{
                        background: menuBg,
                        border: '1px solid color-mix(in srgb, var(--color-border) 60%, transparent)'
                    }}
                >
                    <span className="logo-content flex items-center justify-center w-[100px] md:w-[120px] h-full">
                        {typeof logo === 'string' ? (
                            <MotionLink
                                to="/"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center"
                            >
                                <img src={logo} alt="Logo" className="max-h-[50%] md:max-h-[55%] max-w-full object-contain" />
                            </MotionLink>
                        ) : (
                            logo
                        )}
                    </span>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: isMenuOpen ? 0 : 5 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className={[
                        'bubble toggle-bubble menu-btn',
                        'inline-flex flex-col items-center justify-center',
                        'rounded-full',
                        'glass-card-glow',
                        'pointer-events-auto',
                        'w-11 h-11 md:w-14 md:h-14',
                        'border-0 cursor-pointer p-0 z-50'
                    ].join(' ')}
                    onClick={handleToggle}
                    aria-label={menuAriaLabel}
                    aria-pressed={isMenuOpen}
                    style={{
                        background: menuBg,
                        border: '1px solid color-mix(in srgb, var(--color-border) 60%, transparent)'
                    }}
                >
                    <span
                        className="menu-line block mx-auto rounded-full"
                        style={{
                            width: isDesktop ? 24 : 20,
                            height: 2,
                            background: menuContentColor,
                            transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'
                        }}
                    />
                    <span
                        className="menu-line block mx-auto rounded-full"
                        style={{
                            marginTop: '6px',
                            width: isMenuOpen ? (isDesktop ? 24 : 20) : (isDesktop ? 16 : 12),
                            height: 2,
                            marginLeft: isMenuOpen ? 'auto' : 'calc(50% - 4px)',
                            background: menuContentColor,
                            transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
                        }}
                    />
                </motion.button>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="bubble-menu-items fixed inset-0 flex items-center justify-center z-1000 pointer-events-none overflow-y-auto"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                    >
                        <motion.div
                            className="absolute inset-0 bg-background/90 backdrop-blur-3xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            style={{ pointerEvents: 'auto' }}
                        />

                        {menuItems && (
                            <motion.ul
                                className="pill-list relative z-10 list-none m-0 px-4 md:px-6 w-full max-w-[1400px] mx-auto flex flex-wrap gap-y-4 md:gap-y-16 pointer-events-auto justify-center"
                                role="menu"
                            >
                                {menuItems.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="pill-col flex justify-center items-stretch flex-[0_0_50%] md:flex-[0_0_calc(100%/3)] px-2 md:px-4"
                                    >
                                        <MotionLink
                                            role="menuitem"
                                            to={item.to || item.href}
                                            aria-label={item.ariaLabel || item.label}
                                            variants={bubbleVariants}
                                            onClick={handleClose}
                                            className="pill-link glass-pill w-full rounded-full no-underline text-inherit flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 relative transition-all duration-300 ease-out box-border whitespace-nowrap overflow-hidden"
                                            style={{
                                                '--item-rot': `${isDesktop ? (item.rotation ?? 0) : 0}deg`,
                                                '--item-offset': `${isDesktop ? (item.offset ?? 0) : 0}px`,
                                                '--hover-bg': item.hoverStyles?.bgColor || 'hsl(var(--primary))',
                                                '--hover-color': item.hoverStyles?.textColor || '#ffffff',
                                                '--glow-color': item.hoverStyles?.glowColor || 'hsla(var(--primary), 0.3)',
                                                background: 'var(--pill-bg)',
                                                color: menuContentColor,
                                                padding: isDesktop ? 'clamp(2rem, 4vw, 6rem) 0' : '1.25rem 0.5rem',
                                                minHeight: isDesktop ? '150px' : '64px'
                                            }}
                                        >
                                            {item.icon && (
                                                <motion.span
                                                    className="flex items-center justify-center opacity-90"
                                                    variants={labelVariants}
                                                >
                                                    <item.icon size={isDesktop ? 44 : 22} strokeWidth={1.5} />
                                                </motion.span>
                                            )}
                                            <motion.span
                                                className="pill-label inline-block font-sans font-bold tracking-tight uppercase"
                                                style={{
                                                    fontSize: isDesktop ? 'clamp(1rem, 2.4vw, 2.4rem)' : '0.75rem',
                                                    marginTop: !isDesktop && item.icon ? '2px' : '0'
                                                }}
                                                variants={labelVariants}
                                            >
                                                {item.label}
                                            </motion.span>
                                        </MotionLink>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
