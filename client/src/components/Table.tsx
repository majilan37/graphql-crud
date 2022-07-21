import { useCallback, useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Spinner from "./Spinner";

function Table<T, K extends keyof T>({
  theader,
  tbody,
  render,
  title,
  loading,
  keyItem,
  hideSearch,
}: {
  theader: string[];
  tbody: T[];
  keyItem?: K;
  title: string;
  loading: boolean;
  hideAdd?: boolean;
  render: (item: T) => React.ReactNode;
  hideSearch?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(() => tbody);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    if (search) {
      setData(
        tbody.filter((item) =>
          (item[keyItem as K] as unknown as string)
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    } else {
      setData(tbody);
    }
  }, [search, keyItem, tbody]);

  return (
    <div
      className={`relative overflow-x-auto overflow-y-visible bg-white shadow-md sm:rounded-lg min-h-[300px] transition-all duration-200`}>
      <div className="p-4">
        <div className="bg-gradient-to-tr from-blue-600 to-blue-400 mb-5 p-4 rounded-md ">
          <p className="text-white font-bold text-lg">{title}</p>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="flex justify-between">
          {!hideSearch && (
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-5 text-gray-700 " />
              </div>
              <input
                value={search}
                onChange={onChange}
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Chercher..."
              />
            </div>
          )}
        </div>
      </div>
      <table
        className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {theader.map((header, index) => (
              <th scope="col" key={index} className="px-6 py-3">
                {header}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {loading ? (
            <tr className="w-full ">
              <div className=" absolute right-0 left-0 text-center py-5">
                <Spinner size="w-10 h-10" />
              </div>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                {render(item)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
