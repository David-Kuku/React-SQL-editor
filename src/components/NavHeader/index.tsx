import React, { useEffect, useRef, useState } from 'react'
import Hamburger from '../../icons/hamburger'
import Sidebar from '../Sidebar'
import styles from './navHeader.module.css'

interface Props {
    setQuery: (val: string) => void
    setValue: (val: string) => void
}
const Nav = React.memo(({ setQuery, setValue }: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const ref: any = useRef<React.Component>(null);
    useEffect(() => {
        document.addEventListener("mousedown", Clickout);
        return () => {
            document.removeEventListener("mousedown", Clickout);
        };
    }, []);

    const Clickout = (eve: Event) => {
        if (ref.current && !ref.current.contains(eve.target)) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className={styles.container} ref={ref}>
            <Sidebar
                sidebarOpen={sidebarOpen}
                setQuery={setQuery}
                setSidebarOpen={setSidebarOpen}
                setValue={setValue} />
            <div onClick={() => { setSidebarOpen(true) }} className={styles.hamburger}><Hamburger /></div>

            <p className={styles.editorText}>SQL Editor</p>
        </div>
    )
})

export default Nav