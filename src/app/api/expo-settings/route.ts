import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'expo-settings.json');

// Helper to read settings
function readSettings() {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading expo settings:', error);
        return null;
    }
}

// Helper to write settings
function writeSettings(settings: Record<string, unknown>) {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(settings, null, 4), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing expo settings:', error);
        return false;
    }
}

export async function GET() {
    const settings = readSettings();
    if (!settings) {
        return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
    }
    return NextResponse.json(settings);
}

export async function POST(request: Request) {
    try {
        const newSettings = await request.json();
        
        // Basic validation
        if (typeof newSettings !== 'object') {
            return NextResponse.json({ error: 'Invalid settings format' }, { status: 400 });
        }

        const success = writeSettings(newSettings as Record<string, unknown>);
        if (!success) {
            return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
        }

        return NextResponse.json(newSettings);
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
