import {
    ChartBarIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    EllipsisHorizontalIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

const Post = ({ post }) => {
    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200">
            {/* Image */}
            <img
                src={post.userImg}
                alt="user_img"
                className="w-11 h-11 rounded-full mr-4"
            />

            {/* Right Side */}
            <div>
                {/* Header */}
                <div className="flex justify-between items-center">
                    {/* post user Info */}
                    <div className="flex space-x-1 items-center whitespace-nowrap">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline hoverTransition">
                            {post.name}
                        </h4>
                        <span className="text-sm sm:text-[15px]">
                            @{post.username} -
                        </span>
                        <span className="text-sm sm:text-[15px] hover:underline hoverTransition">
                            {post.timestamp}
                        </span>
                    </div>

                    {/* dot icon */}
                    <EllipsisHorizontalIcon className="hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
                </div>

                {/* post text */}
                <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
                    {post.text}
                </p>

                {/* post image */}
                <img
                    src={post.img}
                    alt="post_img"
                    className="rounded-2xl mr-2"
                />

                {/* icons */}
                <div className="flex justify-between text-gray-500 p-2 ">
                    <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                    <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
                    <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
                    <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                    <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                </div>
            </div>
        </div>
    );
};

export default Post;
