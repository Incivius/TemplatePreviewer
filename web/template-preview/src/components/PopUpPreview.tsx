interface PopupMessageProps {
    message: string;
    onClose: () => void;
    isValid: boolean;
}

const PopupMessage= ({ message, onClose, isValid } : PopupMessageProps) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '80%',
                    maxWidth: '500px',
                    textAlign: 'center',
                }}
            >
                <h3>Preview Message</h3>
                {isValid ? (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            marginBottom: '20px',
                            fontSize: '16px',
                            lineHeight: '1.5',
                        }}
                    >
                        {message}
                    </div>
                ) : (
                    <p style={{ color: 'red' }}>Please fill in all required fields!</p>
                )}
                <button
                    onClick={onClose}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        background: '#25D366',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopupMessage;
