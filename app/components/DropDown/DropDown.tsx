export default function DropDown({ name, value, onChange, list }) {
  return (
    <select
      onChange={onChange}
      name={name}
      defaultValue={value}
      className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {list?.map((item) => (
        <option
          key={item}
          value={item}
          className="px-2 py-1 cursor-pointer hover:bg-gray-200"
        >
          {item}
        </option>
      ))}
    </select>
  );
}
