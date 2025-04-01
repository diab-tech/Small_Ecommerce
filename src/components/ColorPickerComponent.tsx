import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./ColorPickerComponent.css";

interface ColorItem {
  color: string;
  name: string;
}
interface ColorPickerProps {
  onColorsChange: (colors: string[]) => void;
  initialColors?: string[]; // أضف ده
}

const getContrastColor = (hexColor: string): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance > 128 ? "#000000" : "#FFFFFF";
};
const ColorPickerComponent: React.FC<ColorPickerProps> = ({
  onColorsChange,
  initialColors = [],
}) => {
  const [colors, setColors] = useState<ColorItem[]>(
    initialColors.map((color) => ({ color, name: color })), // تحويل string[] لـ ColorItem[]
  );
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [colorName, setColorName] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [activeChip, setActiveChip] = useState<number | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleAddColor = () => {
    if (currentColor && !colors.some((c) => c.color === currentColor)) {
      const newColors = [...colors, { color: currentColor, name: colorName || currentColor }];
      setColors(newColors);
      setColorName("");
      setShowPicker(false);
      onColorsChange(newColors.map((c) => c.color));
    }
  };

  const handleDeleteColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    setActiveChip(null);
    onColorsChange(newColors.map((c) => c.color));
  };

  const handleChipClick = (index: number) => {
    setActiveChip(activeChip === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="color-picker-container">
      <Button
        variant="contained"
        className="selectBtn"
        onClick={() => setShowPicker(!showPicker)}
        style={{ marginBottom: "5px" }}
      >
        Open Picker
      </Button>

      {showPicker && (
        <div className="picker-popover" ref={pickerRef}>
          <div className="picker-header">
            <span className="close-btn" onClick={() => setShowPicker(false)}>
              X
            </span>
          </div>
          <div
            className="picker-wrapper"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter") {
                handleAddColor();
              }
            }}
            tabIndex={0}
          >
            <SketchPicker
              color={currentColor}
              onChangeComplete={(color) => setCurrentColor(color.hex)}
              width="100%"
            />
            <TextField
              label="Rename Color (Optional)"
              className="rename-color"
              value={colorName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColorName(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              style={{ margin: "10px 0 0 0" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddColor}
              fullWidth
              style={{ margin: "0", borderRadius: "4px" }}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      <div className="selected-colors">
        {colors.map((item, index) => (
          <div className="chip-wrapper" key={index}>
            <Chip
              label={item.name}
              style={{
                backgroundColor: item.color,
                color: getContrastColor(item.color),
                margin: "2px",
                cursor: "pointer",
              }}
              onClick={() => handleChipClick(index)}
            />
            {activeChip === index && (
              <span className="delete-overlay" onClick={() => handleDeleteColor(index)}>
                X
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerComponent;
