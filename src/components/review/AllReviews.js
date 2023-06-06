import React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMediaQuery } from "react-responsive";

export default function AllReviews({reviews}){
    const isMobile = useMediaQuery({query:"(max-width:899px"})

    if (!reviews) {
        return <p>No reviews available.</p>;
      }


    }
      