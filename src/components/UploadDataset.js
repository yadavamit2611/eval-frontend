import React, { useState } from 'react';
import axios from 'axios';

const UploadDataset = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [open, setOpen] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload');
            setSeverity('error');
            setOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            setSeverity('success');
            setOpen(true);
            setFile(null); // Clear the selected file
        } catch (error) {
            setMessage('Error uploading file: ' + (error.response?.data?.error || error.message));
            setSeverity('error');
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>File Upload</h2>
                <div style={styles.fileInputContainer}>
                    <input
                        accept="*"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" style={styles.fileInputLabel}>
                        Choose File
                    </label>
                </div>
                {file && (
                    <p style={styles.fileName}>
                        Selected file: <strong>{file.name}</strong>
                    </p>
                )}
                <button style={styles.uploadButton} onClick={handleSubmit}>
                    Upload
                </button>
                {open && (
                    <div style={severity === 'error' ? styles.errorMessage : styles.successMessage}>
                        {message}
                        <button onClick={handleClose} style={styles.closeButton}>
                            ×
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
    },
    card: {
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        width: '400px',
    },
    title: {
        margin: '0 0 20px 0',
        fontSize: '24px',
    },
    fileInputContainer: {
        marginBottom: '20px',
    },
    fileInputLabel: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    fileName: {
        margin: '10px 0',
        fontSize: '16px',
    },
    uploadButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    uploadButtonHover: {
        backgroundColor: '#218838',
    },
    errorMessage: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f44336',
        color: '#fff',
        borderRadius: '5px',
        position: 'relative',
    },
    successMessage: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#4caf50',
        color: '#fff',
        borderRadius: '5px',
        position: 'relative',
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '16px',
        position: 'absolute',
        right: '10px',
        top: '5px',
        cursor: 'pointer',
    },
};

export default UploadDataset
