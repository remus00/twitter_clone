import CommentModal from "@/components/CommentModal";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import Head from "next/head";

export default function Home({ newsResults, randomUsersResults }) {
    return (
        <>
            <Head>
                <title>Twitter Clone</title>
            </Head>

            <main className="flex min-h-screen mx-auto">
                {/* Sidebar */}
                <Sidebar />

                {/* "feed section" */}
                <Feed />

                {/* Widget */}
                <Widget
                    newsResults={newsResults.articles}
                    randomUsersResults={randomUsersResults.results}
                />

                {/* Modal */}
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

/* https://saurav.tech/NewsAPI/top-headlines/category/business/us.json */
/* https://randomuser.me/api/?results=5000 */
