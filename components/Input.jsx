import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

const Input = () => {
    const { data: session } = useSession();
    console.log(session);
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
                                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                            ></textarea>
                        </div>

                        <div className="flex justify-between items-center pt-2.5">
                            <div className="flex gap-1">
                                <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                            </div>
                            <button className="bg-customBlue text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Input;
