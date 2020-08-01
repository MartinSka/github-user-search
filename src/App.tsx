import React, { useState, ChangeEvent } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useUsers } from "./hooks/useUsers";
import Footer from "./components/Footer";
import Main from "./components/Main";

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const query = useDebounce(searchValue);

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);
  };

  const {
    error,
    users,
    loading,
    nextPage,
    prevPage,
    pageInfo,
    userCount,
  } = useUsers(query);

  return (
    <div className="flex flex-grow flex-col shadow-lg mx-auto max-w-4xl bg-white">
      <header className="p-4 border-b border-gray-200 items-baseline">
        <h1 className="text-lg mb-2 text-gray-600 flex-shrink-0 mr-2">
          Github Search
        </h1>
        <input
          value={searchValue}
          onChange={handleSearch}
          className="input w-full"
          placeholder="Search for a user"
        />
      </header>
      <main className="flex flex-col flex-grow overflow-y-auto p-4">
        <Main query={query} loading={loading} users={users} error={error} />
      </main>

      <Footer
        query={query}
        onBack={prevPage}
        loading={loading}
        pageInfo={pageInfo}
        onForward={nextPage}
        userCount={userCount}
      />
    </div>
  );
};

export default App;
