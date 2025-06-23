import React, { useState, useEffect, createContext } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

// ErrorBoundary component to catch errors in the component tree
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error info here if needed
    // console.error(error, errorInfo);
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

export const ThemeContext = createContext();

function App() { 
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === null ? false : JSON.parse(saved);
  });

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ErrorBoundary>
        <div className={darkMode ? "relative min-h-screen overflow-hidden dark-bg" : "relative min-h-screen overflow-hidden light-bg"}>
          <Navbar />
          <div className={
            (darkMode
              ? "relative overflow-hidden mx-3 md-container md-mx-auto my-5 rounded-3xl shadow-2xl p-8 min-h-80vh md-w-35p border-2 border-blue900 bg-dark"
              : "relative overflow-hidden mx-3 md-container md-mx-auto my-5 rounded-3xl shadow-2xl p-8 min-h-80vh md-w-35p border-2 border-violet200 bg-white")
          }>
            {/* Animated Stars Background (only in dark mode) */}
            {darkMode && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" style={{position: 'absolute', top: 0, left: 0}}>
                  <defs>
                    <radialGradient id="star-gradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {[...Array(60)].map((_, i) => (
                    <circle key={i} cx={Math.random()*100+'%'} cy={Math.random()*100+'%'} r={Math.random()*1.2+0.4} fill="url(#star-gradient)">
                      <animate attributeName="cy" values={`-5;105`} dur={`${Math.random()*10+10}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </svg>
              </div>
            )}
            <h1 className={darkMode ? 'font-extrabold text-center text-4xl text-blue100 drop-shadow mb-6' : 'font-extrabold text-center text-4xl text-violet900 drop-shadow mb-6'}>InspireList <span className={darkMode ? "text-fuchsia400" : "text-fuchsia600"}>- Your Personal Inspiration Hub</span></h1>
             <div className="addTodo my-7 flex-col gap-4 p-4 rounded-lg shadow-md">
              <h2 className={darkMode ? 'text-2xl font-bold text-blue200' : 'text-2xl font-bold text-violet800'}>Add New Inspiration</h2>
              <div className="flex items-center gap-2">
              <input  onChange={handleChange} value={todo} type="text" className={darkMode ? 'w-full rounded-full px-5 py-2 bg-dark border-2 border-blue900 focus-border-fuchsia400 focus-outline-none shadow-sm text-blue100 placeholder-blue400 transition-all duration-200' : 'w-full rounded-full px-5 py-2 bg-white border-2 border-violet300 focus-border-fuchsia400 focus-outline-none shadow-sm text-violet900 placeholder-violet400 transition-all duration-200'} placeholder="What's inspiring you today?" />
              <button onClick={handleAdd} disabled={todo.length<=3} className={darkMode ? 'bg-gradient mx-2 rounded-full hover-bg-fuchsia400 hover-bg-blue900 disabled-bg-blue900 p-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-200' : 'bg-gradient mx-2 rounded-full hover-bg-fuchsia600 hover-bg-violet900 disabled-bg-violet300 p-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-200'}>Add Inspiration</button>
              </div>
             </div>
             <input className={darkMode ? 'my-4 accent-fuchsia400 scale-125' : 'my-4 accent-fuchsia600 scale-125'} id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
             <label className={darkMode ? 'mx-2 text-blue200 font-medium' : 'mx-2 text-violet700 font-medium'} htmlFor="show">Show Completed Inspirations</label> 
             <div className={darkMode ? 'divider-blue' : 'divider-violet'}></div>
             <h2 className={darkMode ? 'text-2xl font-bold text-blue200 mb-2' : 'text-2xl font-bold text-violet800 mb-2'}>Your Inspirations</h2>
             <div className="todos">
              {(todos.filter(item => showFinished || !item.isCompleted).length === 0) && <div className={darkMode ? 'm-5 text-blue400 italic' : 'm-5 text-violet400 italic'}>No Inspirations to display</div> }
              {todos.map(item=>{
              return (showFinished || !item.isCompleted) && <div key={item.id} className={darkMode ? "todo flex my-3 justify-between items-center bg-dark80 rounded-xl px-4 py-2 shadow-sm border border-blue900 hover-shadow-lg transition-all duration-200" : "todo flex my-3 justify-between items-center bg-white80 rounded-xl px-4 py-2 shadow-sm border border-violet100 hover-shadow-lg transition-all duration-200"}>
                <div className='flex gap-5 items-center'> 
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className={darkMode ? "accent-fuchsia400 scale-125" : "accent-fuchsia600 scale-125"} />
                <div className={item.isCompleted ? (darkMode ? "line-through text-blue400" : "line-through text-violet400") : (darkMode ? "text-blue100 font-medium" : "text-violet900 font-medium")}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full gap-1">
                  <button onClick={(e)=>handleEdit(e, item.id)} className={darkMode ? 'bg-gradient p-2 py-1 text-sm font-bold text-white rounded-md shadow transition-all duration-200' : 'bg-gradient p-2 py-1 text-sm font-bold text-white rounded-md shadow transition-all duration-200'}>Edit</button>
                  <button onClick={(e)=>{handleDelete(e, item.id)}} className={darkMode ? 'bg-gradient p-2 py-1 text-sm font-bold text-white rounded-md shadow transition-all duration-200' : 'bg-gradient p-2 py-1 text-sm font-bold text-white rounded-md shadow transition-all duration-200'}>Delete</button>
                </div> 
              </div>
              })}
             </div>
            
           </div>
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  )
}

export default App