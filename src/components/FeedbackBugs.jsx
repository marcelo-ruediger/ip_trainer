import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/FeedbackBugs.css";

function FeedbackBugs({ onClose }) {
    const { t } = useLanguage();
    const [formType, setFormType] = useState("feedback"); // "feedback" or "bug"
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        email: "",
        browserInfo: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getBrowserInfo = () => {
        const userAgent = navigator.userAgent;
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
        return `User Agent: ${userAgent}\nScreen: ${screenSize}\nViewport: ${viewportSize}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const browserInfo = getBrowserInfo();

        const issueTitle = encodeURIComponent(
            `[${formType.toUpperCase()}] ${formData.title}`
        );
        const issueBody = encodeURIComponent(
            `**Type:** ${
                formType === "bug" ? "Bug Report" : "Feature Request/Feedback"
            }\n\n` +
                `**Description:**\n${formData.description}\n\n` +
                `**Contact Email:** ${formData.email || "Not provided"}\n\n` +
                `**Browser Information:**\n\`\`\`\n${browserInfo}\n\`\`\`\n\n` +
                `**Additional Info:**\n${
                    formData.browserInfo || "None provided"
                }`
        );

        const githubUrl = `https://github.com/MarceloRuediger/ip_trainer/issues/new?title=${issueTitle}&body=${issueBody}`;

        window.open(githubUrl, "_blank");

        setIsSubmitting(false);
        setSubmitted(true);

        setTimeout(() => {
            onClose();
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div
                    className="modal-content feedback-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2>{t("feedbackBugs.thankYou")}</h2>
                        <button onClick={onClose} className="close-button">
                            ×
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{t("feedbackBugs.redirected")}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content feedback-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>{t("feedbackBugs.title")}</h2>
                    <button onClick={onClose} className="close-button">
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>{t("feedbackBugs.type")}</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="formType"
                                        value="feedback"
                                        checked={formType === "feedback"}
                                        onChange={(e) =>
                                            setFormType(e.target.value)
                                        }
                                    />
                                    {t("feedbackBugs.feedback")}
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="formType"
                                        value="bug"
                                        checked={formType === "bug"}
                                        onChange={(e) =>
                                            setFormType(e.target.value)
                                        }
                                    />
                                    {t("feedbackBugs.bugReport")}
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">
                                {t("feedbackBugs.titleLabel")} *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder={
                                    formType === "bug"
                                        ? t("feedbackBugs.bugTitlePlaceholder")
                                        : t(
                                              "feedbackBugs.feedbackTitlePlaceholder"
                                          )
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">
                                {t("feedbackBugs.description")} *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder={
                                    formType === "bug"
                                        ? t(
                                              "feedbackBugs.bugDescriptionPlaceholder"
                                          )
                                        : t(
                                              "feedbackBugs.feedbackDescriptionPlaceholder"
                                          )
                                }
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                {t("feedbackBugs.email")}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={t("feedbackBugs.emailPlaceholder")}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="browserInfo">
                                {t("feedbackBugs.additionalInfo")}
                            </label>
                            <textarea
                                id="browserInfo"
                                name="browserInfo"
                                value={formData.browserInfo}
                                onChange={handleInputChange}
                                placeholder={t(
                                    "feedbackBugs.additionalInfoPlaceholder"
                                )}
                                rows="2"
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn-cancel"
                            >
                                {t("feedbackBugs.cancel")}
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-submit"
                            >
                                {isSubmitting
                                    ? t("feedbackBugs.submitting")
                                    : t("feedbackBugs.submit")}
                            </button>
                        </div>
                    </form>

                    <div className="info-note">
                        <p>{t("feedbackBugs.githubNote")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedbackBugs;
