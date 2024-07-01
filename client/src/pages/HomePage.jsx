import { useState, useEffect } from "react";
import axios from "axios";
import CardTrip from "../components/CardTrip";

function HomePage() {
  const [trips, setTrips] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getTrips = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const getTripFromServer = await axios.get(
        `https://travelpage-data-techup.up.railway.app/trips?keywords=${keywords}`
      );
      // console.log(getTripFromServer.data.data);
      setTrips(getTripFromServer.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const handleDeleteKeyword = (index) => {
    const newKeyword = keywords
      .split(" ")
      .filter((keyword, indexKeyword) => index !== indexKeyword)
      .join(" ");
    setKeywords(newKeyword);
  };

  useEffect(() => {
    getTrips();
  }, [keywords]);

  return (
    <main className="w-full max-w-[1100px] flex justify-center mx-auto overflow-hidden px-6 mb-8">
      <section className=" w-full flex flex-col items-center">
        <nav className=" py-8 text-center">
          <h1 className=" text-[#2D9ADA] md:text-5xl text-4xl font-['DM_Sans'] font-medium">
            WHERE TO GO
          </h1>
          <h1 className=" text-[#2D9ADA] text-xl">เที่ยวใหนดี ?</h1>
        </nav>
        <section className=" w-full flex flex-col items-center sm:px-10 px-3">
          <p className=" self-start">ค้นหาที่เที่ยว</p>
          <input
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน .."
            // value={keywords}
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
            className=" w-full focus:border-[#2D9ADA] border-b-2 outline-none ring-0 text-center py-1"
          />
          <p className="w-full inline-flex self-start pt-4 text-[#73b9e9] font-semibold items-center gap-4">
            หมวด :{" "}
            {keywords.length > 0 &&
              keywords.split(" ").map((keyword, index) => (
                <span
                  className=" text-black font-normal bg-[#73b9e9] rounded-full px-3 py-1 flex relative"
                  key={index}
                >
                  {keyword}
                  <div
                    className=" flex items-center justify-center bg-sky-100 rounded-full w-4 h-4 font-semibold text-base text-gray-500 absolute top-0 right-0 translate-x-1 -translate-y-1 cursor-pointer"
                    onClick={() => handleDeleteKeyword(index)}
                  >
                    x
                  </div>
                </span>
              ))}
          </p>
        </section>
        <section className=" mt-12 w-full flex flex-col gap-12 items-center ">
          {trips.map((item) => (
            <CardTrip
              key={item.eid}
              title={item.title}
              imgSrc={item.photos}
              description={item.description}
              tag={item.tags}
              url={item.url}
              setKeywords={setKeywords}
            />
          ))}
        </section>
        {isError ? <h1 className="text-4xl">Request failed</h1> : null}
        {isLoading ? <h1 className="text-4xl">Loading ....</h1> : null}
      </section>
    </main>
  );
}

export default HomePage;
