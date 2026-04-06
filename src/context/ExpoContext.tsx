'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ExpoSettings {
    isVisible: boolean;
    title: string;
    date: string;
    location: string;
    booth: string;
    description: string;
    imageURL: string;
}

const DEFAULT_SETTINGS: ExpoSettings = {
    isVisible: true,
    title: 'GITEX Africa 2026',
    date: '7 - 8 - 9 APRIL',
    location: 'MARRAKESH, MOROCCO',
    booth: '20D-113',
    description: 'Connecting the next generation of industrial operations with our predictive AI ecosystem. Join our technical engineers for a deep-dive walkthrough.',
    imageURL: '/images/expo/certificate.png'
};

interface ExpoContextType {
    settings: ExpoSettings;
    updateSettings: (newSettings: Partial<ExpoSettings>) => void;
    resetSettings: () => void;
}

const ExpoContext = createContext<ExpoContextType | undefined>(undefined);

export function ExpoProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<ExpoSettings>(DEFAULT_SETTINGS);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('calypsion_expo_settings');
        if (saved) {
            try {
                setSettings(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse expo settings', e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('calypsion_expo_settings', JSON.stringify(settings));
        }
    }, [settings, isInitialized]);

    const updateSettings = (newSettings: Partial<ExpoSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <ExpoContext.Provider value={{ settings, updateSettings, resetSettings }}>
            {children}
        </ExpoContext.Provider>
    );
}

export function useExpo() {
    const context = useContext(ExpoContext);
    if (context === undefined) {
        throw new Error('useExpo must be used within an ExpoProvider');
    }
    return context;
}
