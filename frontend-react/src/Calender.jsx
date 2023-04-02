import { useEffect, useMemo, useState } from "react";
import { getMonths, isToday } from "./lib/utils";
import Api from "./Api";

let weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let today = new Date();
today.year = today.getFullYear();
today.month = today.getMonth();
today.date = today.getDate();
today.day = today.getDay();

let appState = {};

export default function Calender() {
  const [date, setDate] = useState(new Date());
  const [months, setMonths] = useState([]);
  const [days, setDays] = useState(0);

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const [monthsView, setMonthView] = useState([]);
  const [weekCols, setWeekCols] = useState([]);
  const [daysCols, setDaysCols] = useState([]);

  const [data, setData] = useState({
    uid: "",
    data: [],
  });

  useEffect(() => {
    initiate();
    fetchData();
  }, []);

  const fetchData = () => {
    let uid = "cec926f6-9aef-4559-af2a-b0edc4ec826e"
    Api.post("/calender/"+uid, { "01-02-2000": ["sasas", "sasas"] }).then(
      ({ data }) => console.log(data)
    );
  };
  const initiate = () => {
    setCalender();
  };

  const updateYear = (byNum) => {
    date.setFullYear(date.getFullYear() + byNum);
    setDate(date);
    setCalender();
  };

  const setCalender = () => {
    let mnts = getMonths(date);
    let mv = getMonthView(mnts);
    setMonths(mv);
    mv = updateMonthView({ months: mv });
    setMonthView(mv);
  };

  const hMonthChange = (mnthNum) => {
    date.setMonth(mnthNum);
    changeDate(date);
    updateMonthView({ date });
  };

  const getMonthView = (mnths) => {
    let arr = [];
    mnths = mnths || months;
    if (mnths.length) {
      // console.log("Calculating");
      for (let index = 0; index < mnths.length; index++) {
        const obj = mnths[index];
        const firstDay = obj.firstDay;

        if (arr[firstDay]) {
          arr[firstDay].push(obj);
        } else {
          arr[firstDay] = [obj];
        }
      }
      let sun = arr.shift();
      arr.push(sun);
    }
    return arr;
  };

  const updateWeekDays = (selectedDate) => {
    let selected = getDateObj(selectedDate);
    let { weekColm, dayColm } = appState;

    let weekcols = [...Array(7)].map((_, i) => {
      return {
        current: weekColm == i,
        cols: [...Array(7)].map((_, j) => {
          return {
            sunday: (i + j + 1) % 7 == 0,
            selected: weekColm == i && (i + j + 1) % 7 == selected.day,
            current:
              weekColm == i &&
              (i + j + 1) % 7 == today.day &&
              selected.year == today.year &&
              today.month == selected.month,
            weekday: weeks[(i + j + 1) % 7],
          };
        }),
      };
    });
    setWeekCols(weekcols);

    // setDays(dayColm);
    let dayscols = [...Array(dayColm)].map((_, i) => {
      return {
        current: isToday({
          year: selected.year,
          day: i + 1,
          month: selected.month,
        }),
        color:
          (i + 1 > 28 && color[i + 1]) ||
          (i + 1 > 27 && days == 28 ? color[29] : ""),
        selected: selected.date == i + 1,
        hasData: i == 9,
      };
    });
    console.log({ dayscols });
    setDaysCols(dayscols);
  };
  const updateMonthView = ({ months: mnths, date: selectedDate } = {}) => {
    mnths = mnths || months;
    selectedDate = selectedDate || date;
    if (mnths.length) {
      let weekColm = 0,
        dayColm = 0;

      let selected = getDateObj(selectedDate);

      mnths.map((cols, i) => {
        cols.map((mnth) => {
          if (mnth.month == today.month && selected.year == today.year) {
            mnth.current = true;
          }
          if (mnth.month == selected.month) {
            mnth.selected = true;
            weekColm = i;
            dayColm = mnth.days;
          }
        });
      });

      appState = { ...appState, weekColm, dayColm };
      updateWeekDays(selectedDate);

      return mnths;
    }
  };
  const hDayChange = (newDay) => {
    date.setDate(newDay);
    changeDate(date);
    // updateMonthView();
    // updateMonthView({ date: newDay });
    updateWeekDays(date);
  };
  const changeDate = (newDate) => {
    let date = new Date(newDate);
    setDate(date);
  };
  // const monthsView = useMemo(getMonthView, [months, year]);
  // console.log({ monthsView });
  const color = {
    31: "text-cyan-400",
    30: "text-purple-400",
    29: "text-yellow-400",
    28: "text-yellow-400",
    // 28: "text-yellow-300",
  };

  const getDateObj = (date) => {
    let selected = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay(),
    };
    return selected;
  };
  return (
    <div className="calender">
      <div className="box flex h-screen w-screen">
        <div className="leftBox w-2/6 md:w-1/4 border-r">
          <div className="topBox h-1/4 flex flex-col justify-center items-center text-center ">
            <h1 className="text-2xl font-semibold">Calender</h1>
            <div className="year text-2xl sm:text-4xl my-4 pb-3 flex w-full justify-between items-center">
              <button
                className="group outline-none"
                onClick={() => updateYear(-1)}
              >
                {/* ◂ */}
                <Arrow className="h-10 w-10 hover:border rounded-full border-white/25 rotate-180 group-focus:border" />
              </button>
              {year}
              <button
                className="group outline-none"
                onClick={() => updateYear(1)}
              >
                {/* ▸ */}
                <Arrow className="h-10 w-10 hover:border rounded-full border-white/25 group-focus:border" />
              </button>
            </div>
          </div>
          <div className="days bottomBox h-3/4 flex flex-wrap justify-top items-center flex-col border-t gap-x-1 gap-y-2">
            {daysCols.map((dayObj, i) => (
              <span
                key={i}
                className={
                  dayObj.color +
                  (dayObj.current ? " border-white/25 " : "") +
                  (dayObj.selected ? " border-yellow-400 " : "") +
                  " relative btn flex justify-center items-center h-[12%] w-[18%] hover:shadow-md border rounded border-white/0 hover:border-yellow-400/80 transition duration-100 cursor-pointer"
                }
                onClick={() => hDayChange(i + 1)}
              >
                {i + 1}
                {dayObj.hasData ? (
                  <span className="absolute bottom-4 inset-x bg-yellow-400 h-1 w-5 rounded-full"></span>
                ) : null}
              </span>
            ))}
            {/* {[...Array(days)].map((_, i) => (
              <span
                key={i}
                className={
                  ((i + 1 > 28 && color[i + 1]) ||
                    (i + 1 > 27 && days == 28 ? color[29] : "")) +
                  (isToday({ year, day: i + 1, month })
                    ? " border-white/25 "
                    : "") +
                  (day == i + 1 ? " border-yellow-400 " : "") +
                  " btn flex justify-center items-center h-[12%] w-[18%] hover:shadow-md border rounded border-white/0 hover:border-yellow-400/80 transition duration-100 cursor-pointer"
                }
                onClick={() => hDayChange(i + 1)}
              >
                {i + 1}
              </span>
            ))} */}
          </div>
        </div>
        <div className="rightBox w-4/6 md:w-3/4">
          <div className="months topBox h-1/4 grid grid-cols-7 gap-4">
            {monthsView.map((mnths, k) => (
              <div key={k} className="grid grid-rows-3">
                {mnths.map((mnth, i) => (
                  <span
                    key={i}
                    className={
                      (mnth.current ? " shadow-xl border-white/25 " : "  ") +
                      (month == mnth.month
                        ? " border-yellow-400 "
                        : " hover:border-yellow-400/80 ") +
                      color[mnth.days] +
                      " btn flex justify-center uppercase items-center hover:shadow-lg border rounded border-white/0 cursor-pointer"
                    }
                    onClick={() => hMonthChange(mnth.month)}
                  >
                    {mnth.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="bottomBox weekdays h-3/4 border-t grid grid-cols-7 gap-4">
            {weekCols.map((xcols, i) => (
              <span
                key={i}
                className={
                  (xcols.current ? "shadow-2xl " : "") +
                  " btn flex flex-col justify-evenly uppercase items-center hover:shadow-lg border rounded border-white/0 cursor-pointer"
                }
              >
                {xcols.cols.map((ycols, j) => (
                  <div
                    key={j}
                    className={
                      (ycols.sunday ? "text-red-400 " : "  ") +
                      (ycols.selected
                        ? "  border-yellow-400/100 "
                        : "  hover:border-yellow-400/80 ") +
                      (ycols.current
                        ? "  border-white/25 "
                        : " border-yellow-400/0 ") +
                      "w-full text-center py-2 rounded border "
                    }
                  >
                    {ycols.weekday}
                  </div>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Arrow = (props) => (
  <svg
    className="h-6 w-6"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m10 17 5-5-5-5v10z" fill="currentColor"></path>
  </svg>
);
