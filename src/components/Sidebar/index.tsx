import React from 'react';
import TABLE_NAMES from '../../utils/tableNames';
import './sidebar.css'

interface Props {
    sidebarOpen: boolean
    setQuery: (val: string) => void
    setSidebarOpen: (val: boolean) => void
    setValue: (val: string) => void
}

const Sidebar = React.memo(({ sidebarOpen, setQuery, setSidebarOpen, setValue }: Props) => {
    return (
        <nav className={sidebarOpen ? 'nav-menu active' : 'nav-menu'}>

            <ul className='nav-menu-items'>

                {TABLE_NAMES.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="nav-text"
                            onClick={() => {
                                setSidebarOpen(false);
                                setQuery(item);
                                setValue("select * from " + item)
                            }}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </li>
                    );
                })}
            </ul>
            <div
                className='closeSideBar'
                onClick={() => setSidebarOpen(false)}
            >
                Close
            </div>
        </nav>
    );
});

export default Sidebar