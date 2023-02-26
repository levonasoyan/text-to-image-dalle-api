import axios from "axios";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { Button, TextField } from "@mui/material";
import Header from "../../components/Header/Header";
import "./Home.scss";

const Home = () => {
  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const handleRequest = async () => {
    setImg("");
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 6000);
    const { data } = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: `${text}`,
        n: 1,
        size: "512x512",
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
        <Header />
        <div className="flex_center" style={{ marginTop: "150px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Image Description Here"
            onChange={(e) => setText(e.target.value)}
            sx={{
              "& label.Mui-focused": {
                color: "#008080",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#008080",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#008080",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#008080",
                },
              },
              input: {
                color: "#008080",
                outline: "none",
              },
              width: "400px",
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#008080",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#004c4c",
                transition: "0.2s",
              },
              height: "50px",
              marginLeft: "10px",
            }}
            onClick={() => handleRequest()}
          >
            Generate Image
          </Button>
        </div>
        <div className="flex_center" style={{ marginTop: "100px" }}>
          <img src={img} alt="" />
        </div>
        {sent ? (
          <div className="flex_center" style={{ marginTop: "100px" }}>
            <SyncLoader color="#008080" />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Home;
