export default function Card({ children, className = "" }) {
    return (
        <div
            className={` 
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                shadow-card dark:shadow-none
                rounded-xl p-5 transition-colors
                ${className} 
            `}
        >
            {children}

        </div>
    );
}