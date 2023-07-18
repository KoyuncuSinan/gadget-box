import { useState, useEffect, useRef } from "react";
import Header from "@/components/navbar/Header";
import PopularGamesThisWeek from "@/components/games/PopularGamesThisWeek";
import RecentlyReviewed from "@/components/games/RecentlyReviewed";
import PopularReviewsThisWeek from "@/components/games/PopularReviewsThisWeek";
import PopularReviewers from "@/components/games/PopularReviewers";
import useBetterMediaQuery from "@/components/util/useBetterMediaQuery";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const getServerSideProps = async () => {
  try {
    const res = await fetch("https://gadget-box.vercel.app/api/games/gamesPage", {
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
            <Box sx={{ display: "flex"}} className="mt-10 mx-auto items-center justify-center text-white"> 
          <CircularProgress />
            </Box>
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
            <Box sx={{ display: "flex"}} className="mt-10 mx-auto items-center justify-center text-white"> 
          <CircularProgress />
          </Box>
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
