import React from "react";
import { useDragLayer } from "react-dnd";
import { snapToGrid } from "./snapToGrid";
import "./CustomDrag.css";
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};
function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;
  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
const Custom = ({ draggingCard }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));
  
  var cardStyle = "";
  if(localStorage.getItem("motiveCss") === "cyberpunk" && localStorage.getItem("isLogged") === "true") cardStyle += "cyberpunk";
  return (
    <div style={layerStyles}>
      <div
        className="game-view__dragging-container"
        style={getItemStyles(initialOffset, currentOffset, true)}
      >
        {draggingCard.array.map((item, index) => {
          const convertRankToClass = "v" + item.rank;
          const top = index * 20;
          return (
            <div
              key={index}
              className="game-view__dragging-container__item"
              style={{ top: top + "%" }}
            >
              <div className={"card " + convertRankToClass + " " + item.shape + " " + cardStyle}>
                <span className="card__value"></span>
                <span className="card__minisuit"></span>
                <span className="card__mainsuit"></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Custom;
