"use client";

export const UsefullWindow = () => {
  return (
    <div className="bg-[#1e222e] fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center min-w-[320px] z-100 p-0 ">
      <div className="w-full p-0 items-center flex-col justify-center h-full">
        <div className="w-[360px]">
          <div className="min-[768]:rounded-2xl relative items-center">
            <div className="absolute top-0 left-0 w-full h-full flex">
              <picture>
                <source
                  type="image/webp"
                  srcSet="https://cdn.gpb.ru/upload/files/iblock/a20/ax634tdhc8jt9iu790t2yg9ql1icr56r/Banner_1080x1920px_Kakie-preimushchestva-predlagaet-nakopitelnyy-schet-Gazprombanka_12.05.25.webp 2x, https://cdn.gpb.ru/upload/files/iblock/a20/ax634tdhc8jt9iu790t2yg9ql1icr56r/x1_Banner_1080x1920px_Kakie-preimushchestva-predlagaet-nakopitelnyy-schet-Gazprombanka_12.05.25.webp"
                />
                <source
                  type="image/jpeg"
                  srcSet="https://cdn.gpb.ru/upload/files/iblock/a20/ax634tdhc8jt9iu790t2yg9ql1icr56r/Banner_1080x1920px_Kakie-preimushchestva-predlagaet-nakopitelnyy-schet-Gazprombanka_12.05.25.jpg 2x, https://cdn.gpb.ru/upload/files/iblock/a20/ax634tdhc8jt9iu790t2yg9ql1icr56r/x1_Banner_1080x1920px_Kakie-preimushchestva-predlagaet-nakopitelnyy-schet-Gazprombanka_12.05.25.jpg"
                />
                <img
                  src="https://cdn.gpb.ru/upload/files/iblock/a20/ax634tdhc8jt9iu790t2yg9ql1icr56r/x1_Banner_1080x1920px_Kakie-preimushchestva-predlagaet-nakopitelnyy-schet-Gazprombanka_12.05.25.jpg"
                  alt=""
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
