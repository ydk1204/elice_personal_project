import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Ment from "./ment";
import Replay from "./replay";
import UserScore from "./userScore";
import styles from "./result.module.css";

const Result = (props) => {
  const apiKey = process.env.REACT_APP_TEST_API_KEY;

  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [score, setScore] = useState("");
  const [job, setJob] = useState("");
  const [array, setArray] = useState([]);
  const [resId, setResId] = useState([]);
  const [resUser, setResUser] = useState({});
  const [useData, setUserData] = useState({});
  const [useDate, setUseDate] = useState("");

  const [block, setBlock] = useState(true);

  const [result, setResult] = useState([]);

  const navigate = useNavigate();
  let arr = [];
  let obj = props.result;
  let res = [];
  for (let i = 1; i < obj.length; i++) {
    let val = Object.values(obj[i])[0];
    arr.push(i + "=" + val + " ");
  }
  res = arr.join("");

  useEffect(() => {
    const name =
      Object.keys(props.users)[0] === "name"
        ? Object.values(props.users)[0]
        : false;

    const gender =
      Object.keys(props.users)[1] === "gender"
        ? Object.values(props.users)[1]
        : false;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "KHANUSER=x2oaif0mgo88c2");

    let raw = JSON.stringify({
      apikey: "d6f3d4bf1ef57c0489ae941a704165e8",
      qestrnSeq: "19",
      trgetSe: "100205",
      name: `${name}`,
      gender: `${gender}`,
      grade: "1",
      startDtm: 1550466291034,
      answers: `${res}`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://www.career.go.kr/inspct/openapi/test/report?apikey=${apiKey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setUrl(result.RESULT.url))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    let pass = url.replace(
      "https://www.career.go.kr/inspct/web/psycho/elementary/report?seq=",
      ""
    );
    setCustom(pass);
  }, [url]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "KHANUSER=x2oaif0mgo88c2");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://www.career.go.kr/inspct/api/psycho/report?seq=${custom}&apikey=${apiKey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setResUser(result))
      .catch((error) => console.log("error", error));
  }, [custom]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "KHANUSER=x2oaif0mgo88c2");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://www.career.go.kr/inspct/api/psycho/interest/elementary/juniors?apikey=${apiKey}`,
      requestOptions
    )
      .then((response) => response.json())
      // .then((result) => console.log("2"))
      .then((result) => setJob(result))
      .catch((error) => console.log("error", error));
  }, [score]);

  useEffect(() => {
    let data = Object.values(resUser)[2];

    setUserData(data);
  }, [resUser]);

  useEffect(() => {
    for (let key in useData) {
      if (key === "tScore") {
        setScore(useData[key]);
      }
      if (key === "endDtm") {
        setUseDate(useData[key]);
      }
    }
  }, [useData]);

  useEffect(() => {
    const arr = score.split(" ");
    const str = arr.map((res) => res.split("="));
    setArray(str);
    let point = [];

    for (let i = 0; i < str.length; i++) {
      if (str[i][1] !== undefined) {
        point.push(Math.floor(str[i][1]));
      }
    }

    setResult(point);
  }, [score]);

  useEffect(() => {
    let jobs = [];
    let result = array;
    let rank = result.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < 2; i++) {
      jobs.push(rank[i]);
      setResId(jobs);
    }
  }, [array]);

  const onClick = () => {
    setBlock(false);
  };

  return (
    <>
      <div className={styles.resultTitle}>
        <h1 className={styles.resultHeader}>직업가치관검사 결과표</h1>
      </div>
      {block === true && <Ment rank={resId} />}
      {block !== true && (
        <UserScore
          user={resUser}
          date={useDate}
          users={props.users}
          score={result}
          job={job}
          rank={resId}
        />
      )}

      <div className={styles.footerBox}>
        {block === true && (
          <button className={styles.normalBtn} onClick={onClick}>
            결과 보기
          </button>
        )}
        {block !== true && (
          <Replay result={url} reset={props.reset} block={block} />
        )}
      </div>
    </>
  );
};

export default Result;
