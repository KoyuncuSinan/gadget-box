import { useState, useEffect, useRef } from "react";
import Header from "@/components/navbar/Header";
import PopularGamesThisWeek from "@/components/games/PopularGamesThisWeek";
import RecentlyReviewed from "@/components/games/RecentlyReviewed";
import PopularReviewsThisWeek from "@/components/games/PopularReviewsThisWeek";
import PopularReviewers from "@/components/games/PopularReviewers";
import useBetterMediaQuery from "@/components/util/useBetterMediaQuery";

export const getServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/games/gamesPage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        data: null,
        errorMessage: "An error occurred while retrieving data.",
      },
    };
  }
};

export default function Index({ data, errorMessage }) {
  const [isThereError, setIsThereError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsThereError(!data);
    setIsLoading(false);
  }, [data]);

  const isMobile = useBetterMediaQuery("(max-width: 899px)");

  return (
    <>
      <Header />
      {
        isMobile ? (
        <main className="w-[90%] mx-auto">
        <section>
          {isLoading ? (
            <p>Loading...</p>
          ) : isThereError ? (
            <p>{errorMessage}</p>
          ) : (
            <>
              <section className="mt-5">
                <PopularGamesThisWeek games={data.popular16Games} />
              </section>
              <section>
                <RecentlyReviewed games={data.justReviewed12Games} />
              </section>
              <section>
                <PopularReviewsThisWeek reviews={data.getReviews} />
              </section>
              <section>
                <PopularReviewers reviewers={data.popularReviewers} />
              </section>
            </>
          )}
        </section>
      </main>
        )
        :
        <main className="w-[60%] mx-auto">
        <section>
          {isLoading ? (
            <p>Loading...</p>
          ) : isThereError ? (
            <p>{errorMessage}</p>
          ) : (
            <>
              <section className="mt-5">
                <PopularGamesThisWeek games={data.popular16Games} />
              </section>
              <section>
                <RecentlyReviewed games={data.justReviewed12Games} />
              </section>
              <section>
                <PopularReviewsThisWeek reviews={data.getReviews} />
              </section>
              <section>
                <PopularReviewers reviewers={data.popularReviewers} />
              </section>
            </>
          )}
        </section>
      </main>
      }
    </>
  );
}
