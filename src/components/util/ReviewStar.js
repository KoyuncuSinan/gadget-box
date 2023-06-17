import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function ReviewStar({rating}){
    
    const getStarRating = (rating) => {
        const fullStars = Math.floor(rating / 2);
        const hasHalfStar = rating % 2 === 1;
        return { fullStars, hasHalfStar };
      };


      return(
        <span className="text-gray-400">
                    {rating && (
                      <div className="flex">
                        {[...Array(getStarRating(rating).fullStars)].map(
                          (_, index) => (
                            <FaStar key={index} />
                          )
                        )}
                        {getStarRating(rating).hasHalfStar && (
                          <FaStarHalfAlt />
                        )}
                      </div>
                    )}
                  </span>
      )
}