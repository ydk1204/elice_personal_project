import React, { useEffect, useState } from "react";
import styles from "./useScore.module.css";

const UserScore = (props) => {
  const [jobs1, setJobs1] = useState([]);
  const [jobs2, setJobs2] = useState([]);
  const [resId1, setResId1] = useState("");
  const [resId2, setResId2] = useState("");
  const testId = {
    "R(현실형)": "101950",
    "I(탐구형)": "101951",
    "A(예술형)": "101952",
    "S(사회형)": "101953",
    "E(진취형)": "101954",
    "C(관습형)": "101955",
  };
  const arr = props.score;

  let info = props.date;

  if (info !== null) {
    let delChar = info.indexOf("T");

    info = info.slice(0, delChar);
  }

  let rank = [];

  useEffect(() => {
    if (props.rank[1] !== undefined) {
      rank = props.rank.map((v) => v[0]);

      for (let i = 0; i < props.job.length; i++) {
        if (props.job[i].msclNo === rank[0]) {
          setJobs1(props.job[i].list);
        }
        if (props.job[i].msclNo === rank[1]) {
          setJobs2(props.job[i].list);
        }
      }
    }
    for (let key in testId) {
      if (testId[key] === rank[0]) {
        setResId1(key);
      }
      if (testId[key] === rank[1]) {
        setResId2(key);
      }
    }
  });

  return (
    // <></>
    <div>
      <div className={styles.tbContainer}>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>성별</th>
              <th>검사일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.users.name}</td>
              <td>{props.users.gender === "100323" ? "남" : "여"}</td>
              <td>{info}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.mTitle}>
        <div className={styles.title}>
          <p>&nbsp; 1. 나의 흥미유형 탐색 결과</p>
        </div>
      </div>
      <div className={styles.chartBox}>
        <div className={styles.chart}>
          <div className={styles.graph} style={{ height: `${arr[0]}%` }}>
            {arr[0]}
          </div>
          <div className={styles.graph} style={{ height: `${arr[1]}%` }}>
            {arr[1]}
          </div>
          <div className={styles.graph} style={{ height: `${arr[2]}%` }}>
            {arr[2]}
          </div>
          <div className={styles.graph} style={{ height: `${arr[3]}%` }}>
            {arr[3]}
          </div>
          <div className={styles.graph} style={{ height: `${arr[4]}%` }}>
            {arr[4]}
          </div>
          <div className={styles.graph} style={{ height: `${arr[5]}%` }}>
            {arr[5]}
          </div>
        </div>
      </div>

      <div className={styles.tbContainer}>
        <table>
          <thead>
            <tr>
              <th>R(현실형)</th>
              <th>I(탐구형)</th>
              <th>A(예술형)</th>
              <th>S(사회형)</th>
              <th>E(진취형)</th>
              <th>C(관습형)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.isArray(arr) &&
                arr.map((value) => {
                  return <td key={arr.indexOf(value)}>{value}</td>;
                })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.mTitle}>
        <div className={styles.title}>
          <p>&nbsp; 2. 나의 주요 흥미유형과 관련된 추천 직업</p>
        </div>
      </div>

      <div>
        <div className={styles.recomBox}>
          <div className={styles.jobClass}>
            <p>{resId1}</p>
          </div>
          <div className={styles.jobTitle}>
            <p className={styles.recomJob}>추천직업</p>
          </div>
          <div className={styles.jobContainer}>
            <ul className={styles.job}>
              {jobs1.map((value) => {
                return (
                  <li className={styles.jobs}>
                    <a
                      href={`https://www.career.go.kr/jr/juniorjob/view?seq=${value.juniorSeq}`}
                      target="_blank"
                    >
                      <span key={value.juniorSeq}>{value.jobNm}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.recomBox}>
          <div className={styles.jobClass}>
            <p>{resId2}</p>
          </div>
          <div className={styles.jobTitle}>
            <p className={styles.recomJob}>추천직업</p>
          </div>
          <div className={styles.jobContainer}>
            <ul className={styles.job}>
              {jobs2.map((value) => {
                return (
                  <li className={styles.jobs}>
                    <a
                      href={`https://www.career.go.kr/jr/juniorjob/view?seq=${value.juniorSeq}`}
                      target="_blank"
                    >
                      <span key={value.juniorSeq}>{value.jobNm}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserScore;
