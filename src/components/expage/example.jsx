import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./example.module.css";
import ProgressBar from "../page/progressBar";

const Example = (props) => {
  const [test, setTest] = useState("");

  const [btnPass, setBtnPass] = useState(true);
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (props.exam === "2") {
      setSelected(true);
    } else if (props.exam === "1") {
      setSelected(false);
    }

    if (props.exdata === 1) {
      setBtnPass(false);
    } else {
      setBtnPass(true);
    }
  });

  const onChangeRadio = (event) => {
    const genderValue = event.target.value;
    props.exp(genderValue);
    setTest(genderValue);
  };

  return (
    <>
      <h1 className={styles.exampleTitle}>검사예시</h1>
      <ProgressBar progress={0} />
      <h4 className={styles.subTitle}>
        직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.
        <br />
        가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.
      </h4>
      <ul className={styles.selectBox}>
        <p className={styles.ask}>나는 코딩 공부보다 게임하는게 더 좋다</p>
        <div className={styles.radios}>
          <label>
            <input
              type="radio"
              name="test"
              value="1"
              {...(selected === false ? { checked: true } : {})}
              onChange={onChangeRadio}
            />
            그렇지 않다
          </label>
          <label>
            <input
              type="radio"
              name="test"
              value="2"
              {...(selected === true ? { checked: true } : {})}
              onChange={onChangeRadio}
            />
            그렇다
          </label>
        </div>
      </ul>
      <button
        className={btnPass ? styles.nextBtn : styles.normalBtn}
        onClick={() => {
          navigate("/test");
        }}
      >
        검사시작
      </button>
    </>
  );
};
export default Example;
