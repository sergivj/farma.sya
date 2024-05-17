"use client";

import {useEffect} from "react";

export default function Home({params}: any) {
    useEffect(() => {
        window.location.href = "/search";
    }, []);
}