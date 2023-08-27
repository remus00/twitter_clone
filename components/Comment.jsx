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
import { useRouter } from "next/router";

const Comment = ({ originalPostId, commentId, comment }) => {
    const { data: session } = useSession();
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasCommented, setHasCommented] = useState(false);
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(
                db,
                "posts",
                originalPostId,
                "comments",
                commentId,
                "likes",
            ),
            (snapshot) => setLikes(snapshot.docs),
        );
    }, [db, originalPostId, commentId]);

    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => like.id === session?.user.uid) !== -1,
        );
    }, [likes]);

    const likeComment = async () => {
        if (session) {
            if (hasLiked) {
                await deleteDoc(
                    doc(
                        db,
                        "posts",
                        originalPostId,
                        "comments",
                        commentId,
                        "likes",
                        session?.user.uid,
                    ),
                );
            } else {
                await setDoc(
                    doc(
                        db,
                        "posts",
                        originalPostId,
                        "comments",
                        commentId,
                        "likes",
                        session?.user.uid,
                    ),
                    {
                        username: session.user.username,
                    },
                );
            }
        } else {
            signIn();
        }
    };

    const deleteComment = async () => {
        if (window.confirm("Are you sure you want to delete this comment?"))
            deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    };

    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-16">
            {/* Image */}
            <img
                src={comment?.userImg}
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
                            {comment?.name}
                        </h4>
                        <span className="text-sm sm:text-[15px]">
                            @{comment?.username} -
                        </span>
                        <span className="text-sm sm:text-[15px] hover:underline hoverTransition">
                            <Moment fromNow>
                                {comment?.timestamp?.toDate()}
                            </Moment>
                        </span>
                    </div>

                    {/* dot icon */}
                    <EllipsisHorizontalIcon className="hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
                </div>

                {/* post text */}
                <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
                    {comment?.comment}
                </p>

                {/* icons */}
                <div className="flex justify-between text-gray-500 p-2 ">
                    <div className="flex items-center">
                        <ChatBubbleOvalLeftEllipsisIcon
                            onClick={() => {
                                if (!session) {
                                    signIn();
                                } else {
                                    setPostId(originalPostId);
                                    setOpen(!open);
                                }
                            }}
                            className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
                        />
                    </div>

                    {session?.user?.uid === comment?.userId && (
                        <TrashIcon
                            className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                            onClick={deleteComment}
                        />
                    )}

                    <div className="flex items-center">
                        {hasLiked ? (
                            <HeartIconFilled
                                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                                onClick={likeComment}
                            />
                        ) : (
                            <HeartIcon
                                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                                onClick={likeComment}
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

export default Comment;
