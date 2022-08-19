import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";

export const TimerComponent = () => {
  const { activeTask, activeTaskFull, finishTask } = useContext(GlobalContext);

  // Independent states
  const [timerState, setTimerState] = useState<"focus" | "break">("focus");
  const [minutes, setMinutes] = useState(timerState === "focus" ? 25 : 5);
  const [seconds, setSeconds] = useState(0);
  const [pauseState, setPauseState] = useState<boolean>(true);
  const [sessionCount, setSessionCount] = useState(1);
  const [totalTime, setTotalTime] = useState(0);
  const [localDone, setLocalDone] = useState<boolean>(false);

  // Toast notifiers

  // Add Task toasts
  const notifyMarkAsDoneSuccess = () =>
    toast.info("Successfully marked as done!");
  const notifyOnePomodoroCycle = () =>
    toast.info(`Session ${sessionCount} done! Congratulations!`);

  // Use effect for updating the timer
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (!pauseState) {
        if (seconds > 0) {
          setTotalTime(totalTime + 1);
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            //If timerState == break, 1 cycle is done.
            //Do something here to update session statistics
            setSessionCount(sessionCount + 1);
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    hardReset();
  }, [activeTask]);

  // Timer manipulation function

  // Reset the timer to its initial minutes and seconds.
  const reset = () => {
    setPauseState(true);
    setMinutes(timerState === "focus" ? 25 : 5);
    setSeconds(0);
  };

  // Resets all the time states
  // Pauses the timer and resets to its initial minutes and seconds. Also resets the total time spent and session count in the active task.
  const hardReset = () => {
    setPauseState(true);
    setTimerState("focus");
    setMinutes(25);
    setSeconds(0);
    setTotalTime(0);
    setSessionCount(1);
    setLocalDone(false);
  };

  // Pause the timer
  const pause = () => {
    setPauseState(!pauseState);
  };

  // Skip timer state within focus and break
  const skip = () => {
    if (timerState === "break") {
      setSessionCount(sessionCount + 1);
    }
    if (!pauseState) pause();
    if (timerState === "break") notifyOnePomodoroCycle();
    setTimerState(timerState === "focus" ? "break" : "focus");
    setMinutes(timerState === "break" ? 25 : 5);
    setSeconds(0);
  };

  // Generates the progress blocks that bounces in the UI.
  const generateProgressSpinners = () => {
    let spinners = [];
    let floor;

    // Check timer state, to adjust the styles of the squares.
    if (timerState === "focus") {
      floor = Math.floor(5 - Math.ceil(minutes / 5));
    } else {
      floor = Math.floor(5 - (minutes + Math.ceil(seconds / 60)));
    }

    // Render green squares
    for (var i = 0; i < floor; i++) {
      spinners.push(
        <div className="border-2 h-10 w-10 border-green-800 bg-green-500 animate-pulse">
          &nbsp;
        </div>
      );
    }

    // Render blue loading squares.
    for (var ceil_extender = floor; ceil_extender < 5; ceil_extender++) {
      if (ceil_extender === floor) {
        spinners.push(
          <div
            className={`border-2 h-10 w-10 ${
              pauseState
                ? `border-blue-800 bg-blue-500`
                : `border-green-800 bg-green-500`
            } animate-bounce-pulse`}
          >
            &nbsp;
          </div>
        );
      } else {
        spinners.push(
          <div className="border-2 h-10 w-10 border-blue-800 bg-blue-500 animate-bounce-pulse">
            &nbsp;
          </div>
        );
      }
    }

    return (
      <div
        id="timer_progress_indicator"
        className="flex flex-row justify-evenly space-x-7 loader"
      >
        {spinners.map((spinner, index) => {
          return spinner;
        })}
      </div>
    );
  };

  // Handler of the Mark as Done functionality. This resets the timer state, and sets the current task as done.
  // Calls the API server to update the task status.
  const handleFinishTask = () => {
    if (activeTask) {
      finishTask(activeTask, {
        id: activeTask,
        total_time_elapsed: totalTime,
        number_of_sessions: sessionCount,
        is_done: true,
      });
      notifyMarkAsDoneSuccess();
    }

    setTimerState("focus");
    setLocalDone(true);
  };

  return (
    <div
      className={`sm:w-2/3 w-screen min-h-screen sm:order-2 order-1 max-h-screen overflow-y-auto`}
    >
      <div
        className={`flex flex-col justify-center items-center ${
          !activeTaskFull?.is_done && !localDone
            ? timerState === "focus"
              ? "bg-blue-200"
              : "bg-green-400"
            : ""
        }`}
      >
        {/* Timer details */}
        <div id="task_title" className="mt-20 mb-16 text-center">
          {activeTaskFull?.is_done ? (
            ""
          ) : (
            <p className=" text-center text-lg text-gray-500">Working on</p>
          )}
          <p className=" text-center text-4xl text-gray-700">
            {" "}
            {activeTaskFull ? activeTaskFull.title : "Untitled"}
          </p>
        </div>
        {!activeTaskFull?.is_done && !localDone ? (
          <p className=" text-center text-2xl font-bold uppercase mt-2 text-gray-700">
            {timerState.toUpperCase()}
          </p>
        ) : (
          <></>
        )}

        {!activeTaskFull?.is_done && !localDone ? (
          <div id="timer_display" className="mb-20">
            {minutes === 0 && seconds === 0 ? (
              <h4 className="text-8xl tracking-widest text-gray-600 mt-5 font-bold">
                00:00
              </h4>
            ) : (
              <h4 className="text-8xl tracking-widest text-gray-600 mt-5 font-bold">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h4>
            )}
          </div>
        ) : (
          <></>
        )}
        {/* Progress spinners */}
        {!activeTaskFull?.is_done && !localDone ? (
          generateProgressSpinners()
        ) : (
          <></>
        )}
        {/* Timer buttons */}
        {!activeTaskFull?.is_done && !localDone ? (
          <div
            id="button_div"
            className="flex flex-row justify-center space-x-16 w-full my-16"
          >
            <button
              className="bg-blue-500 py-2 px-4 border-b-4 border-blue-800 rounded text-white active:border-blue-400 active:bg-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              onClick={() => reset()}
            >
              Reset
            </button>
            <button
              className="bg-blue-500 py-2 px-4 border-b-4 border-blue-800 rounded text-white active:border-blue-400 active:bg-blue-400 transition duration-200 ease-in-out scale-125 transform hover:scale-150"
              onClick={() => {
                pause();
              }}
            >
              {pauseState ? "Start" : "Pause"}
            </button>
            <button
              className="bg-blue-500 py-2 px-4 border-b-4 border-blue-800 rounded text-white active:border-blue-400 active:bg-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              onClick={() => {
                skip();
              }}
            >
              {minutes === 0 && seconds === 0 ? "Next" : "Skip"}
            </button>
          </div>
        ) : (
          <> </>
        )}
        {/* Session statistics */}
        <div id="session_statistics">
          <div className="shadow-xl rounded-lg">
            <div
              className={`${
                !activeTaskFull?.is_done && !localDone
                  ? timerState === "focus"
                    ? "bg-blue-200"
                    : "bg-green-400"
                  : ""
              } border-b-4 border-indigo-300 rounded-lg p-8 shadow-md`}
            >
              <div className="relative"></div>
              <div className="pt-8 pb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-700">
                  Session statistics
                </h1>
                <p className="text-sm text-gray-500">
                  {" "}
                  {activeTaskFull?.is_done ? "Done" : "In progress.."}
                </p>

                <p className="mt-6 text-gray-700 max-w-5xl">
                  I want to finish this task within 3 sessions so that I can do
                  other things such as sports, gaming with friends, or cooking!
                  This is a dummy description. Description is not in the schema.
                  I want to finish this task within 3 sessions so that I can do
                  other things such as sports, gaming with friends, or cooking!
                  This is a dummy description. Description is not in the schema.
                </p>

                <div className="flex justify-evenly mt-8">
                  <p className="font-medium w-full text-left">
                    {" "}
                    Session:{" "}
                    {activeTaskFull?.is_done
                      ? activeTaskFull.number_of_sessions
                      : sessionCount}{" "}
                  </p>
                  <p className="font-medium w-full text-left">
                    {" "}
                    Total Time Elapsed:{" "}
                    {activeTaskFull?.is_done
                      ? `${Math.floor(
                          activeTaskFull.total_time_elapsed / 60
                        )} minutes, ${Math.ceil(
                          activeTaskFull.total_time_elapsed % 60
                        )} seconds`
                      : `${Math.floor(totalTime / 60)} minutes, ${Math.ceil(
                          totalTime % 60
                        )} seconds`}
                  </p>
                </div>
              </div>
              {!activeTaskFull?.is_done && !localDone ? (
                <button
                  className="bg-blue-500 py-2 px-4 border-b-4 border-blue-800 w-full rounded text-white active:border-blue-400 active:bg-blue-400 transition duration-200 ease-in-out scale-105 transform hover:scale-110"
                  onClick={handleFinishTask}
                >
                  Mark as done
                </button>
              ) : (
                <div className="bg-green-600 text-center py-2 px-4 border-b-4 border-green-800 rounded text-white active:border-green-400 active:bg-green-400 transition duration-200 ease-in-out scale-105 transform hover:scale-110">
                  Task Done
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="done_div"></div>
      </div>
    </div>
  );
};
