"use client";
import React from "react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon, Volume, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { usePreferences } from "@/store/usePreferences";
import { useSound } from "use-sound";
function PreferencesTab() {
  const { setTheme } = useTheme();
  const { soundEnabled,setSoundEnabled } = usePreferences();
  const [playMouseClick] = useSound("/sounds/mouse-click.mp3");
  const [playSoundon] = useSound("/sounds/sound-on.mp3", { volume: 0.3 });
  const [playSoundoff] = useSound("/sounds/sound-off.mp3", { volume: 0.3 });
  return (
    <div className="flex flex-wrap gap-2 px-1 md:px-2">
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          setTheme("light");
          soundEnabled && playMouseClick();
        }}
      >
        <SunIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          setTheme("dark");
          soundEnabled && playMouseClick();
        }}
      >
        <MoonIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          setSoundEnabled(!soundEnabled);
          soundEnabled ? playSoundon() : playSoundoff();
        }}
      >
        {soundEnabled ? (
          <Volume2 className="size-[1.2rem] text-muted-forground"></Volume2>
        ) : (
          <VolumeX className="size-[1.2rem] text-muted-forground"></VolumeX>
        )}
      </Button>
    </div>
  );
}

export default PreferencesTab;
