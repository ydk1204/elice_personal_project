import React, { useState, useRef, useEffect } from "react";
import Result from "../result/result";
import styles from "./question.module.css";

const Question = (props) => {
  const [val, setVal] = useState({});
  const trueRef = useRef(null);
  const falseRef = useRef(null);
  const qId = props.question.qitemNo;
  let update = {};
  let selected = "";
  const count = 1;

  let data = 0;

  const onChangeRadio = (event) => {
    update[props.question.qitemNo] = event.target.value;
    setVal(update);
  };
  props.progressPer(val);
  props.result(val);

  if (props.settingKey === qId) {
    if (props.pp[qId] === "7") {
      selected = true;
      data++;
    } else if (props.pp[qId] === "1") {
      selected = false;
      data++;
    } else {
      selected = "";
      data = 0;
    }
  }
  useEffect(() => {
    if (props.confirm !== undefined) {
      props.confirm(data);
    }
  });

  return (
    <ul className={styles.selectBox}>
      <div>
        <p className={styles.ask}>{props.question.question}</p>
      </div>
      <div className={styles.radios}>
        <label>
          <input
            type="radio"
            name={qId}
            value="1"
            {...(selected === false ? { checked: true } : {})}
            ref={falseRef}
            onChange={onChangeRadio}
          />
          전혀 그렇지 않다
        </label>
        <label>
          <input
            type="radio"
            name={qId}
            value="7"
            {...(selected === true ? { checked: true } : {})}
            ref={trueRef}
            onChange={onChangeRadio}
          />
          매우 그렇다
        </label>
      </div>
    </ul>
  );
};

export default Question;
