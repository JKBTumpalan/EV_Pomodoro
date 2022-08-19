import React from "react";
import "./App.css";
import { TaskList } from "./components/TaskList";
import { TimerComponent } from "./components/Timer";
import { GlobalProvider } from "./context/GlobalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GlobalProvider>
      <div className="min-h-screen w-screen flex flex-col sm:flex-row">
        <TaskList />
        <TimerComponent />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </GlobalProvider>
  );
}

export default App;
