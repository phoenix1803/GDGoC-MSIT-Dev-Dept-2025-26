import { useEffect } from "react";

export const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title
      ? `${title} | TodoQuest`
      : "TodoQuest - Gamify Your Productivity | Level Up Your Life";

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
