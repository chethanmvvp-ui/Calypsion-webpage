'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentHash, setCurrentHash] = useState('');
    const [isMobileView, setIsMobileView] = useState(false);
    const pathname = usePathname();
    const isPlatform = pathname.startsWith('/platform');

    // Sync hash state on load and hashChange
    useEffect(() => {
        const handleHashChange = () => setCurrentHash(window.location.hash);
        handleHashChange(); // Initial check
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        const updateViewport = () => setIsMobileView(window.innerWidth <= 768);
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const homeLinks = [
        { name: 'Solutions', href: '#solutions' },
        { name: 'Service', href: '#platform' },
        { name: 'Products', href: '#products' },
        { name: 'R&D', href: '#rd' },
        { name: 'About', href: '#about' },
    ];

    const platformLinks = [
        { name: 'Architecture', href: '#architecture' },
        { name: 'Modules', href: '#solutions' },
        { name: 'Sectors', href: '#industries' },
        { name: 'Evidence', href: '#company' },
        { name: 'Transformation', href: '#contact' },
    ];

    const navLinks = isPlatform ? platformLinks : homeLinks;
    const contactButtonLabel = isPlatform ? 'SYSTEM_SYNC' : 'INITIATE_HANDSHAKE';

    const handleContactClick = () => {
        const target = document.querySelector('#contact');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.mobileLogoBadge}>
                        <Image
                            src="/images/Logo2.png"
                            alt="Calypsion Logo"
                            width={16}
                            height={16}
                            className={styles.mobileLogoIcon}
                        />
                    </span>
                    <span className={styles.logoText}>
                        CALYPSION <span className={styles.logoAccent}>{isPlatform ? 'PLATFORM' : 'INNOVATION'}</span>
                    </span>
                </Link>

                <div className={styles.headerRight}>
                    <div className={styles.headerAction}>
                        <button
                            className={styles.contactBtn}
                            onClick={handleContactClick}
                        >
                            {isPlatform ? 'SYSTEM_SYNC' : 'INITIATE_HANDSHAKE'}
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <button 
                        className={styles.menuToggle} 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Hamburger Overlay Menu */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}>
                <nav className={styles.mobileNav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`${styles.mobileNavLink} ${currentHash === link.href ? styles.navActive : ''}`}
                            onClick={(e: React.MouseEvent) => {
                                setIsMenuOpen(false);
                                setCurrentHash(link.href);
                                if (link.href.startsWith('#')) {
                                    e.preventDefault();
                                    const target = document.querySelector(link.href);
                                    if (target) {
                                        target.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }
                            }}
                        >
                            <span className={styles.mobileLinkNumber}>0{navLinks.indexOf(link) + 1}</span>
                            <span className={styles.mobileLinkText}>{link.name}</span>
                            <ChevronRight className={styles.mobileLinkIcon} size={18} />
                        </Link>
                    ))}

                    {isMobileView && (
                        <button
                            className={`${styles.contactBtn} ${styles.mobileMenuContactBtn}`}
                            onClick={() => {
                                setIsMenuOpen(false);
                                handleContactClick();
                            }}
                            type="button"
                        >
                            {contactButtonLabel}
                            <ChevronRight size={14} />
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}
