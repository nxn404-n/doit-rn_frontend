import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import Authentication from "./components/Authentication";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import AccountCenter from "./components/AccountCenter";

function App() {
  // decides if its gonna show the todo list or not
  const [showTodo, setShowTodo] = useState(false);

  // decides if its gonna show the account center or not
  const [showAccCenter, setShowAccCenter] = useState(false);

  // If its true thn shows the signup form and if its false thn shows the login form
  const [signUp, setSignUp] = useState(true);

  // Shows if user logged in or not
  const [loggedIn, setLoggedIn] = useState(false);

  // Fetches loggedIn data from localStorage
  useEffect(() => {
    const loggedInData = localStorage.getItem("loggedIn");
    if (loggedInData === "true") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [showTodo]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center border-2 border-black bg-[#D6D3C0] sm:h-4/5 sm:w-3/4">
      <Navbar />
      <div className="flex h-full w-full gap-6">
        {loggedIn && (
          <Sidebar
            setShowTodo={setShowTodo}
            setShowAccCenter={setShowAccCenter}
          />
        )}

        {showTodo && <TodoList loggedIn={loggedIn} />}

        {showAccCenter && (
          <AccountCenter
            setLoggedIn={setLoggedIn}
            setSignUp={setSignUp}
            loggedIn={loggedIn}
            showTodo={showTodo}
          />
        )}

        {loggedIn === false && (
          <Authentication
            signUp={signUp}
            setSignUp={setSignUp}
            setShowTodo={setShowTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
