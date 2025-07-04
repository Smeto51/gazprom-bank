"use client";

const pathClassBlueHover: string =
  "group-hover:fill-blue-700 transition-colors duration-200";

const SquareOfDots = () => {
  return (
    <svg
      className=""
      width="25"
      height="24"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2.1" fill="currentColor"></circle>
      <circle cx="12.5" cy="2" r="2.1" fill="currentColor"></circle>
      <circle cx="22.5" cy="2" r="2.1" fill="currentColor"></circle>
      <circle cx="2.5" cy="12" r="2.1" fill="currentColor"></circle>
      <circle cx="12.5" cy="12" r="2.1" fill="#1e222e"></circle>
      <circle cx="22.5" cy="12" r="2.1" fill="currentColor"></circle>
      <circle cx="2.5" cy="22" r="2.1" fill="currentColor"></circle>
      <circle cx="12.5" cy="22" r="2.1" fill="currentColor"></circle>
      <circle cx="22.5" cy="22" r="2.1" fill="currentColor"></circle>
    </svg>
  );
};

export default SquareOfDots;
/**currentColor — это специальное значение в CSS и SVG, которое означает "использовать текущий цвет текста".  */
export const Magnifier = () => {
  return (
    <svg
      width="25"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M7.892 8.702a4.374 4.374 0 1 1 1.06-1.06L11.03 9.72a.75.75 0 1 1-1.06 1.06L7.892 8.702Zm.607-3.578a3.124 3.124 0 1 1-6.249 0 3.124 3.124 0 0 1 6.249 0Z"
        fill="currentColor"
        className={pathClassBlueHover}
      ></path>
    </svg>
  );
};

export const ThreeDots = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
        fill="currentColor"
        className="group-hover:fill-blue-500 transition-colors duration-200"
      />
    </svg>
  );
};

export const GazpromBankSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="190" height="56">
      <path
        fill="currentColor"
        d="M177.821 19.477h3.932l-.024 6.2h.854l2.244-6.2h4.255l-3.054 8.191 3.494 9.067h-4.603l-2.264-6.94h-.926l.024 6.94h-3.932V19.477Zm-13.246 0h3.908V25.7h2.798v-6.224h3.905v17.258h-3.905v-6.917h-2.798v6.917h-3.908V19.477Zm-13.619 17.28h4.069l.487-2.984h2.795l.487 2.984h4.069l-3.422-17.255H154.4l-3.444 17.255Zm5.964-12.03.74 5.252h-1.504l.764-5.252Zm-16.88 12.008h4.763c1.04 0 5.365-.441 5.388-5.67 0-4.39-3.351-5.155-5.526-5.155h-.716v-2.291h5.294v-4.141h-9.203v17.257Zm3.909-3.471v-3.908h.578c.485 0 1.735.022 1.735 1.803 0 1.807-1.25 2.105-1.735 2.105h-.578Zm-19.422-13.787h3.399l3.003 4.071 3.032-4.071h3.376v17.258h-4.004V26.209l-2.404 3.007-2.402-3.008v10.527h-4V19.477Zm-8.256 17.467c4.74 0 6.334-4.444 6.334-8.86 0-4.417-1.594-8.86-6.334-8.86-4.739 0-6.334 4.443-6.334 8.86 0 4.416 1.595 8.86 6.334 8.86Zm0-4.189c-1.413 0-2.126-1.64-2.126-4.672 0-3.031.713-4.673 2.126-4.673 1.413 0 2.126 1.642 2.126 4.674 0 3.031-.713 4.671-2.126 4.671Zm-17.92 3.98h4v-5.69h1.343c3.952 0 5.179-3.564 5.179-5.834 0-2.219-1.413-5.734-5.179-5.734h-5.343v17.258Zm4-13.464h.949c.902 0 1.481.555 1.481 1.99 0 1.85-.973 1.987-1.481 1.987h-.949V23.27Zm-17.202-3.794h10.913v17.258h-4V23.64h-2.913v13.094h-4V19.477Zm-8.209 6.687c.646 0 1.828-.417 1.828-1.689 0-1.503-1.364-1.598-1.76-1.598-.46 0-1.338.072-2.195.488l-.046-3.75c1.364-.346 2.336-.439 3.49-.439 3.286 0 4.742 2.292 4.742 4.533 0 2.177-1.25 3.492-2.474 4.003v.161c1.18.374 2.751 1.504 2.751 4.142 0 3.264-2.265 5.066-5.18 5.066-1.549-.021-2.566-.23-3.792-.9l.07-3.588c1.133.488 1.896.533 2.66.533 1.295 0 1.802-.95 1.802-1.641 0-.973-.624-1.62-1.987-1.62h-1.62v-3.7h1.711ZM61.22 36.735h4.045l.51-2.986h2.797l.485 2.986h4.045L69.68 19.477h-5.04l-3.42 17.258Zm5.94-12.052.764 5.274h-1.527l.763-5.274Zm-13.686-5.206h8.205v4.302h-4.137v12.956h-4.068V19.477ZM20.013 8C8.973 8 0 16.97 0 28.01 0 39.029 8.974 48 20.013 48 31.028 48 40 39.029 40 28.01 40 16.97 31.028 8 20.013 8Zm0 39C9.529 47 1 38.479 1 28.01 1 17.525 9.525 9 20.013 9 30.48 9 39 17.527 39 28.01 39 38.477 30.477 47 20.013 47Z"
        className={pathClassBlueHover}
      />
      <path
        fill="currentColor"
        d="M11.795 16.037c4.831-2.15 10.729-2.01 13.894-.6.995.463 1.664.743 1.967 1.295-3.285-.88-4.695-1.039-7.445-.972-3.91.07-9.112 1.618-11.1 2.801l-.875 1.089c2.863-1.694 8.205-2.8 11.167-2.894 3.306-.045 5.87.256 8.23 1.111-.14.6-.44.902-.948 1.204-9.434-1.644-15.007.298-20.048 3.583l-.368 1.086c5.619-3.86 12.507-4.923 19.145-3.768-2.382.833-5.226 1.018-7.607 1.569-2.034.464-3.121.604-5.83 1.508-2.747.902-4.37 1.827-5.385 3.007-.486.557-.856 1.203-.95 1.895-.043.415-.02.788.12 1.16.11.323.366.646.645.97-.322.554-.604 1.274-.138 2.107.207.39.739.783 1.25 1.157l-.143.413c-.07.489-.137 1.065.187 1.55.553.879 1.224 1.459 2.287 2.014.164.718.416 1.294.971 1.806 1.179 1.085 3.817 3.167 8.509 3.492 3.517.233 6.036-.833 6.985-1.296l1.155-.6c-1.964.784-5.27 1.248-7.978 1.016-3.93-.324-7.442-2.89-7.882-3.632.137.09.323.161.482.232 4.603 2.22 10.545 3.424 18.153.324l.627-.602c-6.917 2.15-12.972 2.083-19.472-1.318.071-.323.21-.605.508-.831 1.664.735 3.261 1.34 5.204 1.732 2.266.417 4.855.511 6.984.417 2.15-.092 6.403-1.156 8.416-2.22.184-.161.276-.437.46-.624-3.928 1.43-8.6 2.104-11.42 1.894-2.752-.206-5.2-.532-8.44-2.011a19.678 19.678 0 0 1 1.919-.65c2.127.65 4.299 1.04 6.866 1.158 2.546.116 8.487-.83 12.232-3.097.117-.324.232-.674.232-.674s-5.203 2.78-11.097 2.78c-2.753 0-4.44-.396-5.688-.696 2.773-.51 6.266-.927 10.194-1.92 1.988-.51 4.44-1.668 5.55-2.638.948-.858 1.689-1.969 1.436-3.098-.05-.304-.465-1.017-.974-1.274.486-.624.44-1.157.372-1.617-.048-.352-.21-.742-.415-1.088a3.932 3.932 0 0 0-1.253-1.113 2.279 2.279 0 0 0-.184-1.435c-.485-.833-1.362-1.548-2.866-2.312-.069-.302-.256-.695-.577-1.087-1.895-1.874-4.995-2.776-7.609-2.823a19.874 19.874 0 0 0-.435-.005c-3.057 0-5.511.687-7.03 1.396-.79.342-1.391.714-1.99 1.129Zm17.454 2.524c.65.417 1.39 1.042 1.48 1.69-.692-.258-1.432-.53-2.148-.717.232-.255.576-.648.668-.973Zm-3.468 2.892c.789-.303 1.318-.624 1.783-.996 1.037.276 2.009.625 2.799.97-.136.203-.928.935-1.17.935a.072.072 0 0 1-.036-.007c-1.107-.303-2.078-.673-3.376-.902Zm6.222.924c.623.532.807.902.508 1.481-.414-.3-.857-.463-1.34-.694.298-.232.577-.484.832-.787Zm-19.214 2.13c2.89-.86 6.266-1.503 9.32-1.874 2.1-.256 3.213-.022 5.202.509-5.11 1.364-10.153 1.801-14.963 3.214-3.877 1.127-4.906 2.546-4.922 2.546-1.714-2.36 4.228-4.047 5.363-4.396Zm2.73 2.843c4.275-.925 8.253-1.502 9.894-1.918 1.99-.489 3.377-.949 4.345-1.41.047-.07 1.619.692 1.78.874-.53.442-1.268.814-2.08 1.088-2.427.88-6.842 1.804-9.177 2.157-2.359.391-4.328.69-6.937 1.381-1.505.397-2.523.859-3.263 1.346-.555-.325-.878-.416-1.386-.834 1.803-1.528 5.481-2.383 6.823-2.684ZM14.45 31.1c4.07-.999 7.657-1.182 12.605-2.522 2.38-.627 4.115-1.3 5.203-2.128.16-.142.321-.256.485-.394 1.433 2.22-3.954 3.932-7.633 4.722-2.035.412-4.856.92-5.781 1.085-2.4.393-3.191.602-4.855 1.087-.832-.325-1.665-.672-2.425-1.066.76-.323 1.593-.578 2.4-.783Zm-5.64.738c-.162.14-.371.28-.532.44-.368-.21-.74-.668-.556-1.088.37.234.647.42 1.088.648Zm1.687.86c.694.324 1.41.62 2.08.923a7.14 7.14 0 0 0-1.292.626 63.137 63.137 0 0 1-1.642-.928c.231-.208.53-.415.854-.622Zm-.275 2.426c-.163.232-.28.415-.347.649-.58-.487-.859-.88-.834-1.321.393.255.786.462 1.18.672Z"
        className={pathClassBlueHover}
      />
    </svg>
  );
};
//w-4 h-4 group-hover:scale-150 transition-transform duration-500
export const CrossSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.596 3.404a.625.625 0 0 1 0 .884L8.884 8l3.712 3.712a.625.625 0 1 1-.884.884L8 8.884l-3.712 3.712a.625.625 0 1 1-.884-.884L7.116 8 3.404 4.288a.625.625 0 0 1 .884-.884L8 7.116l3.712-3.712a.625.625 0 0 1 .884 0Z"
          fill="currentColor"
        ></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.303 4.697a.75.75 0 0 1 0 1.06L11.061 10l4.242 4.243a.75.75 0 0 1-1.06 1.06L10 11.061l-4.243 4.242a.75.75 0 1 1-1.06-1.06L8.939 10 4.697 5.757a.75.75 0 1 1 1.06-1.06L10 8.939l4.243-4.242a.75.75 0 0 1 1.06 0Z"
          fill="currentColor"
        ></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.718 5.283a.75.75 0 0 1 0 1.06L13.06 12l5.657 5.657a.75.75 0 0 1-1.061 1.06L12 13.062l-5.657 5.657a.75.75 0 1 1-1.06-1.061L10.938 12 5.282 6.343a.75.75 0 0 1 1.061-1.06L12 10.939l5.657-5.656a.75.75 0 0 1 1.06 0Z"
          fill="currentColor"
        ></path>
      </svg>
    </svg>
  );
};

export const QrSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.176 1.054a.5.5 0 0 1 .218.219c.055.107.055.247.055.527v2.849c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218c-.107.055-.247.055-.527.055H1.8c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.218-.218C1 5.069 1 4.929 1 4.649V1.8c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.218C1.38 1 1.52 1 1.8 1h2.849c.28 0 .42 0 .527.054ZM2.25 4.2V2.25h1.949v1.949H2.25Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.176 6.606a.5.5 0 0 1 .218.218c.055.107.055.247.055.527V10.2c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218C5.069 11 4.929 11 4.649 11H1.8c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.218-.218C1 10.62 1 10.48 1 10.2V7.351c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.218c.107-.055.247-.055.527-.055h2.849c.28 0 .42 0 .527.055ZM2.25 9.75V7.801h1.949V9.75H2.25Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.606 1.273a.5.5 0 0 1 .218-.218C6.931 1 7.071 1 7.351 1H10.2c.28 0 .42 0 .527.054a.5.5 0 0 1 .218.219C11 1.38 11 1.52 11 1.8v2.849c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218c-.107.055-.247.055-.527.055H7.351c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.218-.218c-.055-.107-.055-.247-.055-.527V1.8c0-.28 0-.42.055-.527Zm1.195 2.926V2.25H9.75v1.949H7.801Z"
          fill="currentColor"
        ></path>
        <path d="M6.55 6.55h1.483v1.483H6.55V6.55Z" fill="currentColor"></path>
        <path
          d="M9.516 8.033H8.033v1.484H6.55V11h1.483V9.517h1.483V11H11V9.517H9.516V8.033Z"
          fill="currentColor"
        ></path>
        <path d="M9.516 8.033V6.55H11v1.483H9.516Z" fill="currentColor"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.25 6.088V3.25h2.838v2.838H3.25Zm0 6.662V9.912h2.838v2.838H3.25Zm6.662-6.662V3.25h2.838v2.838H9.912ZM2.054 2.273C2 2.38 2 2.52 2 2.8v3.738c0 .28 0 .42.054.527a.5.5 0 0 0 .219.219c.107.054.247.054.527.054h3.738c.28 0 .42 0 .527-.054a.5.5 0 0 0 .219-.219c.054-.107.054-.247.054-.527V2.8c0-.28 0-.42-.054-.527a.5.5 0 0 0-.219-.219C6.958 2 6.818 2 6.538 2H2.8c-.28 0-.42 0-.527.054a.5.5 0 0 0-.219.219Zm0 6.662C2 9.042 2 9.182 2 9.462V13.2c0 .28 0 .42.054.527a.5.5 0 0 0 .219.218C2.38 14 2.52 14 2.8 14h3.738c.28 0 .42 0 .527-.055a.5.5 0 0 0 .219-.218c.054-.107.054-.247.054-.527V9.462c0-.28 0-.42-.054-.527a.5.5 0 0 0-.219-.219c-.107-.054-.247-.054-.527-.054H2.8c-.28 0-.42 0-.527.054a.5.5 0 0 0-.219.219ZM8.662 2.8c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.219C9.042 2 9.182 2 9.462 2H13.2c.28 0 .42 0 .527.054a.5.5 0 0 1 .218.219C14 2.38 14 2.52 14 2.8v3.738c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.219c-.107.054-.247.054-.527.054H9.462c-.28 0-.42 0-.527-.054a.5.5 0 0 1-.219-.219c-.054-.107-.054-.247-.054-.527V2.8Zm.088 5.95h1.75v1.75H8.75V8.75Zm3.5 1.75H10.5v1.75H8.75V14h1.75v-1.75h1.75V14H14v-1.75h-1.75V10.5Zm0 0V8.75H14v1.75h-1.75Z"
          fill="currentColor"
        ></path>
      </svg>
      {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.082 3.41C3 3.57 3 3.78 3 4.2v3.828c0 .42 0 .63.082.79a.75.75 0 0 0 .328.328c.16.082.37.082.79.082h3.828c.42 0 .63 0 .79-.082a.75.75 0 0 0 .328-.328c.082-.16.082-.37.082-.79V4.2c0-.42 0-.63-.082-.79a.75.75 0 0 0-.328-.328C8.658 3 8.448 3 8.028 3H4.2c-.42 0-.63 0-.79.082a.75.75 0 0 0-.328.328ZM4.5 4.5h3.228v3.228H4.5V4.5Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.082 11.182c-.082.16-.082.37-.082.79V15.8c0 .42 0 .63.082.79a.75.75 0 0 0 .328.328c.16.082.37.082.79.082h3.828c.42 0 .63 0 .79-.082a.75.75 0 0 0 .328-.328c.082-.16.082-.37.082-.79v-3.828c0-.42 0-.63-.082-.79a.75.75 0 0 0-.328-.328c-.16-.082-.37-.082-.79-.082H4.2c-.42 0-.63 0-.79.082a.75.75 0 0 0-.328.328Zm1.418 1.09h3.228V15.5H4.5v-3.228Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.772 4.2c0-.42 0-.63.082-.79a.75.75 0 0 1 .328-.328c.16-.082.37-.082.79-.082H15.8c.42 0 .63 0 .79.082a.75.75 0 0 1 .328.328c.082.16.082.37.082.79v3.828c0 .42 0 .63-.082.79a.75.75 0 0 1-.328.328c-.16.082-.37.082-.79.082h-3.828c-.42 0-.63 0-.79-.082a.75.75 0 0 1-.328-.328c-.082-.16-.082-.37-.082-.79V4.2Zm1.5 3.528V4.5H15.5v3.228h-3.228Z"
          fill="currentColor"
        ></path>
        <path
          d="M10.77 10.77h2.077v2.077H10.77V10.77Z"
          fill="currentColor"
        ></path>
        <path
          d="M14.923 12.847h-2.076v2.076H10.77V17h2.077v-2.077h2.076V17H17v-2.077h-2.077v-2.076Z"
          fill="currentColor"
        ></path>
        <path
          d="M14.923 12.847V10.77H17v2.077h-2.077Z"
          fill="currentColor"
        ></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M13 14.5h2V13h-2v1.5Z" fill="currentColor"></path>
        <path
          d="M16.5 14.5V18h-2v3H13v-4.5h2v-2h1.5Z"
          fill="currentColor"
        ></path>
        <path d="M16.5 14.5V13H21v1.5h-4.5Z" fill="currentColor"></path>
        <path
          d="M21 19.4V18h-1.5v1.5H16V21h3.4c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 20.24 21 19.96 21 19.4Z"
          fill="currentColor"
        ></path>
        <path d="M19.5 18v-2H18v2h1.5Z" fill="currentColor"></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.109 3.546C3 3.76 3 4.04 3 4.6v4.807c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437c.214.11.494.11 1.054.11h4.807c.56 0 .84 0 1.054-.11a1 1 0 0 0 .437-.437c.11-.214.11-.494.11-1.054V4.6c0-.56 0-.84-.11-1.054a1 1 0 0 0-.437-.437C10.247 3 9.967 3 9.407 3H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437ZM4.5 4.5h5.007v5.007H4.5V4.5Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.109 13.539C3 13.753 3 14.033 3 14.593V19.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 21 4.04 21 4.6 21h4.807c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437c.11-.214.11-.494.11-1.054v-4.807c0-.56 0-.84-.11-1.054a1 1 0 0 0-.437-.437c-.214-.11-.494-.11-1.054-.11H4.6c-.56 0-.84 0-1.054.11a1 1 0 0 0-.437.437Zm1.391.954h5.007V19.5H4.5v-5.007Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.993 4.6c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C13.753 3 14.033 3 14.593 3H19.4c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C21 3.76 21 4.04 21 4.6v4.807c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437c-.214.11-.494.11-1.054.11h-4.807c-.56 0-.84 0-1.054-.11a1 1 0 0 1-.437-.437c-.11-.214-.11-.494-.11-1.054V4.6Zm1.5-.1H19.5v5.007h-5.007V4.5Z"
          fill="currentColor"
        ></path>
      </svg>*/}
    </svg>
  );
};

export const BankCardSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.75 7v3.64c0 .66-.001 1.068-.03 1.374-.026.286-.068.356-.074.368a.752.752 0 0 1-.264.264c-.012.006-.082.048-.368.074-.306.029-.715.03-1.374.03H4.36c-.66 0-1.068-.001-1.374-.03-.286-.026-.356-.068-.368-.074a.751.751 0 0 1-.264-.264c-.006-.012-.048-.082-.074-.368-.029-.306-.03-.715-.03-1.374V7h11.5Zm0-1a12.173 12.173 0 0 0-.03-1.014c-.026-.286-.068-.356-.074-.367a.751.751 0 0 0-.264-.265c-.012-.006-.082-.048-.368-.074-.306-.029-.715-.03-1.374-.03H4.36c-.66 0-1.068.001-1.374.03-.286.026-.356.068-.367.074a.751.751 0 0 0-.265.264c-.006.012-.048.082-.074.368-.023.246-.028.558-.03 1.014h11.5Zm-2.11-3c1.271 0 1.907 0 2.378.279a2 2 0 0 1 .704.703C15 4.452 15 5.089 15 6.36v4.28c0 1.271 0 1.907-.278 2.378a2 2 0 0 1-.704.704c-.47.278-1.107.278-2.378.278H4.36c-1.271 0-1.907 0-2.378-.278a2 2 0 0 1-.703-.704C1 12.548 1 11.911 1 10.64V6.36c0-1.271 0-1.907.279-2.378a2 2 0 0 1 .703-.703C2.452 3 3.089 3 4.36 3h7.28ZM4.055 9.273C4 9.38 4 9.52 4 9.8v.4c0 .28 0 .42.055.527a.5.5 0 0 0 .218.218C4.38 11 4.52 11 4.8 11H6c.28 0 .42 0 .527-.055a.5.5 0 0 0 .219-.218c.054-.107.054-.247.054-.527v-.4c0-.28 0-.42-.054-.527a.5.5 0 0 0-.219-.218C6.42 9 6.28 9 6 9H4.8c-.28 0-.42 0-.527.055a.5.5 0 0 0-.218.218Z"
          fill="currentColor"
        ></path>
      </svg>
    </svg>
  );
};

export const SavingAccountSVG = () => {
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-1.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.245 4.229C3 4.709 3 5.339 3 6.6v6.8c0 1.26 0 1.89.245 2.371.216.424.56.768.984.984.084.043.174.079.271.108v.337c0 .28 0 .42.054.527a.5.5 0 0 0 .219.218C4.88 18 5.02 18 5.3 18h.4c.28 0 .42 0 .527-.055a.5.5 0 0 0 .218-.218c.055-.107.055-.247.055-.527V17h7v.2c0 .28 0 .42.055.527a.5.5 0 0 0 .218.218c.107.055.247.055.527.055h.4c.28 0 .42 0 .527-.055a.5.5 0 0 0 .218-.218c.055-.107.055-.247.055-.527v-.337c.097-.03.187-.065.271-.108.424-.216.768-.56.984-.983C17 15.29 17 14.66 17 13.4V6.6c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 0 0-.983-.984C15.29 3 14.66 3 13.4 3H6.6c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984ZM13.4 4.5H6.6c-.655 0-1.056.001-1.356.026a1.44 1.44 0 0 0-.323.051c-.145.052-.271.199-.34.333 0 0-.033.064-.055.334-.025.3-.026.701-.026 1.356v6.8c0 .655.001 1.056.026 1.356.011.14.025.224.038.275.044.189.216.361.405.405.051.013.136.027.275.038.3.025.701.026 1.356.026h6.8c.655 0 1.056-.001 1.356-.026.107-.008.226-.015.329-.053a.652.652 0 0 0 .336-.336c.038-.103.045-.222.053-.33.025-.3.026-.7.026-1.355V6.6c0-.655-.001-1.056-.026-1.356a1.438 1.438 0 0 0-.051-.323c-.052-.145-.199-.271-.332-.34 0 0-.065-.033-.335-.055-.3-.025-.701-.026-1.356-.026Z"
          fill="currentColor"
        ></path>
      </svg>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.03 9.03a.75.75 0 0 0-1.06-1.06l-1.083 1.082A3.484 3.484 0 0 0 12 8.5c-.695 0-1.343.203-1.887.552L9.03 7.97a.75.75 0 0 0-1.06 1.06l1.082 1.083A3.484 3.484 0 0 0 8.5 12c0 .695.203 1.343.552 1.887L7.97 14.97a.75.75 0 1 0 1.06 1.06l1.083-1.082c.544.35 1.192.552 1.887.552.695 0 1.343-.203 1.887-.552l1.083 1.082a.75.75 0 1 0 1.06-1.06l-1.082-1.083c.35-.544.552-1.192.552-1.887 0-.695-.203-1.343-.552-1.887L16.03 9.03ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.272 4.365C3 4.9 3 5.6 3 7v10c0 1.4 0 2.1.272 2.635A2.5 2.5 0 0 0 4.5 20.789v.011c0 .42 0 .63.082.79a.75.75 0 0 0 .328.328c.16.082.37.082.79.082h.6c.42 0 .63 0 .79-.082a.75.75 0 0 0 .328-.328c.068-.132.08-.299.082-.59h9c.002.291.014.458.082.59a.751.751 0 0 0 .328.328c.16.082.37.082.79.082h.6c.42 0 .63 0 .79-.082a.751.751 0 0 0 .328-.328c.082-.16.082-.37.082-.79v-.01a2.5 2.5 0 0 0 1.227-1.154c.273-.536.273-1.236.273-2.636V7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C19.1 3 18.4 3 17 3H7c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093ZM17 4.5H7c-.725 0-1.178.001-1.52.03-.324.026-.413.068-.434.079a1 1 0 0 0-.437.437c-.01.02-.053.11-.08.434-.028.342-.029.795-.029 1.52v10c0 .725.001 1.178.03 1.52.026.324.068.413.079.434a1 1 0 0 0 .437.437c.02.01.11.053.434.08.342.028.795.029 1.52.029h10c.725 0 1.178-.001 1.52-.03.324-.026.413-.069.434-.079a1 1 0 0 0 .437-.437c.01-.02.053-.11.08-.434.028-.342.029-.795.029-1.52V7c0-.725-.001-1.178-.03-1.52-.026-.324-.069-.413-.079-.434a1 1 0 0 0-.437-.437c-.02-.01-.11-.053-.434-.08-.342-.028-.795-.029-1.52-.029Z"
          fill="currentColor"
        ></path>
      </svg>
    </svg>
  );
};

export const BestPremiumCardSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.217 4.309c-.35.22-.594.579-1.083 1.294L2.338 8.23c-.517.757-.776 1.136-.8 1.555a1.5 1.5 0 0 0 .016.31c.065.416.36.767.95 1.469l8.107 9.636c.593.705.89 1.057 1.27 1.11.092.013.185.013.277 0 .38-.053.676-.405 1.27-1.11l8.106-9.636c.59-.702.886-1.053.95-1.468a1.49 1.49 0 0 0 .016-.31c-.023-.42-.282-.799-.8-1.556l-1.795-2.627c-.489-.715-.733-1.073-1.083-1.294a1.996 1.996 0 0 0-.275-.145C18.167 4 17.734 4 16.867 4H7.172c-.867 0-1.3 0-1.68.164-.095.041-.187.09-.275.145ZM8.933 5.5H7.172c-.456 0-.714.001-.907.016a.925.925 0 0 0-.178.025c-.006.002-.005.002 0 0a.5.5 0 0 0-.069.036c.004-.002.004-.003 0 0a.922.922 0 0 0-.121.133c-.121.151-.268.363-.525.74-.686 1.003-1.38 2-2.056 3.01h4.272L8.933 5.5Zm1.056 0L8.644 9.46h6.752L14.05 5.5H9.989Zm5.118 0 1.345 3.96h4.27c-.675-1.01-1.37-2.007-2.055-3.01a13.33 13.33 0 0 0-.525-.74.933.933 0 0 0-.121-.133c-.005-.003-.004-.002 0 0a.5.5 0 0 0-.069-.036c.005.002.006.002 0 0a.923.923 0 0 0-.178-.025c-.193-.015-.45-.016-.907-.016h-1.76Zm.267 4.96H8.665l3.354 8.995 3.354-8.995Zm-7.776 0H3.537l7.295 8.671-3.234-8.671Zm5.61 8.67 3.233-8.67h4.061l-7.294 8.67Z"
          fill="currentColor"
        ></path>
      </svg>
    </svg>
  );
};

export const PercentSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M6.749 20.31c.314 0 .494-.112.74-.472L17.879 4.89a.823.823 0 0 0 .168-.527c0-.382-.337-.663-.718-.663-.315 0-.506.09-.775.483L6.165 19.097a.866.866 0 0 0-.18.539c0 .404.326.674.764.674Zm.168-8.378c1.977 0 3.167-1.584 3.167-4.11 0-2.538-1.202-4.088-3.167-4.088-1.965 0-3.167 1.56-3.167 4.088 0 2.538 1.19 4.11 3.167 4.11Zm0-1.27c-1 0-1.572-1.021-1.572-2.84 0-1.797.584-2.82 1.572-2.82.988 0 1.572 1.011 1.572 2.82 0 1.819-.573 2.84-1.572 2.84Zm10.197 9.614c1.977 0 3.167-1.583 3.167-4.11 0-2.538-1.201-4.088-3.167-4.088-1.965 0-3.167 1.561-3.167 4.088 0 2.538 1.19 4.11 3.167 4.11Zm0-1.269c-1 0-1.572-1.022-1.572-2.841 0-1.797.584-2.819 1.572-2.819.988 0 1.572 1.01 1.572 2.819 0 1.82-.572 2.841-1.572 2.841Z"
          fill="currentColor"
        ></path>
      </svg>
    </svg>
  );
};

export const InvestmentsSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.577 18.5h-1.5V9.379h-4.038V18.5h-1.5v-5.242H4.5V18.5c0 .035 0-.032 0 0h15v-13h-3.923c-.035 0 .031 0 0 0v13Zm-7.039-6.742H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 12.517 3 12.797 3 13.358V18.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 20 4.04 20 4.6 20h14.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 19.24 21 18.96 21 18.4V5.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 4 19.96 4 19.4 4h-3.723c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437c-.11.214-.11.494-.11 1.054v2.279h-3.938c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437c-.109.214-.109.494-.109 1.054v2.279Z"
          fill="currentColor"
        ></path>
      </svg>
    </svg>
  );
};

export const PreciousMetaksSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      data-colors="#343D57"
      fill="none"
      stroke="none"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.68 16c.802 0 1.524.477 1.84 1.212l1.883 4.395c.282.659-.202 1.393-.92 1.393H1.518c-.72 0-1.202-.734-.92-1.393l1.884-4.395C2.796 16.477 3.519 16 4.319 16zm12 0c.802 0 1.524.477 1.84 1.212l1.883 4.395c.283.659-.201 1.393-.92 1.393h-8.966c-.72 0-1.202-.734-.92-1.393l1.883-4.395c.316-.735 1.038-1.212 1.838-1.212zm-6-9c.802 0 1.524.477 1.84 1.212l1.883 4.394c.283.66-.201 1.394-.92 1.394H7.518c-.72 0-1.202-.734-.92-1.394L8.48 8.212C8.796 7.477 9.519 7 10.319 7zM23 9.5c.553 0 1 .447 1 1 0 .553-.447 1-1 1h-3c-.553 0-1-.447-1-1 0-.553.447-1 1-1zm-19 0c.553 0 1 .447 1 1 0 .553-.447 1-1 1H1c-.553 0-1-.447-1-1 0-.553.447-1 1-1zm-.768-6.767c.391-.391 1.023-.391 1.414 0l2.122 2.12c.39.392.39 1.024 0 1.415-.196.195-.452.293-.707.293-.256 0-.513-.098-.707-.293L3.232 4.147c-.39-.391-.39-1.024 0-1.414zm16.122 0c.39-.392 1.024-.392 1.413 0 .392.39.392 1.022 0 1.413l-2.12 2.122c-.195.195-.451.293-.707.293-.257 0-.513-.098-.707-.293-.392-.391-.392-1.023 0-1.414zM12 0c.553 0 1 .447 1 1v3c0 .553-.447 1-1 1-.553 0-1-.447-1-1V1c0-.553.447-1 1-1z"
        stroke="none"
      ></path>
    </svg>
  );
};

export const PrivateBunkingSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.528 17.46c-.017-4.192.355-8.418 1.003-12.556.065-.41-.176-.758-.687-.506a9.466 9.466 0 0 0-.823.458c-2.566 1.603-3.836 4.111-4.55 5.519-.344.682-.559 1.105-.726 1.042-.229-.085-.274-.731-.32-1.523-.066-1.1-.154-2.597-.762-3.814-.534-1.068-1.472-2.362-2.35-3.105-.214-.18-.409-.173-.624.01-.878.742-1.83 2.027-2.364 3.095-.612 1.225-.698 2.739-.76 3.844-.045.796-.085 1.419-.307 1.502-.162.06-.372-.355-.711-1.025-.71-1.405-1.987-3.927-4.565-5.536a9.825 9.825 0 0 0-.824-.459c-.507-.25-.751.097-.687.507.648 4.136 1.028 8.357 1.028 12.546v1.974c0 .59.478 1.067 1.067 1.067h16.895c.59 0 1.067-.478 1.067-1.067v-1.974Zm-17.53.104V19h16.03c0-.479-.002-.957 0-1.436H3.998Zm-.01-1.064a90.73 90.73 0 0 0-.715-9.552C4.56 8.08 5.432 9.545 6.197 11.056c.505.999 1.247 2.277 2.587 1.775 1.256-.471 1.238-1.965 1.3-3.077.056-1.03.112-2.062.583-3.003a9.978 9.978 0 0 1 1.335-1.964c.502.583.996 1.317 1.32 1.964.464.93.524 1.959.583 2.983.065 1.117.054 2.616 1.313 3.088 1.35.506 2.1-.798 2.605-1.794.761-1.503 1.629-2.96 2.907-4.088a89.84 89.84 0 0 0-.692 9.56H3.988Z"
          fill="currentColor"
        ></path>
      </svg>
    </svg>
  );
};

export const DropDownMenuSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 5.75A.75.75 0 0 1 2.75 5h18.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 5.75Zm0 6a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
          fill="currentColor"
        ></path>
      </svg>
    </svg>
  );
};

export const ArrowSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.452 12.797c.245.245.64.245.884 0l4.356-4.355a.625.625 0 0 0 0-.884L9.336 3.203a.625.625 0 1 0-.884.883l3.29 3.289H2.75a.625.625 0 1 0 0 1.25h8.991l-3.289 3.289a.625.625 0 0 0 0 .883Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const MiniCrossSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="text-white p-1"
    >
      <path
        d="M12.596 3.404a.625.625 0 0 1 0 .884L8.884 8l3.712 3.712a.625.625 0 1 1-.884.884L8 8.884l-3.712 3.712a.625.625 0 1 1-.884-.884L7.116 8 3.404 4.288a.625.625 0 0 1 .884-.884L8 7.116l3.712-3.712a.625.625 0 0 1 .884 0Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
