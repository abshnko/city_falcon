import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Filters.module.scss";
import axios from "axios";

interface FiltersProps {
  setStories: any;
  setIsLoading: any;
}

const Filters = ({ setStories, setIsLoading }: FiltersProps) => {
  const filters = [
    {
      name: "Autorefresh",
      options: [
        { value: "10", label: "10 sec" },
        { value: "30", label: "30 sec" },
        { value: "60", label: "1 min" },
        { value: "600", label: "10 min" },
      ],
    },
    {
      name: "Languages",
      options: [
        { value: "en", label: "English" },
        { value: "de", label: "German" },
        { value: "zh", label: "Chinese" },
        { value: "it", label: "Italian" },
      ],
    },
    { name: "Order", values: ["top", "latest", "retweeted", "read"] },
  ];
  const [selectedFilters, setSelectedFilters] = useState([
    { name: "Autorefresh", selectedValue: "1 min", active: false },
    { name: "Order", selectedValue: "Top Rated", active: false },
    { name: "Languages", selectedValue: "All Languages", active: false },
  ]);

  const [autorefresh, setAutorefresh] = useState(600);
  const [selectedAutoRefresh, setSelectedAutoRefresh] = useState("1 min");
  const [selectedLanguages, setSelectedLanguages] = useState("All Languages");
  const [selectedOrder, setSelectedOrder] = useState("Top Rated");
  const [filterOpenRefresh, setFilterOpenRefresh] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [, setRefresh] = useState(0);
  const forceUpdate = () => {
    setRefresh((state) => state + 1);
  };
  const [options, setOptions] = useState<any>();
  const [time, setTime] = useState<any>();

  useEffect(() => {
    setTime(
      setInterval(() => {
        axios
          .get("https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories")
          .then((res) => {
            console.log(res.data);
            setStories(res.data.stories);
            setIsLoading(false);
          });
      }, autorefresh * 1000)
    );
  }, [autorefresh]);

  useEffect(() => {
    return clearTimeout(time);
  }, [autorefresh]);

  return (
    <div>
      {/* <svg className="path"></svg> */}

      <div className={styles.filters}>
        <div className={styles.filter}>
          <div className={styles.filterContent}>
            <div className={styles.filterValue}>{selectedAutoRefresh}</div>
            <div className={styles.filterName}>Autorefresh</div>
          </div>
          <button
            className={styles.openFilterBtn}
            onClick={() => {
              setFilterOpenRefresh(!filterOpenRefresh);
              forceUpdate();
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {filterOpenRefresh && (
            <div className={styles.dropDown}>
              <div className={styles.options}>
                {filters[0].options?.map((option) => {
                  return (
                    <>
                      <input
                        type="radio"
                        value={option.value}
                        className={styles.option}
                        name="name"
                        onChange={(e) => setAutorefresh(parseInt(option.value))}
                      ></input>
                      {option.label}
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className={styles.filter}>
          <div className={styles.filterContent}>
            <div className={styles.filterValue}>{selectedOrder}</div>
            <div className={styles.filterName}>Order</div>
          </div>
          <button className={styles.openFilterBtn}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterContent}>
            <div className={styles.filterValue}>{selectedLanguages}</div>
            <div className={styles.filterName}>Languages</div>
          </div>
          <button className={styles.openFilterBtn}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>

        <button className={styles.reset}>RESET</button>
      </div>
    </div>
  );
};

export default Filters;
