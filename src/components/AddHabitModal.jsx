export default function AddHabitModal({ isOpen, onClose, onSave, initialData }) {
    if (!isOpen) return null;

    const isEditing = Boolean(initialData);

    function handleSubmit(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const category = e.target.category.value;

        onSave({
            name,
            category,
            streak: initialData?.streak ?? 0,
            lastCheckIn: initialData?.lastCheckIn ?? null,
            history: initialData?.history ?? []
        });

        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-md p-6 pb-2 rounded-xl shadow-xl border border-gray-100 relative">

                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEditing ? "Edit Habit" : "Add New Habit"}
                    </h2>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Habit Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Habit Name
                        </label>
                        <input
                            name="name"
                            defaultValue={initialData?.name || ""}
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="e.g., Drink Water"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            defaultValue={initialData?.category || "Health"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option>Health</option>
                            <option>Mind</option>
                            <option>Productivity</option>
                            <option>Fitness</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition font-medium"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                        >
                            {isEditing ? "Save Changes" : "Save Habit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}