import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    // Task 1: Complete the implementation to fetch gifts from the backend server
    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.error("Error fetching gifts:", error);
            }
        };
        fetchGifts();
    }, []);

    // Task 2: Navigate to the individual gift details view routing page template
    const handleDetailsNavigation = (id) => {
        navigate(`/gift/${id}`);
    };

    // Task 3: Format the epoch Unix timestamp into local calendar presentation rules
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100 style-card" onClick={() => handleDetailsNavigation(gift.id)} style={{ cursor: 'pointer' }}>
                            {/* Task 4: Display gift image or fallback layout placeholder */}
                            <div className="image-placeholder-container">
                                {gift.image ? (
                                    <img src={`${urlConfig.backendUrl}${gift.image}`} className="card-img-top" alt={gift.name} style={{ height: '200px', objectFit: 'cover' }} />
                                ) : (
                                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '200px' }}>No Image Available</div>
                                )}
                            </div>
                            <div className="card-body d-flex flex-column justify-content-between">
                                {/* Task 5: Display gift name */}
                                <h5 className="card-title fw-bold text-dark">{gift.name}</h5>
                                <p className="card-text text-muted text-truncate">{gift.description}</p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="badge bg-info text-dark">{gift.condition}</span>
                                    {/* Task 6: Display the formatted date */}
                                    <small className="text-secondary">{formatTimestamp(gift.date_added)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
