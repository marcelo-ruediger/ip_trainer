function ImageToggle({ showImage, onToggle, tableImg }) {
    return (
        <div className="image-toggle-container">
            <label className="toggle-label">
                <input
                    type="checkbox"
                    checked={showImage}
                    onChange={onToggle}
                />
                Hilfstabelle
            </label>
            <div className={`hidden ${showImage ? "visible" : "invisible"}`}>
                <img src={tableImg} alt="Toggleable" />
            </div>
        </div>
    );
}

export default ImageToggle;
