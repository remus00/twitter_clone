import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { doc, onSnapshot } from "firebase/firestore";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import Input from "@/components/Input";
import Head from "next/head";
import { db } from "@/firebase";
import Post from "@/components/Post";
import CommentModal from "@/components/CommentModal";

export default function PostPage({ newsResults, randomUsersResults }) {
    const [post, setPost] = useState();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
    }, [db, id]);

    return (
        <>
            <Head>
                <title>Post</title>
            </Head>

            <main className="flex min-h-screen mx-auto">
                <Sidebar />

                <div className="sm:ml-[73px] xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] flex-grow max-w-xl">
                    <div className="flex space-x-2 items-center py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
                        <div className="hoverEffect flex justify-center items-center h-10 w-10">
                            <ArrowLeftIcon
                                className="h-5"
                                onClick={() => router.push("/")}
                            />
                        </div>
                        <h2 className="text-lg am:text-xl font-bold cursor-pointer">
                            Tweet
                        </h2>
                    </div>

                    <Post id={id} post={post} />
                </div>

                <Widget
                    newsResults={newsResults?.articles}
                    randomUsersResults={randomUsersResults?.results}
                />

                <CommentModal />
            </main>
        </>
    );
}

export async function getServerSideProps() {
    const newsResults = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json",
    ).then((res) => res.json());

    const randomUsersResults = await fetch(
        "https://randomuser.me/api/?results=50&inc=name,login,picture",
    ).then((res) => res.json());

    return {
        props: {
            newsResults,
            randomUsersResults,
        },
    };
}
