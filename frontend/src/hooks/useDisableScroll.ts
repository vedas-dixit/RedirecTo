import { useEffect } from "react";

export const useDisableScroll = (shouldDisable: boolean) => {
  useEffect(() => {
    if (!shouldDisable) return;

    const preventDefault = (e: Event) => e.preventDefault();

    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        " ",
        "Home",
        "End",
      ];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    // Disable scroll behaviors
    document.body.style.overscrollBehavior = "none";

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventScrollKeys);

    // Cleanup
    return () => {
      document.body.style.overscrollBehavior = "";

      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, [shouldDisable]);
};
