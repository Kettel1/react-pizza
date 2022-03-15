import { useState, useEffect, useRef } from "react";

const useComponentVisible = (initialIsVisible:boolean) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsComponentVisible(false);
        }
    };

    const handleClickOutside = (event:any) => {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleHideDropdown);
            document.removeEventListener("click", handleClickOutside);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}

export default useComponentVisible
