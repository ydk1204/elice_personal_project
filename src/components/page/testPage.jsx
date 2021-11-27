import React, { useState, useRef, useEffect, useMemo } from "react";
import Question from "../question/question";
import { useNavigate } from "react-router";
import styles from "./testPage.module.css";
import ProgressBar from "./progressBar";

const TestPage = (props) => {
  const [btnColor, setBtnColor] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const viewRef = useRef(null);

  const list = props.questions.map((question) => question);
  let data = 0;
  let countPer = 0;
  const [progress, setProgress] = useState(0);

  const arr1 = list.slice(0, 5);
  const arr2 = list.slice(5, 10);
  const arr3 = list.slice(10, 15);
  const arr4 = list.slice(15, 20);
  const arr5 = list.slice(20, 25);
  const arr6 = list.slice(25, 30);
  const arr7 = list.slice(30, 35);
  const arr8 = list.slice(35, 40);
  const arr9 = list.slice(40, 45);
  const arr10 = list.slice(45);

  const [test, setTest] = useState(list.slice(0, 5));
  const [check, setCheck] = useState(0);

  const onClick = () => {
    if (test[0].qitemNo == "1") {
      setTest(arr2);
    } else if (test[0].qitemNo == "6") {
      setTest(arr3);
    } else if (test[0].qitemNo == "11") {
      setTest(arr4);
    } else if (test[0].qitemNo == "16") {
      setTest(arr5);
    } else if (test[0].qitemNo == "21") {
      setTest(arr6);
    } else if (test[0].qitemNo == "26") {
      setTest(arr7);
    } else if (test[0].qitemNo == "31") {
      setTest(arr8);
    } else if (test[0].qitemNo == "36") {
      setTest(arr9);
    } else if (test[0].qitemNo == "41") {
      setTest(arr10);
    } else if (test[0].qitemNo == "46") {
      navigate("/result");
    }
  };

  const onBack = () => {
    if (test[0].qitemNo == "6") {
      setTest(arr1);
    } else if (test[0].qitemNo == "11") {
      setTest(arr2);
    } else if (test[0].qitemNo == "16") {
      setTest(arr3);
    } else if (test[0].qitemNo == "21") {
      setTest(arr4);
    } else if (test[0].qitemNo == "26") {
      setTest(arr5);
    } else if (test[0].qitemNo == "31") {
      setTest(arr6);
    } else if (test[0].qitemNo == "36") {
      setTest(arr7);
    } else if (test[0].qitemNo == "41") {
      setTest(arr8);
    } else if (test[0].qitemNo == "46") {
      setTest(arr9);
    } else {
      navigate("/example");
    }
    setBtnColor(false);
  };

  const confirm = (value) => {
    data += value;
    setCheck(data);

    if (check === test.length) {
      setBtnColor(false);
    }
  };

  useEffect(() => {
    if (check < test.length) {
      setBtnColor(true);
    }
  });

  const progressPer = () => {
    countPer = props.pp.filter((value) => value !== null);
    let count = countPer.length;
    setProgress(count);
  };

  return (
    <>
      <h1 className={styles.testTitle} ref={viewRef}>
        검사진행
      </h1>
      <ProgressBar progress={progress} />
      <>
        {test &&
          test.map((question) => (
            <Question
              key={question.qitemNo}
              question={question}
              result={props.result}
              pp={props.pp}
              settingKey={question.qitemNo}
              progressPer={progressPer}
              confirm={confirm}
            />
          ))}
      </>
      <div className={styles.footerBox}>
        <button className={styles.backBtn} onClick={onBack}>
          이전
        </button>
        <button className={styles.normalBtn} onClick={onClick} ref={inputRef}>
          다음
        </button>
      </div>
    </>
  );
};

export default TestPage;
