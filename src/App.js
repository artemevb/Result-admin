import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Blog from "./pages/Blog";
import AddBlogCases from "./pages/add_blog_cases";
import Cases from "./pages/admin_cases";
import Main from "./pages/Main";
import Usluga from "./pages/sama_usluga";
import Delete from "./Modal/delete";
import Form from "./Modal/Form";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ConditionalHeader />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/admin_cases" element={<Cases />} />
          <Route path="/add_blog_cases" element={<AddBlogCases />} />
          <Route path="/sama_usluga" element={<Usluga />} />
          <Route path="/Modal/delete" element={<Delete />} />
          <Route path="/Modal/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ConditionalHeader() {
  const location = useLocation();
  return location.pathname !== '/' ? <Header /> : null;
}

export default App;

