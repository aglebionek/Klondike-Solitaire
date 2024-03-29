import React from "react";
import DraggableCard from "../DraggableCard/DraggableCard";
import Drop from "../Drop/drop";
import Card from "../Card/Card";
import mainColumnsStyles from "./MainColumns.module.css";
import mainColumnsStylesCyberpunk from "./MainColumnsCyberpunk.module.css";


const MainColumns = ({
  mainColumns,
  setDraggingCard,
  handleDrop,
  draggingCard,
  effect,
  analysis,
}) => {
  var styles;
  if (localStorage.getItem("motiveCss") !== "cyberpunk" || localStorage.getItem("isLogged") === "false") {
    styles = mainColumnsStyles;
  } else if (localStorage.getItem("motiveCss") === "cyberpunk" && localStorage.getItem("isLogged") === "true") {
    styles = mainColumnsStylesCyberpunk;
  }
  return (
    <div className={styles.cardBottom}>
      {Object.entries(mainColumns).map(([key, column]) => {
        return (
          <div className={styles.mainColumn} key={key}>
            <div className={styles.cardShadow}>
              {column.get.map((item, index) => {
                const isLastItem = column.get.length - 1 === index;
                const top = index * 20;
                if (!item.isVisible) {
                  return (
                    <Card item={item} top={top} index={index} key={index} />
                  );
                }
                return (
                  <DraggableCard
                    type="card"
                    key={index}
                    top={top}
                    index={index}
                    item={item}
                    name={key}
                    setDraggingCard={setDraggingCard}
                    isLastItem={isLastItem}
                    onDrop={handleDrop}
                    currentArr={column.get}
                    draggingArr={draggingCard}
                    effect={effect}
                  />
                );
              })}
              {!analysis && (
                <Drop
                  onDrop={handleDrop}
                  currentArr={column.get}
                  draggingArr={draggingCard}
                  accept="card"
                  name={key}
                  isDragActive={
                    draggingCard.array.length > 0 && draggingCard.title !== key
                  }
                  top={(column.get.length - 1) * 20}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainColumns;
