const PatientProfile = () => {
    return (
        <div>
            <h2 className="dashboard-title">Doctor Dashboard</h2>

            <div className="active-visit-container">
                <h3 className="active-visit-title">Active Visit</h3>

                <p className="visit-info">
                    <span className="visit-info-label">Patient:</span> John Doe
                </p>
                <p className="visit-info">
                    <span className="visit-info-label">Visit ID:</span> 12345
                </p>

                <div className="notes-section">
                    <h4 className="section-subtitle">Medical Notes</h4>
                    <textarea
                        className="notes-textarea"
                        placeholder="Enter medical notes..."
                    ></textarea>
                </div>

                <div className="treatments-section">
                    <h4 className="section-subtitle">Treatments</h4>

                    <div className="add-treatment-form">
                        <input
                            type="text"
                            className="treatment-input"
                            placeholder="Treatment name"
                        />
                        <input
                            type="number"
                            className="treatment-cost-input"
                            placeholder="Cost"
                        />
                        <button className="add-treatment-button">Add</button>
                    </div>
                </div>

                <div className="total-amount-section">
                    <span className="total-amount-label">Total Amount:</span>
                    <span className="total-amount-value">$150.00</span>
                </div>

                <button className="complete-visit-button">
                    Complete Visit
                </button>
            </div>
        </div>
    );
};

export default PatientProfile;
