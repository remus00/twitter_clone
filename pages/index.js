import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";

export default function Home({ newsResults }) {
    return (
        <main className="flex min-h-screen mx-auto">
            {/* Sidebar */}
            <Sidebar />

            {/* "feed section" */}
            <Feed />

            {/* Widget */}
            <Widget newsResults={newsResults.articles} />

            {/* Modal */}
        </main>
    );
}

export async function getServerSideProps() {
    const newsResults = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json",
    ).then((res) => res.json());
    return {
        props: {
            newsResults,
        },
    };
}

/* https://saurav.tech/NewsAPI/top-headlines/category/business/us.json */
