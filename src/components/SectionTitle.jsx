
const SectionTitle = ({ title, redTitle, para }) => {
    return (
        <div className="text-center max-w-3xl mx-auto mt-20">
            <p className="text-4xl inline-block px-4 mb-3">
                {title} <span className="text-secondary">{redTitle}</span>
            </p>
            <p>{para}</p>
        </div>
    );
};

export default SectionTitle;