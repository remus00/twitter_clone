import SidebarMenuItem from "./SidebarMenuItem";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
    BellIcon,
    BookmarkIcon,
    ClipboardIcon,
    EllipsisHorizontalCircleIcon,
    EllipsisHorizontalIcon,
    HashtagIcon,
    InboxIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

const Sidebar = () => {
    const { data: session } = useSession();

    return (
        <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
            {/* Twitter Logo */}
            <div className="hoverEffect p-0 hover:bg-blue-100 ">
                <Image
                    src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
                    width="50"
                    height="50"
                    alt="twitter_logo"
                />
            </div>

            {/* Menu */}
            <div className="mt-4 mb-2.5 xl:items-start">
                <SidebarMenuItem text="Home" Icon={HomeIcon} active />
                <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
                {session && (
                    <>
                        <SidebarMenuItem text="Notification" Icon={BellIcon} />
                        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
                        <SidebarMenuItem text="Bookmark" Icon={BookmarkIcon} />
                        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
                        <SidebarMenuItem text="Profile" Icon={UserIcon} />
                        <SidebarMenuItem
                            text="More"
                            Icon={EllipsisHorizontalCircleIcon}
                        />
                    </>
                )}
            </div>

            {session ? (
                <>
                    {/* Button */}
                    <button className="bg-customBlue text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline ">
                        Tweet
                    </button>

                    {/* Mini-profile */}
                    <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
                        <img
                            src={session.user.image}
                            alt="user-img"
                            className="h-10 w-10 rounded-full xl:mr-2"
                            onClick={signOut}
                        />
                        <div className="leading-5 hidden xl:inline">
                            <h4 className="font-bold ">{session.user.name}</h4>
                            <p className="text-gray-500">
                                @{session.user.username}
                            </p>
                        </div>
                        <EllipsisHorizontalIcon className="h-5 xl:ml-2 hidden xl:inline" />
                    </div>
                </>
            ) : (
                /* Sign in */
                <button
                    onClick={signIn}
                    className="bg-customBlue text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline "
                >
                    Sign in
                </button>
            )}
        </div>
    );
};

export default Sidebar;
