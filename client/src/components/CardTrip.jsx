import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const CardTrip = (prop) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(prop.url)
      .then(() => {
        alert("URL คัดลอกเรียบร้อยแล้ว!");
      })
      .catch((err) => {
        console.error("ไม่สามารถคัดลอก URL ได้:", err);
      });
  };
  return (
    <div className="md:flex-nowrap lg:gap-10 gap-5 w-full min-h-[250px] flex flex-wrap">
      <img
        src={prop.imgSrc[0]}
        alt={prop.title}
        className=" lg:w-[350px] lg:h-[250px] object-fill rounded-2xl shrink-0 md:w-[350px]"
      />
      <div className=" flex flex-col gap-1 grow">
        <a href={prop.url} target="_blank">
          <h1 className=" text-[22px] font-medium text-wrap">{prop.title} </h1>
        </a>
        <p className=" text-gray-500 text-wrap">
          {prop.description.slice(0, 100)}{" "}
          <span className="text-[#2D9ADA]">..</span>
        </p>
        <a
          className=" underline underline-offset-1 text-[#73b9e9] cursor-pointer"
          target="_blank"
          href={prop.url}
        >
          อ่านต่อ
        </a>
        <div className=" text-gray-500 flex gap-2 flex-wrap">
          หมวด:{" "}
          {prop.tag.map((item, index) => {
            return (
              <>
                {index === prop.tag.length - 1 && (
                  <span className="underline-none "> และ </span>
                )}
                <span
                  className=" underline underline-offset-1 cursor-pointer"
                  key={index}
                  onClick={() => {
                    prop.setKeywords((prev) =>
                      prev ? `${prev} ${item}` : item
                    );
                  }}
                >
                  {item}
                </span>
              </>
            );
          })}
        </div>

        <div className=" flex justify-between items-end">
          <div className=" lg:w-[100px] lg:h-[100px] flex md:gap-8 sm:gap-4 gap-2 mt-4 w-[80px] h-[80px] ">
            <img
              src={prop.imgSrc[1]}
              alt=""
              className="rounded-xl object-cover"
            />
            <img
              src={prop.imgSrc[2]}
              alt=""
              className="rounded-xl object-cover"
            />
            <img
              src={prop.imgSrc[3]}
              alt=""
              className="rounded-xl object-cover"
            />
          </div>
          <HiOutlineClipboardDocumentList
            style={{ color: "#73b9e9" }}
            className=" cursor-pointer sm:text-[30px] text-[24px]"
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  );
};

export default CardTrip;
