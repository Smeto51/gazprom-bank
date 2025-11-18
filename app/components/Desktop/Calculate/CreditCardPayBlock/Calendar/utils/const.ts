export const DAY_PICKER_STYLES = `
  [&_.rdp-day_button:hover:not(.rdp-selected):not(.rdp-outside)]:bg-gray-200
  [&_.rdp-selected]:!bg-black
  [&_.rdp-selected]:!text-white
  [&_.rdp-selected]:rounded-full
  [&_.rdp-day_button.rdp-selected:hover]:!bg-black
  [&_.rdp-selected.rdp-day_button:hover]:!bg-black
  [&_.rdp-caption_label]:text-transparent
`;

export const DAY_PICKER_CLASSES = {
  root: "shadow-lg p-5 bg-white pb-20 rounded-2xl",
  nav: "flex justify-between w-full",
  today: "font-bold text-blue-500",
  day_button: ["cursor-pointer w-10 h-10 rounded-full transition-all"].join(),
  outside: "opacity-40 pointer-events-none cursor-default text-gray-400",
  button_previous:
    "mb-2 ml-4 hover:text-blue-500 fill-current duration-200 transition-colors",
  button_next:
    "mr-4 hover:text-blue-500 fill-current duration-200 transition-colors",
} as const;
