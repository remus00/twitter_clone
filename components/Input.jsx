import { db, storage } from "@/firebase";
import {
    FaceSmileIcon,
    PhotoIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";

const Input = () => {
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            text: input,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username: session.user.username,
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(
                async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", docRef.id), {
                        image: downloadURL,
                    });
                },
            );
        }

        setInput("");
        setSelectedFile(null);
        setLoading(false);
    };

    return (
        <>
            {session && (
                <div className="flex border-b border-gray-200 p-3 space-x-3">
                    <img
                        onClick={signOut}
                        src={session.user.image}
                        alt="profile_icon"
                        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
                    />
                    <div className="w-full divide-y divide-gray-200">
                        <div className="">
                            <textarea
                                rows="2"
                                placeholder="What's Happening?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                            ></textarea>
                        </div>

                        {selectedFile && (
                            <div className="relative">
                                <XMarkIcon
                                    className="h-8 text-red-500 absolute top-2 left-2 cursor-pointer shadow-md shadow-white rounded-full"
                                    onClick={() => setSelectedFile(null)}
                                />
                                <img
                                    src={selectedFile}
                                    className={`${loading && "animate-pulse"}`}
                                />
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-2.5">
                            {!loading && (
                                <>
                                    <div className="flex gap-1">
                                        <div
                                            onClick={() =>
                                                filePickerRef.current.click()
                                            }
                                        >
                                            <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                            <input
                                                hidden
                                                type="file"
                                                ref={filePickerRef}
                                                onChange={addImageToPost}
                                            />
                                        </div>
                                        <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                    </div>
                                    <button
                                        disabled={!input.trim()}
                                        onClick={sendPost}
                                        className="bg-customBlue text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                                    >
                                        Tweet
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Input;
