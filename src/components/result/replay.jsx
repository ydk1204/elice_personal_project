import React from "react";
import { useNavigate } from "react-router";
import styles from "./result.module.css";

const Replay = (props) => {
  const navigate = useNavigate();

  const onClick = () => {
    props.reset(true);
    navigate("/login");
  };
  return (
    <>
      <button className={styles.normalBtn} onClick={onClick}>
        다시 검사하기
      </button>
    </>
  );
};

export default Replay;
