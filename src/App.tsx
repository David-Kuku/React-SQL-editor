import { useState } from 'react';
import './App.css';
import Nav from './components/NavHeader';
import { Toaster } from 'react-hot-toast';
import Editor from './components/Editor';
import TableSection from './components/ResultSection/resultTableSection';
import Footer from './components/Footer';

function App() {
  const [query, setQuery] = useState<string>("")
  const [value, setValue] = useState<string>("select * from customers")

  return (
    <>
      <Toaster
        position="top-center"
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#ffffff",
            color: "#3A4374",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4661E6",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#D73737",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <div className="App">

        <div className='firstSection'>

          <Nav setQuery={setQuery} setValue={setValue} />
          <Editor setQuery={setQuery} setValue={setValue} value={value} />
          {
            query && <TableSection query={query} />
          }
        </div>
        <Footer />

      </div >
    </>
  );
}


export default App;
