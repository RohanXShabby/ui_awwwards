interface MobileOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

export const MobileOverlay = ({ isVisible, onClose }: MobileOverlayProps) => {
    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 lg:hidden animate-in fade-in duration-300"
            onClick={onClose}
        />
    );
};