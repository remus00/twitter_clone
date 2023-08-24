import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";

const Feed = () => {
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
        </div>
    );
};

export default Feed;
