import React, { useEffect, useState } from "react";
import styles from "./progressBar.module.css";

const ProgressBar = (props) => {
  let check = 0;
  let width = 750;

  const [value, setValue] = useState(0);

  useEffect(() => {
    check = props.progress;
    setValue((check / 48) * 100);
  });

  return (
    <>
      <div className={styles.progressBar} style={{ width: width }}>
        <p className={styles.font}>{Math.ceil(value)}%</p>
        <div
          className={styles.progress}
          style={{ width: `${value / 1.014}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
