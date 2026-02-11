export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* App Shell */}
            <header className="
            w-full py-4 border-b 
            bg-white dark:bg-gray-800 
            border-gray-200 dark:border-gray-700
            transition-colors
            ">
                <div className="max-w-3xl mx-auto px-6">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        HabitArc
                    </h1>
                </div>
            </header>

            {/* Page Container */}
            <div className="max-w-3xl mx-auto px-6 py-8">
                {children}
            </div>
        </div>
    );
}