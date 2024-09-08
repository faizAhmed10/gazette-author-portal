import { useEffect, useState } from "react";

const ScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY; 

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // Cleanup on unmount
    };
  }, [scrollDirection]);

  return scrollDirection;
}



export default ScrollDirection;