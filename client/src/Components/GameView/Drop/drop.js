import React from "react";
import { useDrop } from "react-dnd";
import styles from "./Drop.module.css";

const Drop = ({
  accept,
  onDrop,
  top,
  currentArr,
  draggingArr,
  name,
  isDragActive,
}) => {
  const [collectedProps, drop] = useDrop({
    accept,
  });

  const activeStyles = {
    top: top + "%",
    zIndex: "100",
  };

  const style = {
    top: top + "%",
  };

  return (
    <div
      className={styles.drop}
      onDrop={() => onDrop({ title: name, array: currentArr }, draggingArr)}
      ref={drop}
      style={isDragActive ? activeStyles : style}
    ></div>
  );
};

export default React.memo(Drop);
