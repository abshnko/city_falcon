import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Filters.module.scss";
import { getAll } from "../../../api/apiCalls";

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
      name: "Order",
      options: [
        { value: "top", label: "Top Rated" },
        { value: "latest", label: "Latest" },
        { value: "retweeted", label: "Popular" },
        { value: "read", label: "Most read" },
      ],
    },

    {
      name: "Languages",
      options: [
        { value: "all", label: "Select/Unselect All" },
        { value: "en", label: "English" },
        { value: "de", label: "German" },
        { value: "zh", label: "Chinese" },
        { value: "it", label: "Italian" },
      ],
    },
  ];

  const [autorefresh, setAutorefresh] = useState(600);
  const [order, setOrder] = useState("top");
  const [languages, setLanguages] = useState(["en"]);

  const [selectedAutoRefresh, setSelectedAutoRefresh] = useState("1 min");
  const [selectedLanguages, setSelectedLanguages] = useState(["All Languages"]);
  const [selectedOrder, setSelectedOrder] = useState("Top Rated");
  const [filterOpenRefresh, setFilterOpenRefresh] = useState(false);
  const [filterOpenOrder, setFilterOpenOrder] = useState(false);
  const [filterOpenLang, setFilterOpenLang] = useState(false);
  const [, setRefresh] = useState(0);
  const forceUpdate = () => {
    setRefresh((state) => state + 1);
  };
  const [time, setTime] = useState<any>();

  //   const dropDown: any = document.querySelector(`.${styles.dropDown}`);
  //   document.addEventListener("mousedown", (event) => {
  //     if (dropDown?.contains(event.target)) {
  //       //   setFilterOpenLang(false);
  //       //   setFilterOpenOrder(false);
  //       //   setFilterOpenRefresh(false);
  //       console.log("CONTAINS");
  //     } else {
  //       setFilterOpenLang(false);
  //       console.log(`.${styles.dropDown}`);
  //       setFilterOpenOrder(false);
  //       setFilterOpenRefresh(false);
  //     }
  //   });

  const onReset = () => {
    setSelectedAutoRefresh("1 min");
    setSelectedLanguages(["All Languages"]);
    setSelectedOrder("Top Rated");
    setAutorefresh(600);
    setOrder("top");
    setLanguages(["en"]);
  };

  useEffect(() => {
    setTime(
      setInterval(() => {
        getAll(languages, order)
          .then((res) => {
            setStories(res.data.stories);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }, autorefresh * 1000)
    );
  }, [autorefresh]);

  useEffect(() => {
    return clearTimeout(time);
  }, [autorefresh]);

  useEffect(() => {
    getAll(languages, order)
      .then((res) => {
        setStories(res.data.stories);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [order, languages]);

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
                    <div key={option.value}>
                      <input
                        type="radio"
                        value={option.value}
                        className={styles.option}
                        name="name"
                        onChange={(e) => setAutorefresh(parseInt(option.value))}
                      ></input>
                      {option.label}
                    </div>
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
          <button
            className={styles.openFilterBtn}
            onClick={() => {
              setFilterOpenOrder(!filterOpenOrder);
              forceUpdate();
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {filterOpenOrder && (
            <div className={styles.dropDown}>
              <div className={styles.options}>
                {filters[1].options?.map((option) => {
                  return (
                    <div key={option.value}>
                      <input
                        type="radio"
                        value={option.value}
                        className={styles.option}
                        name="name"
                        onChange={(e) => {
                          setOrder(option.value);
                          setSelectedOrder(option.label);
                        }}
                      ></input>
                      {option.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className={styles.filter}>
          <div className={styles.filterContent}>
            <div className={styles.filterValue}>
              {selectedLanguages.map((lang) => {
                if (
                  selectedLanguages.length === 1 &&
                  lang === "All Languages"
                ) {
                  return lang;
                } else if (lang !== "All Languages") {
                  return `${lang}, `;
                } else {
                  return null;
                }
              })}
            </div>
            <div className={styles.filterName}>Languages</div>
          </div>
          <button
            className={styles.openFilterBtn}
            onClick={() => {
              setFilterOpenLang(!filterOpenLang);
              forceUpdate();
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {filterOpenLang && (
            <div className={styles.dropDown}>
              <div className={styles.options}>
                {filters[2].options?.map((option) => {
                  return (
                    <div key={option.value}>
                      <input
                        type="checkbox"
                        value={option.value}
                        className={styles.option}
                        name="name"
                        onChange={(e) => {
                          if (!selectedLanguages.includes(option.label)) {
                            setSelectedLanguages([
                              ...selectedLanguages,
                              option.label,
                            ]);
                          }
                          if (option.value === "all") {
                            setSelectedLanguages(["All Languages"]);
                          }
                        }}
                      ></input>
                      {option.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button className={styles.reset} onClick={onReset}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default Filters;
