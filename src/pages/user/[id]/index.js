import React, { useState, useEffect } from "react";
import UserInformation from "@/components/user/UserInformation";
import Header from "@/components/navbar/Header";
import UserNumbers from "@/components/user/UserNumbers";
import UserRecentGames from "@/components/user/UserRecentGames";
import UserRecentReviews from "@/components/user/UserRecentReviews";
import UserPopularReviews from "@/components/user/UserPopularReviews";
import UserFollowings from "@/components/user/UserFollowings";
import FollowButton from "@/components/FollowButton";
import useBetterMediaQuery from "@/components/util/useBetterMediaQuery";

export const getServerSideProps = async ({ query }) => {
  const { id } = query;

  try {
    const res = await fetch(`https://gadget-box.vercel.app/api/user/${id}`, {
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

export default function Id({ data, errorMessage }) {
  const [isThereError, setIsThereError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useBetterMediaQuery("(max-width: 899px)");

  useEffect(() => {
    setIsThereError(!data);
    setIsLoading(false);
  }, [data]);

  return (
    <>
      <Header />

      {isLoading ? (
        <p>Loading...</p>
      ) : isThereError ? (
        <p>{errorMessage}</p>
      ) : isMobile ? (
        <main className="w-[90%] mx-auto">
          <section>
            <div className="text-center">
              <UserInformation infos={data.userInformation} />
              <div className="flex justify-end">
                <FollowButton user={data.userInformation} />
              </div>
            </div>
            <UserNumbers data={data} />
            <UserRecentGames data={data} />
            <UserRecentReviews data={data} />
            <UserPopularReviews data={data} />
            <UserFollowings data={data} />
          </section>
        </main>
      ) : (
        <main className="w-[60%] mx-auto">
          <section>
            <div className="text-center">
              <UserInformation infos={data.userInformation} />
              <div className="flex justify-end">
                <FollowButton user={data.userInformation} />
              </div>
            </div>
            <UserNumbers data={data} />
            <UserRecentGames data={data} />
            <UserRecentReviews data={data} />
            <UserPopularReviews data={data} />
            <UserFollowings data={data} />
          </section>
        </main>
      )}
    </>
  );
}
