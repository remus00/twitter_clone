import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
    const posts = [
        {
            id: "1",
            name: "Remus Burlacu",
            username: "hasbyBoss",
            userImg: "./Hasby.png",
            img: "https://images.unsplash.com/photo-1610692567145-2c1fe6bf9c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBva2Vtb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
            text: "Look how nice this pokeball looks!",
            timestamp: "3 hours ago",
        },
        {
            id: "2",
            name: "Remus Burlacu",
            username: "hasbyBoss",
            userImg: "./Hasby.png",
            img: "https://images.unsplash.com/photo-1612454376902-577cd469d008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9rZW1vbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            text: "Look at this cute Pikachu! :)",
            timestamp: "4 days ago",
        },
    ];
    return (
        <div className="sm:ml-[73px] xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] flex-grow max-w-xl">
            <div className="flex justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
                <h2 className="text-lg am:text-xl font-bold cursor-pointer">
                    Home
                </h2>
                <div className="hoverEffect flex items-center justify-center px-0 w-9 h-9">
                    <SparklesIcon className="h-5 " />
                </div>
            </div>

            <Input />
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Feed;
