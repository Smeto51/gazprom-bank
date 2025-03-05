const SquareOfDots = () => {
  const fillColor: string = "rgba(30, 34, 46, 0.32)";
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2.1" fill={fillColor}></circle>
      <circle cx="12.5" cy="2" r="2.1" fill={fillColor}></circle>
      <circle cx="22.5" cy="2" r="2.1" fill={fillColor}></circle>
      <circle cx="2.5" cy="12" r="2.1" fill={fillColor}></circle>
      <circle cx="12.5" cy="12" r="2.1" fill="#1e222e"></circle>
      <circle cx="22.5" cy="12" r="2.1" fill={fillColor}></circle>
      <circle cx="2.5" cy="22" r="2.1" fill={fillColor}></circle>
      <circle cx="12.5" cy="22" r="2.1" fill={fillColor}></circle>
      <circle cx="22.5" cy="22" r="2.1" fill={fillColor}></circle>
    </svg>
  );
};

export default SquareOfDots;

export const Magnifier = () => {
  return <svg
  width="25"
  height="24"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 12 12"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M7.892 8.702a4.374 4.374 0 1 1 1.06-1.06L11.03 9.72a.75.75 0 1 1-1.06 1.06L7.892 8.702Zm.607-3.578a3.124 3.124 0 1 1-6.249 0 3.124 3.124 0 0 1 6.249 0Z"
    fill="#1C1C1E"
  ></path>
</svg>
}
