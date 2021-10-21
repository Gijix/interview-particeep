import styles from "./MovieList.module.css";
import likePic from "../images/like.png";
import dislikePic from "../images/dislike.png";
import { useState } from "react";

export default function Movie({ remove, movieInfos }) {
  const [likes, setLikes] = useState(movieInfos.likes);
  const [dislikes, setDislikes] = useState(movieInfos.dislikes);
  function clicked(option) {
    if (option === "likes") {
      return likes === movieInfos[option];
    } else return dislikes === movieInfos[option];
  }
  function like() {
    dislikes !== movieInfos.dislikes && setDislikes((prev) => prev - 1);
    setLikes((prev) => prev + (likes === movieInfos.likes ? 1 : -1));
  }
  function dislike() {
    likes !== movieInfos.likes && setLikes((prev) => prev - 1);
    setDislikes((prev) => prev + (dislikes === movieInfos.dislikes ? 1 : -1));
  }
  function ratio(num) {
    return (num * 100) / (dislikes + likes);
  }
  return (
    <div className={styles.movie}>
      <h2>{movieInfos.title}</h2>
      <div>{movieInfos.category}</div>
      <div className={styles.ratio}>
        <img
          onClick={like}
          className={!clicked("likes") ? styles.clicked : ""}
          alt="like"
          src={likePic}
        />
        <p>{likes}</p>
        <img
          onClick={dislike}
          className={!clicked("dislikes") ? styles.clicked : ""}
          alt="dislike"
          src={dislikePic}
        />
        <p>{dislikes}</p>
      </div>
      <div className={styles.jauge}>
        <div
          style={{
            width: `${ratio(likes)}%`,
            marginLeft: "0px",
            backgroundColor: "rgb(70, 67, 67)",
          }}
        ></div>
        <div
          style={{
            width: `${ratio(dislikes)}%`,
            marginLeft: "0px",
            backgroundColor: "rgb(129, 124, 124)",
          }}
        ></div>
      </div>
      <button className={styles.button} onClick={remove}>
        delete
      </button>
    </div>
  );
}
