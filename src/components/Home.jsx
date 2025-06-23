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
      <div className={darkMode ? "relative flex-col items-center justify-center min-h-screen overflow-hidden dark-bg" : "relative flex-col items-center justify-center min-h-screen overflow-hidden light-bg"}>
        {/* Moving Stars Background (only in dark mode) */}
        {darkMode && (
          <div className="absolute inset-0 pointer-events-none">
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
        <h1 className={darkMode ? "text-5xl font-extrabold text-transparent gradient-text mb-8 drop-shadow-lg" : "text-5xl font-extrabold text-transparent gradient-text mb-8 drop-shadow-lg"}>
          Welcome!
        </h1>
        <p className={darkMode ? "text-lg mb-8 text-blue100" : "text-lg mb-8 text-violet700"}>Let your inspirations shine bright. Start your journey now.</p>
        <Link to="/app">
          <button className={darkMode ? "px-8 py-3 rounded-full bg-gradient text-white font-bold shadow-lg hover-scale" : "px-8 py-3 rounded-full bg-gradient text-white font-bold shadow-lg hover-scale"}>
            Start Inspiring Yourself
          </button>
        </Link>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
