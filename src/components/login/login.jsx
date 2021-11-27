import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./login.module.css";

const Login = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [nameChecked, setNameChecked] = useState(false);
  const [genderChecked, setGenderChecked] = useState(false);
  const [btnPass, setBtnPass] = useState(true);
  const [namePass, setNamePass] = useState(false);
  let namePattern = /^[가-힣]{2,4}$/;

  const inputRef = useRef();
  const navigate = useNavigate();

  let nameValue;
  let genderValue;

  const handleInput = (event) => {
    nameValue = inputRef.current.value;
    if (namePattern.test(nameValue) === true) {
      setNameChecked(true);
      setNamePass(true);
    } else {
      setNameChecked(false);
      setNamePass(false);
    }
    setName(nameValue);
  };

  const onChangeRadio = (event) => {
    genderValue = event.target.value;
    setGender(genderValue);
  };

  useEffect(() => {
    if (gender === "" && name !== "") {
      setGenderChecked(false);
    } else if (gender === "" && name === "") {
      setGenderChecked(true);
    } else {
      setGenderChecked(true);
    }
  }, [gender, name]);

  useEffect(() => {
    if (name === "") {
      setNameChecked(true);
    }
  }, [name]);

  useEffect(() => {
    if (namePass === true && gender !== "") {
      setBtnPass(false);
    } else {
      setBtnPass(true);
    }
  }, [namePass, gender, nameChecked, genderChecked]);

  const onClick = () => {
    if (nameChecked === true && genderChecked === true) {
      props.user(name, gender);
      navigate("/example");
    }
  };
  return (
    <>
      <h1 className={styles.loginTitle}>직업심리검사</h1>
      <div className={styles.inputContainer}>
        <p>이름</p>
      </div>
      <input
        type="text"
        onChange={handleInput}
        ref={inputRef}
        value={name}
        placeholder="이름을 입력해주세요."
      ></input>
      <p className={nameChecked ? styles.namePass : styles.nameMessage}>
        한글 2~4자 이내로 입력해주세요.
      </p>
      <div className={styles.inputContainer}>
        <p>성별</p>
      </div>
      <div className={styles.genderContainer}>
        <label>
          <input
            type="radio"
            name="gender"
            value="100323"
            onChange={onChangeRadio}
          />
          남성
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="100324"
            onChange={onChangeRadio}
          />
          여성
        </label>
        <p className={genderChecked ? styles.genderPass : styles.genderMessage}>
          성별을 선택해주세요.
        </p>
      </div>
      <button
        className={btnPass ? styles.nextBtn : styles.normalBtn}
        onClick={onClick}
      >
        검사시작
      </button>
    </>
  );
};
export default Login;
