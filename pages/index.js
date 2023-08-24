import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";

export default function Home({ newsResults, randomUsersResults }) {
    return (
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
        </main>
    );
}

export async function getServerSideProps() {
    const newsResults = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json",
    ).then((res) => res.json());

    /* Who to follow Section */
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
