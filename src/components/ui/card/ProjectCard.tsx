import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { FaHeart, FaEye } from "react-icons/fa";

interface Props {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  authorName: string;
  authorImage: string | StaticImageData;
  projectdir: string;
  likes: number;
  views: number;
  isTeam?: boolean;
}

const ProjectCard: React.FC<Props> = ({
  id,
  title,
  description,
  image,
  authorName,
  projectdir,
  authorImage,
  likes,
  views,
  isTeam,
}) => {
  return (
    <div className="group relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl bg-white">
      <Link href={`/${projectdir}/${id}`}>
        <div className="w-full aspect-[4/3] relative cursor-pointer">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center text-white">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm mt-2 line-clamp-2">{description}</p>
          </div>
        </div>
      </Link>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-3 py-2 bg-white">
        {/* Left: Author */}
        <div className="flex items-center gap-2">
          <Image
            src={authorImage}
            alt={authorName}
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800">
            {authorName}
          </span>
          {isTeam && (
            <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded">
              TEAM
            </span>
          )}
        </div>

        {/* Right: Stats */}
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <FaHeart className="text-gray-400" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEye className="text-gray-400" />
            <span>
              {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
