import { useState, useEffect } from 'react';

// Preloader is entirely our own work
export const preloadScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const preloadScreen = () => {
            setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('preload', 'isLoaded');
            }, 2000);
        };

        // Check whether 'preload' key is present in sessionStorage
        const isPreloaded = sessionStorage.getItem('preload') === 'isLoaded';
        !isPreloaded ? preloadScreen() : setIsLoading(false)

    }, []);
    return { isLoading }
}

// Function below copied with small changes from dev.to post:
// Source URL: https://dev.to/kevinluo201/set-value-of-datetime-local-input-field-3435
// Date: 3/8/24
export function convertToDateTimeLocalString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
