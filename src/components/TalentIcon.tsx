import talentIcons from 'assets/talent-icons-sprite.png';
import { useEffect, useRef, useState } from 'react';
import './TalentIcon.css';

const ICON_SIZE = 50;

type Props = {
  spriteColumn: number;
  isActive: boolean;
  isEnabled?: boolean;
  disabled: boolean;
  onClick: (talentIndex: number, talentRowIndex: number) => void;
  talentIndex: number;
  talentRowIndex: number;
};

const TalentIcon = ({ spriteColumn = 0, disabled, isActive, isEnabled, onClick, talentIndex, talentRowIndex }: Props) => {
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = myCanvas.current?.getContext('2d');
    const image = new Image();
    image.src = talentIcons;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = ICON_SIZE;
      canvas.height = ICON_SIZE;
      if (ctx) {
        ctx.imageSmoothingQuality = 'high';
        const sourceX = spriteColumn * ICON_SIZE;
        const sourceY = isActive || (isHovered && !disabled) ? 0 : 1 * ICON_SIZE;
        ctx.drawImage(image, sourceX, sourceY, ICON_SIZE, ICON_SIZE, 0, 0, ICON_SIZE, ICON_SIZE);
      }
    };
  }, [spriteColumn, isActive, isHovered, disabled, isEnabled]);

  const isDisabled = disabled ? 'canvas-disabled' : 'canvas-inactive';

  return (
    <button
      className="icon-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(talentIndex, talentRowIndex)}
    >
      <canvas
        data-testid={`talent-icon-${talentRowIndex}-${talentIndex}`}
        ref={myCanvas}
        width={50}
        height={50}
        className={isActive ? 'canvas-active' : isDisabled}
      />
    </button>
  );
};

export default TalentIcon;