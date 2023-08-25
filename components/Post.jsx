import { db, storage } from "@/firebase";
import {
    ChartBarIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    EllipsisHorizontalIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
} from "firebase/firestore";
import Moment from "react-moment";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";

const Post = ({ post }) => {
    const { data: session } = useSession();
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [hasCommented, setHasCommented] = useState(false);
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", post.id, "likes"),
            (snapshot) => setLikes(snapshot.docs),
        );
    }, [db]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", post.id, "comments"),
            (snapshot) => setComments(snapshot.docs),
        );
    }, [db]);

    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => like.id === session?.user.uid) !== -1,
        );
    }, [likes]);

    const likePost = async () => {
        if (session) {
            if (hasLiked) {
                await deleteDoc(
                    doc(db, "posts", post.id, "likes", session?.user.uid),
                );
            } else {
                await setDoc(
                    doc(db, "posts", post.id, "likes", session?.user.uid),
                    {
                        username: session.user.username,
                    },
                );
            }
        } else {
            signIn();
        }
    };

    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deleteDoc(doc(db, "posts", post.id));
            if (post.data().image) {
                deleteObject(ref(storage, `posts/${post.id}/image`));
            }
        }
    };

    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200">
            {/* Image */}
            <img
                src={post.data().userImg}
                alt="user_img"
                className="w-11 h-11 rounded-full mr-4"
            />

            {/* Right Side */}
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center">
                    {/* post user Info */}
                    <div className="flex space-x-1 items-center whitespace-nowrap">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline hoverTransition">
                            {post.data().name}
                        </h4>
                        <span className="text-sm sm:text-[15px]">
                            @{post.data().username} -
                        </span>
                        <span className="text-sm sm:text-[15px] hover:underline hoverTransition">
                            <Moment fromNow>
                                {post?.data().timestamp?.toDate()}
                            </Moment>
                        </span>
                    </div>

                    {/* dot icon */}
                    <EllipsisHorizontalIcon className="hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
                </div>

                {/* post text */}
                <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
                    {post.data().text}
                </p>

                {/* post image */}
                {post?.data().image ? (
                    <img
                        src={post?.data().image}
                        alt="post_img"
                        className="rounded-2xl mr-2 select-none"
                    />
                ) : (
                    ""
                )}

                {/* icons */}
                <div className="flex justify-between text-gray-500 p-2 ">
                    <div className="flex items-center">
                        <ChatBubbleOvalLeftEllipsisIcon
                            onClick={() => {
                                if (!session) {
                                    signIn();
                                } else {
                                    setPostId(post.id);
                                    setOpen(!open);
                                }
                            }}
                            className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
                        />
                        {comments.length > 0 && (
                            <span className=" text-sm select-none">
                                {comments.length}
                            </span>
                        )}
                    </div>

                    {session?.user?.uid === post?.data().id && (
                        <TrashIcon
                            className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                            onClick={deletePost}
                        />
                    )}

                    <div className="flex items-center">
                        {hasLiked ? (
                            <HeartIconFilled
                                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                                onClick={likePost}
                            />
                        ) : (
                            <HeartIcon
                                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                                onClick={likePost}
                            />
                        )}

                        {likes.length > 0 && (
                            <span
                                className={`${
                                    hasLiked && "text-red-500"
                                } text-sm select-none`}
                            >
                                {likes.length}
                            </span>
                        )}
                    </div>
                    <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                    <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                </div>
            </div>
        </div>
    );
};

export default Post;
