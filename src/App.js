import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./components/login/login";
import Example from "./components/expage/example";
import TestPage from "./components/page/testPage";
import Result from "./components/result/result";
import Question from "./components/question/question";
import ProgressBar from "./components/page/progressBar";

function App() {
  const apiKey = process.env.REACT_APP_TEST_API_KEY;
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [exam, setExam] = useState("");
  const [exData, setExData] = useState(0);
  const [user, setUser] = useState({});
  const [reset, setReset] = useState(false);

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "KHANUSER=x2oaif0mgo88c2");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://www.career.go.kr/inspct/openapi/test/questions?q=19&apikey=${apiKey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((item) => setQuestions(item.RESULT))
      .catch((error) => console.log("error", error));
  }, []);

  const score = (text) => {
    const result = Object.assign(answer, text);
    setAnswer(result);
  };

  const exp = (val) => {
    const result = val;
    if (result !== null) {
      setExData(1);
    } else {
      setExData(0);
    }
    setExam(result);
  };

  const users = (name, gender) => {
    const userId = { name: name, gender: gender };
    setUser(userId);
  };

  const resetLog = (emp) => {
    setReset(emp);
    setAnswer([]);
    setExam("");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login user={users} />} />
        <Route path="/login" element={<Login user={users} />} />
        <Route
          path="/example"
          element={<Example exp={exp} exam={exam} exdata={exData} />}
        />
        <Route
          path="/test"
          element={
            <TestPage questions={questions} result={score} pp={answer} />
          }
        />
        <Route
          path="/result"
          element={<Result users={user} result={answer} reset={resetLog} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
