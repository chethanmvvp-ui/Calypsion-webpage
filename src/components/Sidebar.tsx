import styles from './Sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <Link href="/" className={styles.logoBlock}>
                <div className={`${styles.logoImageContainer} cut-corner-br`}>
                    <Image
                        src="/images/Logo2.png"
                        alt="Calypsion Logo"
                        width={100}
                        height={100}
                        className={styles.logoImage}
                        priority
                    />
                </div>
            </Link>

            <div className={styles.verticalText}>
                <span>Calypsion Innovation LLP</span>
            </div>
        </aside>
    );
}
