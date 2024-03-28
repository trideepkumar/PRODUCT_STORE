import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx"; 
import ProductList from "./Pages/ProductList.jsx";
import CategoryList from "./Pages/CategoryList.jsx";
import UsersList from "./Pages/UsersList.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header /> 
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
