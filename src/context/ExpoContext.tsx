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
    imageURL: '/images/expo/ExpoBanner.jpeg'
};

interface ExpoContextType {
    settings: ExpoSettings;
    updateSettings: (newSettings: Partial<ExpoSettings>) => void;
    resetSettings: () => void;
}

const ExpoContext = createContext<ExpoContextType | undefined>(undefined);

export function ExpoProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<ExpoSettings>(DEFAULT_SETTINGS);

    // Initial load from server-side API
    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await fetch('/api/expo-settings');
                if (response.ok) {
                    const data = await response.json();
                    setSettings(data);
                } else {
                    // Fallback to localStorage if API is not available
                    const saved = localStorage.getItem('calypsion_expo_settings');
                    if (saved) setSettings(JSON.parse(saved));
                }
            } catch (e) {
                console.error('Failed to fetch expo settings from API', e);
                const saved = localStorage.getItem('calypsion_expo_settings');
                if (saved) {
                    try {
                        setSettings(JSON.parse(saved));
                    } catch (_err) {}
                }
            }
        }
        fetchSettings();
    }, []);

    const updateSettings = async (newSettings: Partial<ExpoSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);

        try {
            // Persist to server
            await fetch('/api/expo-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });
            // Backup to localStorage
            localStorage.setItem('calypsion_expo_settings', JSON.stringify(updated));
        } catch (e) {
            console.error('Failed to save expo settings to API', e);
        }
    };

    const resetSettings = async () => {
        setSettings(DEFAULT_SETTINGS);
        try {
            await fetch('/api/expo-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(DEFAULT_SETTINGS),
            });
            localStorage.setItem('calypsion_expo_settings', JSON.stringify(DEFAULT_SETTINGS));
        } catch (e) {
            console.error('Failed to reset expo settings', e);
        }
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
