import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import { CATEGORY_COLORS } from "../utils/categoryColors";

export default function HabitDetail() {
    const { index } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [habit, setHabit] = useState(null);
    const [notes, setNotes] = useState("");

    // Load habit from localStorage 
    useEffect(() => {
        if (!user?.email) return;

        const saved = JSON.parse(localStorage.getItem(`habits_${user.email}`)) || [];
        const selected = saved[index];

        if (!selected) {
            navigate("/dashboard");
            return;
        }

        setHabit(selected);
    }, [index, navigate, user]);

    // Load notes when habit loads 
    useEffect(() => {
        if (habit) setNotes(habit.notes || "");

    }, [habit]);

    // Auto-save notes 
    useEffect(() => {
        if (!habit) return;

        const saved = JSON.parse(localStorage.getItem(`habits_${user.email}`)) || [];
        saved[index] = { ...habit, notes, history: habit.history || [] };
        localStorage.setItem(`habits_${user.email}`, JSON.stringify(saved));
        setHabit(saved[index]);
    }, [notes]);

    // History sorted 
    const history = useMemo(() => {
        if (!habit?.history) return [];
        return [...habit.history].sort((a, b) => new Date(a) - new Date(b));
    }, [habit]);

    // Build timeline 
    function buildTimeline(dates) {
        if (dates.length === 0) return [];

        const sorted = dates.map(d => new Date(d)).sort((a, b) => a - b);

        const timeline = [];
        let current = new Date(sorted[0]);
        const today = new Date();

        while (current <= today) {
            timeline.push(new Date(current).toDateString());
            current.setDate(current.getDate() + 1);
        }

        return timeline;
    }

    const timeline = useMemo(() => buildTimeline(history), [history]);

    // Streak chart heights 
    function getStreakClusterHeights(timeline, history) {
        let heights = [];
        let streak = 0;

        timeline.forEach(day => {
            if (history.includes(day)) {
                streak += 1;
                heights.push(streak);
            } else {
                streak = 0; heights.push(0);
            }
        });

        return heights;
    }

    const clusterHeights = useMemo(() => {
        if (!habit) return [];
        return getStreakClusterHeights(timeline, history);
    }, [timeline, history]);

    // Week logic 
    function getCurrentWeekDates() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const sundayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        const sunday = new Date(today);
        sunday.setDate(today.getDate() + sundayOffset);

        const week = [];

        for (let i = 0; i < 7; i++) {
            const d = new Date(sunday); d.setDate(sunday.getDate() + i); week.push(d.toDateString());
        }

        return week;
    }

    const week = useMemo(() => getCurrentWeekDates(), []);
    const completedThisWeek = useMemo(() => week.filter(day => history.includes(day)).length, [week, history]);

    // Category color 
    const color = habit ? CATEGORY_COLORS[habit.category] || "gray" : "gray";

    // Weekly squares 
    const weekSquares = useMemo(
        () => week.map(day => history.includes(day)),
        [week, history]);

    if (!habit) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors">
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 transition"
                >
                    <span className="text-lg">←</span>
                    <span className="font-medium">Back to Dashboard</span>
                </button>

                {/* TITLE */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        {habit.name}
                    </h1>

                    <span
                        className={` px-3 py-1 rounded-lg text-sm font-medium 
                            bg-${color}-100 dark:bg-${color}-900 
                            text-${color}-700 dark:text-${color}-200 
                        `}
                    >
                        {habit.category}
                    </span>
                </div>

                {/* ANALYTICS */}
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Analytics</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Current Streak</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium">{habit.streak} days</p>
                        </div>

                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Longest Streak</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium">{habit.longestStreak || 0} days</p>
                        </div>

                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Total Check‑Ins</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium">{habit.history.length}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 dark:text-gray-400">First Check‑In</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium"> {habit.history[0] || "—"} </p>
                        </div>

                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Most Recent</p>
                            <p className="text-gray-900 dark:text-gray-100 font-medium"> {habit.lastCheckIn || "—"} </p>
                        </div>
                    </div>
                </Card>

                {/* THIS WEEK */}
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">This Week</h2>

                    <div className="flex items-center gap-2"> {weekSquares.map((filled, i) => (
                        <div key={i} className={` h-4 w-4 rounded-md ${filled ? `bg-${color}-500 dark:bg-${color}-400` : "bg-gray-200 dark:bg-gray-700"} `}
                        ></div>
                    ))}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                        {completedThisWeek} / 7 days completed
                    </p>
                </Card>

                {/* STREAK CHART */}
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Streak Chart</h2>

                    <div className="flex items-end gap-1 h-24">
                        {clusterHeights.map((height, i) => (
                            <div
                                key={i}
                                className={`w-3 rounded-md bg-${color}-500 dark:bg-${color}-400`}
                                style={{ height: `${height * 12}px` }}
                            ></div>
                        ))}
                    </div>
                </Card>

                {/* NOTES */}
                <Card>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notes</h2>

                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Write your thoughts, reflections, or progress notes..."
                        className=" 
                            w-full h-32 p-3 
                            bg-white dark:bg-gray-800 
                            border border-gray-300 dark:border-gray-700 
                            text-gray-800 dark:text-gray-100 
                            rounded-lg 
                            focus:ring-2 focus:ring-brand-500 
                            transition-colors "
                    />
                </Card>
            </div>
        </div>
    );
}