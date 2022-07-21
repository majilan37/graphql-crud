import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import { FormType } from "../types";
import Spinner from "./Spinner";

interface FormArr {
  name: string;
  label: string;
  type: string;
  select: boolean;
  textArea: boolean;
  title: string;
  options: Array<{
    value: string;
    text: string;
  }>;
}

const prepareForm = <T extends unknown, K extends keyof T>(
  formArr: T[],
  keyItem: K
): Record<K, string> => {
  return formArr.reduce(
    (a, v) => ({ ...a, [v[keyItem] as unknown as string]: "" }),
    {}
  ) as Record<K, string>;
};

function Form<T, K extends keyof T>({
  formArr,
  keyItem,
  onSubmit,
  loading,
  setIsOpen,
  data,
}: FormType<T, K> & { setIsOpen: React.Dispatch<SetStateAction<boolean>> }) {
  const [form, setForm] = useState(() => prepareForm(formArr, keyItem));
  const id = useId();
  const onChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form]
  );
  console.log(form);
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmit(form);
    setForm(() => prepareForm(formArr, keyItem));
    setIsOpen(false);
  };

  useEffect(() => {
    if (data) {
      console.log(Object.entries(data));
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === "object") {
          const { _id } = value;
          setForm((p) => ({ ...p, [key]: _id }));
        } else {
          setForm((p) => ({ ...p, [key]: value }));
        }
      }
    }
  }, [data]);

  return (
    <form onSubmit={onSubmitHandler}>
      {formArr.map((item, index) => (
        <div key={index} className="relative z-0 mb-6 w-full group">
          {(item as unknown as FormArr)["textArea"] ? (
            <>
              <textarea
                id="comment"
                name={item[keyItem] as unknown as string}
                // @ts-ignore
                value={form[item[keyItem]]}
                onChange={onChange}
                rows={4}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required></textarea>
              <label
                htmlFor={item[keyItem] as unknown as string}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {(item as unknown as FormArr)["label"]}
              </label>
            </>
          ) : (item as unknown as FormArr)["select"] ? (
            <>
              <label
                htmlFor="underline_select"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {(item as unknown as FormArr)["label"]}
              </label>
              <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                name={item[keyItem] as unknown as string}
                // @ts-ignore
                value={form[item[keyItem]]}
                onChange={onChange}>
                <option selected>{(item as unknown as FormArr).title}</option>
                {(item as unknown as FormArr).options?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <input
                type={(item as unknown as FormArr)["type"]}
                name={item[keyItem] as unknown as string}
                // @ts-ignore
                value={form[item[keyItem]]}
                onChange={onChange}
                id={id}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={id}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {(item as unknown as FormArr)["label"]}
              </label>
            </>
          )}
        </div>
      ))}
      <button
        disabled={loading}
        type="submit"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center ${
          loading && "!bg-gray-50 border !text-gray-800 cursor-not-allowed"
        } `}>
        {loading && <Spinner size="w-4 h-4" />}
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default Form;
