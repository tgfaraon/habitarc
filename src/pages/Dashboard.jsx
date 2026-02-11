import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import HabitCard from "../components/HabitCard";
import AddHabitModal from "../components/AddHabitModal";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [habits, setHabits] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHabitIndex, setEditingHabitIndex] = useState(null);

    // Load habits 
    useEffect(() => {
        if (!user?.email) return;
        const saved = JSON.parse(localStorage.getItem(`habits_${user.email}`)) || [];
        setHabits(saved);
    }, [user]);

    function handleCheckIn(index) {
        const updated = [...habits];
        const today = new Date().toDateString();

        if (!updated[index].history) updated[index].history = [];

        if (!updated[index].history.includes(today)) {
            updated[index].history.push(today);
            updated[index].streak = (updated[index].streak || 0) + 1;
            updated[index].lastCheckIn = today;
        }

        localStorage.setItem(`habits_${user.email}`, JSON.stringify(updated));
        setHabits(updated);
    }

    function handleDeleteHabit(index) {
        const updated = habits.filter((_, i) => i !== index);
        localStorage.setItem(`habits_${user.email}`, JSON.stringify(updated));
        setHabits(updated);
    }

    function handleEditHabit(index) {
        setEditingHabitIndex(index);
        setIsModalOpen(true);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <main className="flex-1 p-6 max-w-3xl mx-auto w-full">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        HabitArc
                    </h1>

                    <button
                        onClick={() => navigate("/")}
                        className="text-red-500 dark:text-red-400 font-medium hover:underline text-sm"
                    >
                        Logout
                    </button>
                </div>

                {/* WELCOME */}
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                    Welcome back, {user?.name}
                </h2>

                {/* HABIT LIST */}
                <div className="space-y-4">
                    {habits.length === 0 && (
                        <Card className="text-center py-10">
                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                                You don’t have any habits yet.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
                            >
                                Add your first habit
                            </button>
                        </Card>
                    )}

                    {habits.map((habit, index) => {
                        const today = new Date().toDateString();
                        const checkedToday = habit.history?.includes(today);

                        return (
                            <Card key={habit.id} className="p-0">
                                <HabitCard
                                    index={index}
                                    name={habit.name}
                                    streak={habit.streak}
                                    category={habit.category}
                                    checkedToday={checkedToday}
                                    onCheckIn={() => handleCheckIn(index)}
                                    onDelete={() => handleDeleteHabit(index)}
                                    onEdit={() => handleEditHabit(index)}
                                />
                            </Card>
                        );
                    })}
                </div>
            </main>

            {/* ADD HABIT BUTTON */}
            <button
                onClick={() => setIsModalOpen(true)}
                className=" 
                    fixed bottom-6 right-6 px-5 py-3 rounded-full shadow-lg
                    bg-brand-600 text-white hover:bg-brand-700
                    dark:bg-brand-700 dark:hover:bg-brand-600
                    transition font-medium
                    "
            >
                + Add Habit
            </button>

            {/* MODAL */}
            <AddHabitModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingHabitIndex(null);
                }}
                onSave={(habit) => {
                    if (editingHabitIndex !== null) {
                        const updated = [...habits];
                        updated[editingHabitIndex] = habit;
                        setHabits(updated);
                    } else {
                        setHabits([...habits, habit]);
                    }
                }}
                initialData={editingHabitIndex !== null ? habits[editingHabitIndex] : null}
            />
        </div>
    );
}