import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../App';

// ErrorBoundary for Home page
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // Optionally log error
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: 20 }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme?.darkMode ?? false;
  return (
    <ErrorBoundary>
      <div className={darkMode ? "relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#0a1026]" : "relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-fuchsia-100 to-violet-100"}>
        {/* Moving Stars Background (only in dark mode) */}
        {darkMode && (
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <svg className="w-full h-full" style={{ position: "absolute", top: 0, left: 0 }}>
              <defs>
                <radialGradient id="star-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
              </defs>
              {[...Array(80)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 100 + "%"}
                  cy={Math.random() * 100 + "%"}
                  r={Math.random() * 1.2 + 0.4}
                  fill="url(#star-gradient)"
                >
                  <animate
                    attributeName="cy"
                    values={`-5;105`}
                    dur={`${Math.random() * 10 + 10}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </svg>
          </div>
        )}
        <h1 className={darkMode ? "text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-blue-400 to-white mb-8 drop-shadow-lg" : "text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 mb-8 drop-shadow-lg"}>
          Welcome!
        </h1>
        <p className={darkMode ? "text-lg mb-8 text-blue-100" : "text-lg mb-8 text-violet-700"}>Let your inspirations shine bright. Start your journey now.</p>
        <Link to="/app">
          <button className={darkMode ? "px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 via-blue-600 to-indigo-700 text-white font-bold shadow-lg hover:scale-105 transition-all" : "px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-blue-400 text-white font-bold shadow-lg hover:scale-105 transition-all"}>
            Start Inspiring Yourself
          </button>
        </Link>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
