import { useState, useEffect } from 'react';

export const useSidebarLogic = () => {
    const [showLeftSidebar, setShowLeftSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // Handle Screen Resize
    useEffect(() => {
        const checkDesktop = () => {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);
            if (desktop) {
                setShowLeftSidebar(false);
                setShowRightSidebar(false);
            }
        };
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Lock body scroll on mobile when menu is open
    useEffect(() => {
        if (!isDesktop && (showLeftSidebar || showRightSidebar)) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showLeftSidebar, showRightSidebar, isDesktop]);

    return {
        showLeftSidebar,
        setShowLeftSidebar,
        showRightSidebar,
        setShowRightSidebar,
        isDesktop
    };
};