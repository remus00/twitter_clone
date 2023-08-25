import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import {
    FaceSmileIcon,
    PhotoIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import Moment from "react-moment";

const CommentModal = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const [postId] = useRecoilState(postIdState);
    const [post, setPost] = useState({});
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const { data: session } = useSession();

    const router = useRouter();

    const sendComment = async () => {
        await addDoc(collection(db, "posts", postId, "comments"), {
            comment: input,
            name: session.user.name,
            username: session.user.username,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
        });

        setOpen(false);
        setInput("");
        router.push(`/posts/${postId}`);
    };

    useEffect(() => {
        onSnapshot(doc(db, "posts", postId), (snapshot) => {
            setPost(snapshot);
        });
    }, [postId, db]);

    return (
        <div>
            {open && (
                <Modal
                    isOpen={open}
                    onRequestClose={() => setOpen(false)}
                    className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white  border-2 border-gray-200 rounded-xl shadow-lg"
                >
                    <div className="p-2">
                        <div className="border-b border-gray-200 pb-2">
                            <div
                                onClick={() => setOpen(false)}
                                className="hoverEffect lg:p-0 flex justify-center items-center w-10 h-10"
                            >
                                <XMarkIcon className="h-7 p-0 text-gray-700" />
                            </div>
                        </div>

                        <div className="p-2 flex items-center space-x-1 relative">
                            <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
                            <img
                                src={post?.data()?.userImg}
                                alt="user_img"
                                className="w-11 h-11 rounded-full mr-4"
                            />
                            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline hoverTransition">
                                {post?.data()?.name}
                            </h4>
                            <span className="text-sm sm:text-[15px]">
                                @{post?.data()?.username} -
                            </span>
                            <span className="text-sm sm:text-[15px] hover:underline hoverTransition">
                                <Moment fromNow>
                                    {post?.data()?.timestamp?.toDate()}
                                </Moment>
                            </span>
                        </div>

                        <p className="text-gray-500 text-[15px] sm:text-[16px]  ml-16 mb-2">
                            {post?.data()?.text}
                        </p>

                        <div className="flex p-3 space-x-3">
                            <img
                                src={session.user.image}
                                alt="profile_icon"
                                className="h-11 w-11 rounded-full"
                            />
                            <div className="w-full divide-y divide-gray-200">
                                <div className="">
                                    <textarea
                                        rows="2"
                                        placeholder="Tweet your reply"
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                                    ></textarea>
                                </div>

                                {selectedFile && (
                                    <div className="relative">
                                        <XMarkIcon
                                            className="border border-red-500 h-8 text-red-500 absolute m-2 cursor-pointer shadow-md shadow-white rounded-full"
                                            onClick={() =>
                                                setSelectedFile(null)
                                            }
                                        />
                                        <img
                                            src={selectedFile}
                                            className={`${
                                                loading && "animate-pulse"
                                            }`}
                                        />
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-2.5">
                                    <div className="flex gap-1">
                                        <div>
                                            <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                        </div>
                                        <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                    </div>
                                    <button
                                        disabled={!input.trim()}
                                        onClick={sendComment}
                                        className="bg-customBlue text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CommentModal;
