import React, { useState } from "react";
import styles from "./Story.module.scss";
import { IStory } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface StoryProps {
  story: IStory;
}

const Story = ({ story }: StoryProps) => {
  const [showMore, setShowMore] = useState(false);
  const date = new Date(story.publishTime);
  const d = `${date.getDay()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  const onShowMore = () => setShowMore(!showMore);
  return (
    <div className={styles.story}>
      <div className={styles.image}>
        <img src={story.imageUrls[0]} alt="story-img" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{story.title}</div>
        {showMore && <div className={styles.extra}>{story.description}</div>}
        <div className={styles.meta}>
          <div className={styles.icons}>
            {story.category === "op" ||
            story.category === "mp" ||
            story.category === "r" ? (
              <img
                src={story.domain_cached_logo_url}
                className={styles.domainLogo}
                alt="domain_logo"
              />
            ) : (
              // do twitter logos
              <>
                <img src={story.domain_cached_logo_url} alt="person" />
                <img src={story.domain_cached_logo_url} alt="twitter_logo" />
              </>
            )}
          </div>
          <div className={styles.source}>{story.domain_name}</div>
          <div className={styles.timestamp}>{d}</div>
        </div>
      </div>
      <div className={styles.scoreContainer}>
        <div
          className={`
          ${
            story.score < 20
              ? styles.scoreRed
              : story.score >= 20 && story.score < 39
              ? styles.scoreYellow
              : styles.scoreGreen
          } ${styles.score}`}
        >
          {story.score}%
        </div>
      </div>
      <button className={styles.moreButton} onClick={onShowMore}>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
};

export default Story;
