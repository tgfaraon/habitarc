import { useNavigate } from "react-router-dom";
import { CATEGORY_COLORS } from "../utils/categoryColors";

export default function HabitCard({
    index,
    name,
    streak,
    category,
    checkedToday,
    onCheckIn,
    onDelete,
    onEdit
}) {
    const navigate = useNavigate();
    const color = CATEGORY_COLORS[category] || "gray";

    return (
        <div
            onClick={() => navigate(`/habit/${index}`)}
            className={` 
                flex flex-col justify-between gap-4 p-5 rounded-xl cursor-pointer transition
                border-l-4 bg-white dark:bg-gray-800
                shadow-sm hover:shadow-cardHover
                border-${color}-500 
                `}
        >

            {/* HEADER */}
            <div className="space-y-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 pl-1">
                        <span className={`text-xl text-${color}-600 dark:text-${color}-400`}>
                            {categoryIcons[category]}
                        </span>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {name}
                        </h3>
                    </div>

                    <span
                        className={` 
                            px-2 py-1 text-xs font-medium rounded-lg
                            bg-${color}-100 dark:bg-${color}-900 
                            text-${color}-700 dark:text-${color}-200 
                        `}
                    >
                        {category}
                    </span>
                </div>

                {/* STREAK + TODAY */}
                <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full bg-${color}-500 dark:bg-${color}-400`}></span>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Streak:</span> {streak} days
                    </p>

                    {checkedToday && (
                        <span className=" 
                        px-2 py-1 bg-green-100 dark:bg-green-900
                        text-green-700 dark:text-green-200
                        text-xs font-medium rounded-lg
                        ">
                            ✓ Today
                        </span>
                    )}
                </div>
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onCheckIn();
                    }}
                    className={` 
                        px-3 py-1 rounded-lg text-sm font-medium transition
                        ${checkedToday
                            ? `bg-${color}-500 dark:bg-${color}-400 text-white`
                            : "bg-brand-600 text-white hover:bg-brand-700"
                        } 
                    `}
                >
                    {checkedToday ? "Done" : "Check In"}
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    className=" 
                    text-brand-600 dark:text-brand-400
                    hover:underline text-sm transition
                    "
                >
                    Edit
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className=" 
                    text-red-500 dark:text-red-400
                    hover:underline text-sm transition
                    "
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

const categoryIcons = {
    Health: "💧",
    Fitness: "🏃‍♂️",
    Productivity: "📈",
    Mind: "🧘"
};