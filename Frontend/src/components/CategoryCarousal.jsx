import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "DevOps Engineer",
  "UI/UX Designer",
];

function CategoryCarousal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    if (query) navigate("/browse");
  };

  return (
    <div className="py-10 px-4 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-4">
          Browse by Category
        </p>
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {category.map((cat, index) => (
              <CarouselItem key={index} className="pl-2 basis-auto">
                <button
                  onClick={() => searchJobHandler(cat)}
                  className="whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                >
                  {cat}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700" />
          <CarouselNext className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700" />
        </Carousel>
      </div>
    </div>
  );
}

export default CategoryCarousal;
