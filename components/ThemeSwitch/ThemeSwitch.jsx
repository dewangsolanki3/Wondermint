import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Style from "./ThemeSwitch.module.css";
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={Style.themeSwitch}>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Default</option>
        <option value="Red">Red</option>
        <option value="orange">Orange</option>
      </select>
    </div>
  );
};

export default ThemeSwitch;
