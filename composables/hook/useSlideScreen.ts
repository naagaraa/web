import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

/**
 *custom hook manage slide per view
 * @param slidesView - initial default slide per view : (default : 3)
 * @returns slidePerview state and a function to manually set slide of view.
 */
function useSlideScreen(slidesView: number = 3) {
    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
    const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
    const [slidesPerView, setSlidesPerView] = useState(slidesView);

    useEffect(() => {
        if (isDesktopOrLaptop) {
            setSlidesPerView(3);
        } else if (isBigScreen) {
            setSlidesPerView(3);
        } else {
            setSlidesPerView(2);
        }
    }, [isDesktopOrLaptop, isBigScreen]);

    return { slidesPerView }
}

export default useSlideScreen