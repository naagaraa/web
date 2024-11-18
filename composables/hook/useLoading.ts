import { useState, useEffect } from "react";

/**
 * Custom hook to manage loading state.
 * @param initialLoading - Initial loading state (default: true).
 * @param duration - Optional duration for simulated loading in milliseconds.
 * @returns isLoading state and a function to manually set loading.
 */
function useLoading(initialLoading: boolean = true, duration?: number) {
    const [isLoading, setIsLoading] = useState<boolean>(initialLoading);

    useEffect(() => {
        if (duration !== undefined) {
            const timer = setTimeout(() => setIsLoading(false), duration);
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [duration]);

    return { isLoading, setIsLoading };
}

export default useLoading;
