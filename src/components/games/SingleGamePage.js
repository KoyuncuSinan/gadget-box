"use client";
import Image from "next/image"
export default function SingleGamePage({game}){
    if(!game || !game.reviews){
        return null;
    }

    const displayReviews = game.reviews.map((review,index) => {
        return(
                <li key={review._id}>
                     <div className="flex flex-row">
                        <Image src={review.owner.profilePicture} alt="User's picture"></Image>
                        <span>{`Review by ${review.owner.username} ${review.rating}`}</span>
                     </div>
                     <p>{review.review}</p>
                     <span>{review.likes}</span>
                </li>


        )
    })
    
    return(
    <main>
    <Image src={game.image} width={800} height={500}></Image>
    <div className="grid grid-cols-3">
        <section className="col-span-1"> 
            <Image src={game.image} width={200} height={400} alt="Game's image"></Image>
            <span>{game.reviewCount}</span>
            <span>{game.website}</span>
        </section>
        <section className="col-span-2">
            <h2>{game.name}</h2>
            <span>{game.releaseDate}</span>
            <p>{game.description}</p>
        </section>
    </div>
    <section>
        <div className="flex flex-row">
            <span>POPULAR REVIEWS</span>
            <span>MORE</span>
            <hr></hr>
        </div>
        <ul>
            {displayReviews}
        </ul>
    </section>
    </main>

    )
}