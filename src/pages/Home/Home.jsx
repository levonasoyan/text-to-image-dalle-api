import axios from "axios";
import { useState } from "react";
import "./Home.scss";
import { SyncLoader } from "react-spinners";

const Home = () => {
  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const handleRequest = async () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 5000);
    const { data } = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: `${text}`,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    setImg(data.data[0].url);
  };
  return (
    <>
      <div className="home_wrapper">
        <div className="flex_center">
          <h1 className="header">Text To Image </h1>
        </div>
        <div className="flex_center" style={{ marginTop: "150px" }}>
          <input
            type="text"
            className="textinput"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="searchbtn" onClick={() => handleRequest()}>
            Search
          </button>
        </div>
        <div className="flex_center">
          <img src={img} alt="" />
        </div>
        {sent ? (
          <div className="flex_center" style={{ marginTop: "100px" }}>
            <SyncLoader color="#36d7b7" />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Home;
