'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Settings2, 
    Activity, 
    Shield, 
    Save, 
    RotateCcw,
    Monitor,
    Lock
} from 'lucide-react';
import { useExpo } from '@/context/ExpoContext';
import { registerModal, unregisterModal } from '@/services/modalManager';
import styles from './SystemSettingsModal.module.css';

interface SystemSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SystemSettingsModal({ isOpen, onClose }: SystemSettingsModalProps) {
    const { settings, updateSettings, resetSettings } = useExpo();
    const [editData, setEditData] = useState(settings);
    const [activeTab, setActiveTab] = useState<'events' | 'network' | 'security' | 'terminal'>('events');

    // Sync local edit state when settings change
    useEffect(() => {
        setEditData(settings);
    }, [settings]);

    // Manage global modal state
    useEffect(() => {
        if (isOpen) {
            registerModal();
        } else {
            unregisterModal();
        }
        return () => unregisterModal();
    }, [isOpen]);

    if (!isOpen) return null;

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px) brightness(2)' },
        visible: { 
            opacity: 1, scale: 1, y: 0, filter: 'blur(0px) brightness(1)',
            transition: { 
                type: 'spring' as const,
                damping: 25,
                stiffness: 300,
                duration: 0.6 
            } 
        },
        exit: { 
            opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px) brightness(0.5)',
            transition: { duration: 0.3 } 
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className={styles.overlay}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div 
                        className={styles.modal}
                        variants={modalVariants}
                    >
                        {/* TACTICAL HEADER */}
                        <div className={styles.header}>
                            <div className={styles.headerTitle}>
                                <Settings2 size={16} />
                                <span>SYSTEM_ORCHESTRATOR_V4.2.0</span>
                                <span className={styles.diagInfo}>SYNC_STATUS: ACTIVE {" // "} BUILD: 060426</span>
                            </div>
                            <button className={styles.closeBtn} onClick={onClose}>
                                <X size={14} /> ESC_EXIT
                            </button>
                        </div>

                        {/* NAV HEADER */}
                        <div className={styles.navHeader}>
                            <button 
                                className={`${styles.tabBtn} ${activeTab === 'events' ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab('events')}
                            >
                                [01] EVENT_GRID
                            </button>
                            <button className={styles.tabBtn} disabled>
                                [02] NETWORK_SYNC <Lock size={8} className={styles.locked} />
                            </button>
                            <button className={styles.tabBtn} disabled>
                                [03] SECURITY_WALL <Lock size={8} className={styles.locked} />
                            </button>
                            <button className={styles.tabBtn} disabled>
                                [04] CORE_TERMINAL <Lock size={8} className={styles.locked} />
                            </button>
                        </div>

                        <div className={styles.layout}>
                            <div className={styles.splitView}>
                                {/* PREVIEW COLUMN */}
                                <div className={styles.previewCol}>
                                    <div className={styles.sectionTitle}>
                                        <span>LIVE_VISUAL_STREAM</span>
                                        <Activity size={12} />
                                    </div>
                                    
                                    <div className={styles.previewWindow}>
                                        <div className={styles.previewScale}>
                                            <div style={{
                                                width: '1000px',
                                                height: '600px',
                                                background: '#000',
                                                padding: '60px',
                                                color: '#fff',
                                                border: '4px solid #CADBC7',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '30px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                opacity: editData.isVisible ? 1 : 0.2
                                            }}>
                                                <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{editData.title || 'EVENT_TITLE'}</div>
                                                <div style={{ fontSize: '24px', opacity: 0.6 }}>{editData.location.toUpperCase()} {" // "} {editData.date}</div>
                                                <div style={{ fontSize: '18px', background: '#CADBC7', color: '#000', padding: '4px 12px', width: 'fit-content' }}>BOOTH: {editData.booth}</div>
                                                <div style={{ marginTop: 'auto', fontSize: '20px', lineHeight: 1.6, maxWidth: '600px' }}>{editData.description}</div>
                                                {!editData.isVisible && (
                                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4444', fontSize: '80px', fontWeight: 900, transform: 'rotate(-15deg)', opacity: 0.3 }}>OFFLINE</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.pathHint}>
                                        ASSET_ROOT: <strong>/public/images/expo/</strong><br/>
                                        SUPPORTED: PNG, JPG, WEBP, SVG
                                    </div>
                                </div>

                                {/* FORM COLUMN */}
                                <div className={styles.formCol}>
                                    <div className={styles.configArea}>
                                        <div className={styles.sectionTitle}>
                                            <span>CONFIGURATION_PARAMETERS</span>
                                            <Monitor size={12} />
                                        </div>

                                        <div className={styles.visibilityToggle}>
                                            <div 
                                                className={`${styles.switch} ${editData.isVisible ? styles.activeSwitch : ''}`}
                                                onClick={() => setEditData({...editData, isVisible: !editData.isVisible})}
                                            >
                                                <div className={styles.switchThumb} />
                                            </div>
                                            <div className={styles.statusText}>
                                                DEPLOYMENT_STATUS: <span style={{ color: editData.isVisible ? '#CADBC7' : '#ff4444' }}>
                                                    {editData.isVisible ? 'ACTIVE_ONLINE' : 'INACTIVE_OFFLINE'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`${styles.fieldGroup} ${!editData.isVisible ? styles.disabledOverlay : ''}`}>
                                            <div className={styles.fieldFull}>
                                                <label>EVENT_IDENTIFIER_STRING</label>
                                                <input 
                                                    type="text" 
                                                    value={editData.title}
                                                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                                                    placeholder="Enter event name..."
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>SECTOR_LOCATION</label>
                                                <input 
                                                    type="text" 
                                                    value={editData.location}
                                                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                                                    placeholder="e.g. DUBAI, UAE"
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>TEMPORAL_RANGE</label>
                                                <input 
                                                    type="text" 
                                                    value={editData.date}
                                                    onChange={(e) => setEditData({...editData, date: e.target.value})}
                                                    placeholder="e.g. 7 - 9 APRIL"
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>BOOTH_COORDINATES</label>
                                                <input 
                                                    type="text" 
                                                    value={editData.booth}
                                                    onChange={(e) => setEditData({...editData, booth: e.target.value})}
                                                    placeholder="e.g. 10B/32"
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>ASSET_PATH_RELATIVE</label>
                                                <input 
                                                    type="text" 
                                                    value={editData.imageURL}
                                                    onChange={(e) => setEditData({...editData, imageURL: e.target.value})}
                                                    placeholder="/images/expo/filename"
                                                />
                                            </div>

                                            <div className={styles.fieldFull}>
                                                <label>INTEL_DESCRIPTION</label>
                                                <textarea 
                                                    rows={4}
                                                    value={editData.description}
                                                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                                                    placeholder="Enter event briefing..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER ACTIONS */}
                            <div className={styles.footer}>
                                <button className={styles.btnReset} onClick={() => {
                                    resetSettings();
                                    setEditData(settings);
                                }}>
                                    <RotateCcw size={12} /> RESTORE_SYSTEM_DEFAULTS
                                </button>
                                <button className={styles.btnSave} onClick={() => {
                                    updateSettings(editData);
                                    onClose();
                                }}>
                                    COMMIT_CHANGES <Save size={14} style={{ marginLeft: '10px' }} />
                                </button>
                            </div>
                        </div>
                        
                        <div className={styles.securitySeal}>
                            <Shield size={10} />
                            AUTHENTICATED_SESSION_CALYPSION_ADMIN
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
