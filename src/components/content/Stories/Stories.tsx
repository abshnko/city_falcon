import React from "react";
import Story from "../Story/Story";
import styles from "./Stories.module.scss";
import { StoriesProps } from "../../../types";

// interface IStory {
//   imageUrls: string[];
// }

// interface StoriesProps {
//   stories: IStory[];
// }

const Stories = ({ stories }: StoriesProps) => {
  return (
    <div className={styles.stories}>
      {stories.map((story) => {
        return <Story key={story.publishTime} story={story} />;
      })}
    </div>
  );
};

export default Stories;
